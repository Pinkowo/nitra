# Interaction Spec: Nitra Clinic Leverage Game

> Generated from: proposal.md + design-spec.md + prototype iteration
> Last updated: 2026-04-16

---

## Screens

### Screen: GamePage

**States:**

| State | Description | Entry Condition |
|-------|-------------|-----------------|
| Playing | Customers walking, HUD active, clinic idle | Room status = playing |
| ShopOpen | Dark overlay sheet visible, street dimmed slightly | Tap clinic building |
| RepaymentLocked | Semi-transparent dark overlay, all input blocked, sky countdown showing | Repay button tapped |
| WhaleActive | Whale customer visible in street, sky banner sweeps | Firebase whale.active = true |
| FlashCountdown | Sky countdown 3-2-1, no overlay, gameplay continues | 57s mark each minute |
| FlashSaleGrab | Full-screen grab overlay, timer started | Countdown ends |
| Ended | All interactions frozen | Room status = ended |

**Transitions:**

```
Playing        → ShopOpen        : tap clinic building (not locked)
ShopOpen       → Playing         : tap backdrop / tap 取消 / swipe sheet down
Playing        → RepaymentLocked : tap 還款 button (cash >= creditUsed, creditUsed > 0)
RepaymentLocked → Playing        : lock timer expires (1–5s)
Playing        → WhaleActive     : Firebase whale.active = true
WhaleActive    → Playing         : whale HP <= 0 (Firebase node cleared)
Playing        → FlashCountdown  : Firebase flashSale.countdownStartedAt written (57s mark)
FlashCountdown → FlashSaleGrab   : countdown reaches 0
FlashSaleGrab  → Playing         : item claimed OR expired (2–2.2s display)
Playing        → Ended           : room.status = 'ended'
Ended          → LeaderboardPage : router.push('/leaderboard')
```

---

### Screen: LeaderboardPage (Final Results)

> **Separate component from SkyLeaderboard.** This page only appears at game end.
> The in-game SkyLeaderboard is a compact card inside GamePage.

**States:**

| State | Description | Entry Condition |
|-------|-------------|-----------------|
| Animating | TIME'S UP header animation + stagger entries | On mount |
| Displaying | Full leaderboard visible | Animation complete |

---

## Flows

### Flow: CustomerAttack

**Trigger:** User taps a customer sprite

```
1. Guard checks:
   -> If RepaymentLocked → ignore (no feedback)
   -> If locked === true → ignore

2. Calculate damage:
   -> damage = 10 + Math.floor(totalAssets / 100)
   -> (demo: hardcoded 35 in prototype)

3. Apply damage:
   -> customer.hp = max(0, hp - damage)
   -> HP bar width updates (150ms CSS transition)
   -> Floating damage number spawns at random offset near street center
      → translateY 0 → -54px, opacity 1 → 0, 0.78s
   -> Device vibration: 30ms (if supported)

4a. HP > 0:
   -> Customer continues walking, HP bar updates color class if crossing 60% / 30%

4b. HP = 0 (kill):
   -> Cash reward: damage × 12
   -> Floating cash number spawns (gold, 1.25rem)
   -> gameStore.cash += reward
   -> gameStore.customersRecruited += 1
   -> HP resets to 100 after 800ms (customer walks back)
   -> HP bar class resets to default green
```

---

### Flow: CustomerWalkCycle

**Trigger:** Game start; continuous spawning throughout 3-minute session

```
1. Customer spawns at left (-100px) or right (calc(100% + 100px)) edge
   -> Direction random; right-walking faces right (default SVG orientation)
   -> Left-walking: scaleX(-1) on the SVG element only (HP bar not mirrored)
   -> HP = round(100 × 1.5^tier), where tier increments every 30s

2. Customer walks via CSS animation (walk-right or walk-left keyframe)
   -> Speed: 5–8s duration (type-dependent)
   -> Bob animation: translateY 0 ↔ -4px, 0.42s alternate

3a. HP reaches 0 (killed mid-walk):
   -> See CustomerAttack flow step 4b

3b. Customer reaches opposite edge (escaped, HP > 0):
   -> No cash reward, no penalty in prototype
   -> Customer div removed after animation completes
   -> New customer auto-spawns (in full implementation)
```

---

### Flow: OpenEquipmentShop

**Trigger:** Tap ClinicBuilding (when not locked)

```
1. Clinic tap:
   -> clinic.classList.add('open') — teal glow ring appears
   -> .eq-sheet.classList.add('open') — sheet slides up (translateY 100%→0, 300ms)
   -> .backdrop.classList.add('on') — slight dark overlay on street (rgba 0,0,0,0.18)
   -> renderCarousel() + renderDetail() called

2. Browse equipment:
   -> User swipes left/right in carousel (touch or mouse drag)
   -> Drag threshold: 40px to commit to next/prev item
   -> Rubber-band feel during drag: offset = dragDx × 0.6
   -> Snap on release: 250ms cubic-bezier(0.35, 0, 0.25, 1)
   -> Clicking adjacent bubbles (slots ±1, ±2) jumps to that item directly

3. EquipmentDetail updates on selection:
   -> Item name (★ prefix for premium items)
   -> "Nitra ${price} · +${asset} 資產" (hidden if owned)
   -> "✓ 已擁有" badge (shown if owned, replaces meta)

4. Nitra purchase:
   -> Tap "Nitra 購買"
   -> Guard: if locked OR owned OR (creditLimit - creditUsed) < price → button disabled
   -> creditUsed += price; assets += asset; item.owned = true
   -> HUD credit value updates; clinic asset label updates
   -> Bubble re-renders showing owned state

5. Repay from shop:
   -> Tap "還款" button in NitraRow
   -> Guard: if creditUsed === 0 OR cash < creditUsed → button disabled
   -> Shop closes first (closeShop())
   -> startRepayLock() triggers (see Repayment flow)

6. Close shop:
   -> Tap backdrop OR tap "取消"
   -> sheet.classList.remove('open'), backdrop.classList.remove('on')
   -> clinic glow ring fades
```

---

### Flow: Repayment

**Trigger:** Tap 還款 button (in shop NitraRow)

```
1. Eligibility check:
   -> creditUsed === 0 → disabled, no action
   -> cash < creditUsed → disabled, no action
   -> If RepaymentLocked → disabled

2. Calculate lock duration:
   -> dur = Math.max(1, Math.min(5, Math.ceil(creditUsed / (creditLimit / 5))))
   -> Examples: $2000 used → 1s; $6000 → 3s; $10000 → 5s

3. Execute repayment:
   -> cash -= creditUsed; creditUsed = 0
   -> closeShop() (if open)
   -> locked = true

4. RepaymentLock overlay appears:
   -> background: rgba(0,0,0,0.52) — SEMI-TRANSPARENT, game scene visible behind
   -> Players can see whale customer or ongoing events but cannot interact
   -> Spinner, "還款處理中" title, "X 秒後解鎖" subtitle
   -> Sky badge: "還款處理中 Xs" (decrements each second)

5. Timer countdown (1 tick/second):
   -> Overlay subtitle and sky badge update: "2 秒後解鎖", "1 秒後解鎖"

6. Lock expires:
   -> locked = false
   -> overlay.style.display = 'none'
   -> sky badge display = 'none'
   -> HUD updates with new cash / credit values
```

---

### Flow: FlashSale

**Trigger:** Firebase flashSale.countdownStartedAt written (every 60s except t=0)

```
Phase 1 — Sky Countdown (3 seconds):
1. Sky countdown number becomes visible (display: 'block')
   -> Shows "3", pop animation
   -> Sky leaderboard dims to opacity 0.3
   -> Gameplay continues normally (no input blocked)

2. Each second (2 → 1):
   -> Number updates with pop animation
   -> After "1" → clearInterval, countdown hidden (display: 'none')
   -> Sky leaderboard restores opacity 1

Phase 2 — Grab Overlay:
3. Flash sale overlay appears (display: 'flex'):
   -> Full-screen dark background
   -> Equipment name displayed
   -> Pulsing "搶！" button with red glow

4a. Tap "搶！":
   -> Eligibility: creditLimit - creditUsed >= item.price
   -> On eligible:
      -> item.owned = true; assets += item.asset
      -> Button hidden; "搶到了！{name}" shown (teal, 1.5rem)
      -> Overlay dismisses after 2.2s
   -> On ineligible:
      -> Button hidden; "額度不足，無資格搶購" shown (red)
      -> Overlay dismisses after 2.0s

4b. Another player claims first (Firebase):
   -> Local player sees "Sold Out" state
   -> Overlay dismisses after 2s
```

---

### Flow: WhaleAttack

**Trigger:** Firebase whale.active = true (random host trigger)

```
1. Whale appears in street lane:
   -> Whale SVG div becomes visible (display: '')
   -> walk-right animation starts (14s linear, slower than normal customers)
   -> Sky banner sweeps: slides in from left, pauses center, slides out right (3.6s)
   -> Sky leaderboard dims to opacity 0.3 during banner

2. Player taps whale:
   -> If RepaymentLocked → no action
   -> whaleHp -= 20
   -> Whale HP bar updates
   -> Floating damage number spawns

3a. whaleHp > 0:
   -> Continue; other players' taps also reduce shared HP via Firebase

3b. whaleHp <= 0 (this client last hit):
   -> cash += 5000
   -> Floating "+5000 LAST HIT" cash number spawns
   -> whaleActive = false; whale div hidden
   -> Firebase: lastHitPlayer = uid, clear whale node

3c. whaleHp <= 0 (another client last hit):
   -> Firebase listener fires
   -> Local whale div hides, no bonus cash
```

---

### Flow: GameEnd + Leaderboard

```
1. Timer reaches 0:00:
   -> All interactions freeze (locked = true globally)
   -> Host writes room.status = 'ended' (Firebase transaction)
   -> All clients detect status change

2. Clients route to LeaderboardPage:
   -> router.push('/leaderboard')
   -> GamePage unmounts, HUD gone

3. LeaderboardPage mounts:
   -> Fetch all player data from Firebase (cash + assets → totalWorth)
   -> Sort descending by totalWorth

4. Animation sequence:
   a. "TIME'S UP！" header: scale 0.4 + rotate(-4deg) → scale 1, 0.55s, delay 0.2s
   b. Subtitle "最終排名 · 總資產計算": fade in, delay 0.9s
   c. Leaderboard entries stagger in from x:60px, delay 1.1s + 140ms × index

5. Entry display:
   -> Rank: SVG circle badge (gold/silver/bronze SVG for top 3, plain #N for rest)
   -> Player name
   -> Attack power chip (⚔ attack)
   -> Customers recruited chip (N 人)
   -> Total worth: Cash + Assets (sorted key, displayed bold right-aligned)
```

---

## Gestures

| Element | Gesture | Action |
|---------|---------|--------|
| CustomerSprite | Tap / Touch | Deal damage (if not locked) |
| WhalSprite | Tap / Touch | Deal whale damage (if not locked) |
| ClinicBuilding | Tap / Touch | Toggle equipment sheet |
| BubbleCarousel | Swipe left | Next equipment item |
| BubbleCarousel | Swipe right | Previous equipment item |
| Adjacent bubble | Tap | Jump to that item directly |
| .backdrop | Tap | Close equipment sheet |
| FlashSale grab button | Tap | Attempt to claim flash sale item |

---

## Micro-interactions

| Trigger | Animation | Duration |
|---------|-----------|----------|
| Customer hit | HP bar width transition | 150ms |
| Damage number | Float y -54px + opacity 0 | 780ms |
| Cash reward | Float y -54px + opacity 0, gold | 780ms |
| Customer death | HP resets after delay | 800ms |
| Bubble drag | Real-time offset (0.6× drag) | Live |
| Bubble snap | Position + opacity + shadow | 250ms cubic |
| Sheet open | translateY 100%→0 | 300ms cubic |
| Sheet close | translateY 0→100% | 300ms cubic |
| Backdrop fade | opacity 0→0.18 | 200ms |
| Flash sale countdown | Scale 1.5→1, opacity 0.5→1 per digit | 250ms |
| Sky banner sweep | translateX -110%→0→110% | 3600ms |
| Repay lock appear | display:flex (instant) | — |
| Lock sky badge | display:block + live countdown | 1s ticks |
| Clinic open glow | box-shadow transition | 140ms |
| Clinic tap | scale 0.97 | 140ms |
| TIME'S UP | scale 0.4 + rotate → scale 1 | 550ms |
| LB entry stagger | x 60px→0, opacity 0→1 | 400ms each |

---

## Responsive Interactions

| Interaction | Mobile | Tablet |
|-------------|--------|--------|
| Customer attack | touchstart tap | click |
| Equipment browse | touch swipe | touch swipe or click adjacent bubbles |
| Sheet open/close | tap clinic / tap backdrop | same |
| Repay | tap button in NitraRow | same |
| Flash sale grab | large tap target (full-screen button) | same |
