# Design Spec: Nitra Clinic Leverage Game

> Generated from: proposal.md + prototype iteration (game.html, shop.html, leaderboard.html)
> Platform: html → Quasar/Vue 3 PWA
> Last updated: 2026-04-16

---

## Core Design Principles

- **No emoji anywhere** — all icons and characters are SVG drawn elements
- **Adorable Home-inspired** — warm, illustrated, cozy mobile game aesthetic (not dark glassmorphism)
- **Consistent warm palette** — cream HUD, pastel buildings, warm street, bright daytime sky
- **Pixel-art SVG characters** — walking customers and whale drawn with `<rect>` grids
- **Dark overlay shop** — equipment sheet is a semi-transparent dark overlay, not a frosted-glass drawer

---

## Visual Identity

### Color Palette

**Design direction:** Warm illustrated daytime — Adorable Home palette, cozy, soft, non-AI-feeling

| Token | Value | Usage |
|-------|-------|-------|
| `--sky-a` | #7EB8D4 | Sky top |
| `--sky-b` | #A8D8EA | Sky mid |
| `--sky-c` | #D6EDFF | Sky horizon |
| `--street` | #C4965A | Street surface |
| `--sidewalk` | #D9B87A | Sidewalk |
| `--clinic-base` | #EEDDCC → #DDD0B8 | Ground below clinic |
| `--bldg-a` | #F5B55A | City building warm yellow |
| `--bldg-b` | #E89050 | City building orange |
| `--bldg-c` | #F2C455 | City building gold |
| `--bldg-d` | #DCA870 | City building tan |
| `--clinic-wall` | #FEFDF5 | Clinic facade |
| `--clinic-roof` | #C83030 | Red cross roof |
| `--clinic-sign` | #E0F4F0 / #226060 | Teal sign background / text |
| `--shop-dark` | rgba(18,8,0,0.65) | Equipment sheet dark overlay |
| `--hud-bg` | rgba(255,252,240,0.97) | HUD/credit bar background |
| `--hud-bd` | rgba(180,148,98,0.3) | HUD border |
| `--lb-card` | rgba(255,252,240,0.94) | Sky leaderboard card |
| `--bub-sel-bg` | #FFF09A | Selected bubble background |
| `--bub-sel-bd` | #D8B800 | Selected bubble border |
| `--bub-idle-bg` | #EBF5FB | Idle bubble background |
| `--bub-idle-bd` | #A8C8E0 | Idle bubble border |
| `--bub-prem-sel` | #E8D8FF | Premium selected bubble |
| `--bub-prem-bd` | #9858D8 | Premium bubble border |
| `--hp-high` | #52B86A | HP bar green |
| `--hp-mid` | #E89818 | HP bar orange |
| `--hp-low` | #D83830 | HP bar red |
| `--cash` | #A07000 | Amber cash text |
| `--nitra` | #C83A18 | Deep orange-red Nitra credit |
| `--txt` | #2C1F0F | Primary text (warm dark brown) |
| `--txt-mid` | #8A6845 | Secondary text |
| `--btn-r` | #C83A18 | Nitra buy button |
| `--btn-g` | #358038 | Repay button green |
| `--banner-bg` | #FFD028 | Sky event banner yellow |
| `--banner-txt` | #5A3200 | Banner text dark brown |
| `--repay-lock` | rgba(0,0,0,0.52) | Repay lock overlay (semi-transparent, scene visible) |

### Typography

| Token | Size | Weight | Usage |
|-------|------|--------|-------|
| `--font-hud-label` | 0.68rem | 700 | HUD column labels (現金, NITRA) |
| `--font-hud-val` | 1.05rem | 900 | HUD cash/credit values |
| `--font-hud-name` | 0.96rem | 700 | Player name in HUD |
| `--font-hud-rank` | 0.88rem | 800 | Rank badge |
| `--font-timer` | 1.6rem | 900 | Countdown timer |
| `--font-credit-bar` | 0.74rem | 400 | Credit bar labels |
| `--font-sky-lb` | 0.82rem | 600 | Sky leaderboard entries |
| `--font-sky-lb-title` | 0.86rem | 900 | Sky leaderboard title |
| `--font-sky-banner` | 1.05rem | 900 | Sky event sweep banner |
| `--font-sky-lock` | 1rem | 800 | Sky repay lock indicator |
| `--font-sky-countdown` | 5rem | 900 | Flash sale sky countdown number |
| `--font-bubble-name` | 0.75rem | 800 | Equipment name in bubble |
| `--font-item-name` | 1.2rem | 900 | Selected equipment name in sheet |
| `--font-item-meta` | 0.95rem | 400 | Price / asset detail |
| `--font-nitra-info` | 0.88rem | 400 | Nitra row info text |
| `--font-btn` | 1.0–1.05rem | 700–800 | Shop action buttons |
| `--font-damage` | 1.6rem | 900 | Floating damage number |
| `--font-reward` | 1.25rem | 900 | Floating cash reward |
| `--font-lock-title` | 1.4rem | 900 | Repay lock overlay title |
| `--font-flash-title` | 2rem | 900 | Flash sale overlay title |
| `--font-clinic-sign` | 0.72rem | 900 | NITRA CLINIC sign text |
| `--font-clinic-assets` | 0.88–1rem | 600–900 | Clinic asset value |
| `--font-lb-entry` | 0.95rem | 700 | Final leaderboard entry |

### Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--xs` | 4px | Tight inline gaps |
| `--sm` | 8px | Button padding, badge padding |
| `--md` | 16px | Card padding, section gaps |
| `--lg` | 24px | Section separation |
| `--xl` | 40px | Major layout blocks |

### Visual Style

- **Border radius**: `50%` (bubbles), `12px` (cards), `8px` (buttons), `3px` (HP bars)
- **Clinic roof**: CSS `clip-path: polygon(...)` cross shape, no SVG needed
- **Street dashed line**: CSS `repeating-linear-gradient` (no emoji road markings)
- **Character art**: Pixel-art SVG using `<rect>` elements on 16×24 viewBox grids
- **Equipment icons**: SVG `<symbol>` + `<use>` pattern, `fill="currentColor"`, 24×24 viewBox
- **HUD icons**: SVG symbols (coin, credit card, clock, trophy), 16×16 viewBox
- **Leaderboard medals**: SVG circles with inline number text (gold/silver/bronze)
- **Bubble size (selected)**: 100px diameter
- **Bubble size (adjacent)**: 65px diameter (0.65×)
- **Bubble size (far)**: 42px diameter (0.42×)
- **Bubble selected glow**: `0 0 0 4px {border-color}, 0 4px 24px {glow}`
- **Shadow (sheet)**: `0 -6px 28px rgba(0,0,0,0.38)`
- **Transition (bubble snap)**: `transform 250ms cubic-bezier(0.35, 0, 0.25, 1)`
- **Transition (sheet open)**: `transform 300ms cubic-bezier(0.2, 0, 0, 1)`
- **Walking animation**: CSS `translateX` keyframe, 5–8s per pass
- **Character bob**: `translateY 0 ↔ -4px`, 0.42s ease-in-out infinite alternate
- **HUD height offset**: Scene content has `padding-top: 80px` to clear HUD + credit bar

---

## Components

### GameScene (Full Screen)

**Layout:**
- `position: fixed; inset: 0` — full viewport
- `display: flex; flex-direction: column`
- `padding-top: 80px` to clear fixed HUD

**Layer stack (bottom to top, z-index):**

| z | Layer | Description |
|---|-------|-------------|
| 0 | `.sky` | Sky gradient + clouds + city buildings |
| 1 | `.sky-lb` | In-game sky leaderboard card (top-right of sky) |
| 2 | `.sky-event` | Event area: banner / countdown / lock indicator |
| 3 | `.street-lane` | Customer walk lane |
| 4 | `.sidewalk` | Decorative sidewalk strip |
| 5 | `.clinic-base` | Warm ground + clinic building |
| 9 | `.backdrop` | Dark overlay when shop open |
| 10 | `.eq-sheet` | Equipment sheet (dark overlay, slides up) |
| 30 | `.flash-ov` | Flash sale full-screen overlay |
| 40 | `.repay-lock` | Repayment lock overlay (semi-transparent, scene shows) |
| 50 | `.hud-wrap` | Fixed HUD + credit bar |
| 200 | `.demo-bar` | Prototype demo controls |

---

### HUD (GameHeader)

**Layout:**
- `position: fixed; top: 0; left: 0; right: 0`
- Two-row: HUD row + credit bar row
- HUD row: rank badge | player name | timer (center) | cash column | Nitra column

**HUD Row contents:**
- Rank badge: `background: #3A80B8`, SVG trophy icon + `#N` text
- Player name: truncated at 80px
- Timer: SVG clock icon + `M:SS` text, tabular-nums; turns `--hp-low` color + blink at ≤30s
- Cash column: label "現金" + SVG coin icon + value
- Nitra column: label "NITRA" + SVG credit card icon + value in `--nitra` color

**Credit bar (below HUD):**
- Label row: "Nitra 額度已使用" + `{used} / {limit}`
- Track: `height: 6px`, filled with `--nitra` color, transitions 300ms

---

### Sky Layer

**Clouds:**
- 3 CSS cloud shapes (`.ca`, `.cb`, `.cc`) using `::before` pseudo-elements
- Different widths (72/58/90px), opacities, drift durations (22/31/27s)

**City buildings:**
- CSS `<div>` elements in a `.city-row` flex container
- Colors: `--bldg-a` through `--bldg-d`, varying widths (36–72px) and heights (55–108px)
- Window details via `::before` / `::after` pseudo-elements
- `border-radius: 3px 3px 0 0`

---

### SkyLeaderboard (in-game, compact)

> **Separate component from LeaderboardPage.** This is the live in-game miniature ranking.

**Layout:**
- `position: absolute; top: 8px; right: 8px` within `.sky`
- Background: `--lb-card` (warm cream semi-transparent)
- `min-width: 172px`, `padding: 8px 12px`
- Shows top 3 players only

**Entry format (per row):**
- Rank medal: SVG circle (gold #FFD700 / silver #B0B8C8 / bronze #C87A32) with white number
- Player name (current player row highlighted with warm yellow background)
- Total worth value in `--cash` color

**Behavior:**
- Dims to `opacity: 0.3` during whale banner or flash countdown
- Restores to `opacity: 1` after 4s

---

### SkyEventArea

**Layout:**
- `position: absolute; bottom: 12px; left: 0; right: 0`
- `display: flex; align-items: center; justify-content: center`
- `pointer-events: none` (events go to elements below)

**Three mutually exclusive elements (shown one at a time):**

1. **Sky Banner** (whale event)
   - Yellow sweep animation: enters from left, pauses center, exits right (3.6s total)
   - Background: `--banner-bg` (#FFD028), text: `--banner-txt` (#5A3200)
   - Font: 1.05rem bold, no emoji in text

2. **Sky Countdown** (flash sale pre-event)
   - Large `5rem` number (3 → 2 → 1), `display: none` by default
   - Color: `#C82000` with text-shadow glow
   - Each digit: pop-in animation `count-pop 0.25s`
   - Hidden via `display: none` / `display: block` (NOT CSS class toggle, avoids fallback to `display: none`)

3. **Sky Lock Indicator** (repay in progress)
   - Small cream badge, `display: none` by default
   - Shows: "還款處理中 Xs" with live countdown
   - Hidden via `display: none` / `display: block`

---

### CustomerSprite (Pixel Art SVG)

**Three character types, each 16×24 viewBox, displayed at 40×60px:**

| Type | Description | Colors |
|------|-------------|--------|
| Doctor (A) | Female, blue-teal scrubs | Skin #F5C08A, scrubs #6AAABB, pants #4A88A8 |
| Business (B) | Gray suit, briefcase | Skin #E8B080, suit #5C6070, tie #B82828 |
| Elder (C) | Gray hair, cane | Skin #F0B878, hair #9A9A9A, shirt #D07A40 |

**Walking direction:**
- Right-walking: SVG faces right (default)
- Left-walking: `transform: scaleX(-1)` on SVG element (not on parent div, to preserve HP bar orientation)

**Whale VIP customer:**
- 40×28 viewBox, displayed at 88×60px
- Blue body with belly, dorsal fin, tail, crown (SVG drawn), water spout
- Wider HP bar (68px wide × 8px)
- Slower walk animation (14s)

**HP bar:**
- `width: 46px; height: 6px; border-radius: 3px`
- Color: `--hp-high` → `--hp-mid` → `--hp-low` (class-toggled at <60%, <30%)
- `margin-bottom: 4px` above character sprite

**Bob animation:**
- `translateY: 0 ↔ -4px`, `0.42s ease-in-out infinite alternate`
- Whale: `0.65s` duration

**Floating numbers (on hit/kill):**
- Damage: `1.6rem`, `#D02818`, `text-shadow` white + glow
- Cash reward: `1.25rem`, `#906000`
- `float-up` keyframe: `translateY 0 → -54px, opacity 1 → 0, 0.78s`

---

### ClinicBuilding

**Layout:**
- `width: 196px; height: 106px`
- `background: #FEFDF5`, warm border, `border-radius: 7px 7px 0 0`, no bottom border

**Visual elements:**
- **Roof cross**: CSS `::before` pseudo-element, `clip-path: polygon(35% 0%, 65% 0%, 65% 35%, 100% 35%, 100% 65%, ...)`, `background: #C83030`
- **Facade**: SVG inline showing windows, door, window crossbars
- **Sign**: "NITRA CLINIC" text, teal background badge
- **Asset display**: SVG coin icon + "資產" label + `$X,XXX` value in `--cash` color

**States:**

| State | Visual |
|-------|--------|
| Idle | Soft drop-shadow |
| Active (tap) | `scale(0.97)` |
| ShopOpen | Teal glow ring `box-shadow: 0 -4px 20px rgba(78,205,196,0.5), 0 0 0 2px #48C4B8` |

---

### EquipmentSheet (Dark Overlay)

> **Not a frosted-glass drawer. Not a white card. A dark semi-transparent overlay.**

**Layout:**
- `position: fixed; bottom: 0; left: 0; right: 0; height: 64vh`
- `background: rgba(18, 8, 0, 0.65)` — dark, scene visible through it
- No `backdrop-filter` blur
- `border-top: 1px solid rgba(255,255,255,0.09)`
- Slides up: `translateY(100%) → translateY(0)`, 300ms cubic

**No marquee banner** — removed from design.

**Internal layout (top to bottom):**
1. **Drag handle** — 36×4px pill, `rgba(255,255,255,0.22)`
2. **BubbleCarousel** — flex 1, full remaining height
3. **EquipmentDetail** — item name + price/asset text
4. **NitraRow** — Nitra used + cash display + repay button
5. **ShopActions** — cancel + Nitra buy button

---

### BubbleCarousel

**Layout:**
- `position: relative`, `overflow: visible`
- Bubbles absolutely positioned via JS, centered at `left: 50%; top: 50%`
- Each bubble: `transform: translate(calc(-50% + {offset}px), -50%)`

**Slot offsets:**

| Slot | X offset | Scale | Opacity |
|------|----------|-------|---------|
| -2 (far left) | -200px | 0.42× | 0.28 |
| -1 (left) | -108px | 0.65× | 0.72 |
| 0 (center/selected) | 0 | 1.0× | 1.0 |
| +1 (right) | +108px | 0.65× | 0.72 |
| +2 (far right) | +200px | 0.42× | 0.28 |

**Bubble content:**
- SVG icon: `<use href="#ico-{id}">` with `color` attribute set to item's color
- Icon size: `Math.round(BASE_SIZE * scale * 0.48)` px
- Name label (0.75rem, white): shown for slots -1, 0, +1 only

**Swipe behavior:**
- Drag threshold: 40px to snap to next/prev item
- Rubber-band drag: `dragDx * 0.6` applied while dragging
- Snap on release: `250ms cubic-bezier(0.35, 0, 0.25, 1)`

**Premium items (MRI, da Vinci arm):**
- Selected: `background: #E8D8FF`, border `#9858D8`, glow purple
- Idle: `background: #EDE0FF`, border `#B080E0`

---

### EquipmentDetail

**Content (below carousel):**
```
★ AI MRI 掃描儀         ← item-name: 1.2rem bold white (★ prefix for premium)
Nitra $15,000  ·  +12,000 資產   ← item-meta: 0.95rem, white 62% opacity
```
OR when owned:
```
✓ 已擁有               ← green badge, replaces meta
```

---

### NitraRow

**Layout:**
- Dark orange-tinted background `rgba(200,58,24,0.10)`, orange border
- Left: "Nitra 已用：$X,XXX · 現金：$X,XXX" (0.88rem)
- Right: **還款** button (green, `--btn-g`)

**Repay button disabled when:** `creditUsed === 0` OR `cash < creditUsed`

---

### ShopActions

**Two buttons only (no cash buy button):**

| Button | Style | Disabled when |
|--------|-------|---------------|
| 取消 | Ghost white | Never |
| Nitra 購買 | `--btn-r` red-orange | Credit exceeded OR owned OR locked |

---

### RepaymentLock Overlay

> **Semi-transparent dark overlay — game scene remains visible behind it.**

**Visual:**
- `background: rgba(0,0,0,0.52)` — ~50% dark, NOT opaque cream
- No `backdrop-filter`
- Spinner: `border-top-color: --nitra`, orange-tinted track
- Title: white, 1.4rem bold
- Subtitle: white 62% opacity, 1rem

**Lock duration:** Variable, not fixed 3s:
```
dur = Math.max(1, Math.min(5, Math.ceil(creditUsed / (creditLimit / 5))))
```
- 0–20% credit used → 1s
- 20–40% → 2s
- 40–60% → 3s
- 60–80% → 4s
- 80–100% → 5s (max)

During lock: sky indicator shows "還款處理中 Xs" badge (decrements live).

---

### FlashSale System

**Phase 1 — Sky Countdown (pre-event, 3 seconds before):**
- Sky countdown number appears in `.sky-event` area (5rem, red)
- Shows 3 → 2 → 1 with pop animation each second
- Sky leaderboard dims to opacity 0.3
- NO full-screen overlay during countdown

**Phase 2 — Grab Overlay (full screen):**
- `background: rgba(0,0,0,0.86)`
- Equipment name shown in large text
- "搶！" button pulses with red glow animation
- Eligibility check: Nitra credit available must be ≥ item price
- On failure: "額度不足，無資格搶購" (red text, 2s then dismiss)
- On success: "搶到了！{name}" (teal text, 2.2s then dismiss)

---

### LeaderboardPage (Final Results)

> **Completely separate component from SkyLeaderboard.** Shown only at game end.

**Layout:**
- Standalone full-screen page (own route)
- Background: `linear-gradient(135deg, #FFF8E1, #E3F2FD)` — warm to cool
- No game HUD present

**Entry format:**
- Rank: SVG circle badge (gold/silver/bronze for top 3, `#N` text for rest)
- Name, ⚔ attack power chip, 👤 customers chip (`.stat-chip` class)
- Total worth: `$X,XXX` right-aligned, `--cash` color, bold

**Animation:**
- TIME'S UP header: scale 0.4→1 with rotation bounce, 0.55s, delay 0.2s
- Subtitle fade-in: delay 0.9s
- Entries: `slide-in` from x:60px, stagger 140ms per entry (entries 1–5)

**Top 3 entry borders:**
- #1: `border-color: #FFD700`, `background: #FFFDE7`
- #2: `border-color: #BDBDBD`
- #3: `border-color: #CD7F32`, `background: #FFF8F0`

---

## Game Constants

| Constant | Value |
|----------|-------|
| Game duration | **3 minutes** (180 seconds) |
| Nitra credit limit | $10,000 |
| Base customer HP | 100 |
| HP per tier increment | × 1.5 every 30s |
| Attack damage formula | 10 + (totalAssets / 100) |
| Repay lock duration | 1–5s (formula above) |
| Flash sale interval | Every 60s (starting at 60s) |
| Flash sale countdown | 3s before (57s mark) |
| Winning condition | Cash + Assets total (highest wins) |

---

## Responsive Strategy

### Breakpoints

| Name | Min Width | Notes |
|------|-----------|-------|
| Mobile | 0px | Primary target — vertical layout |
| Tablet | 600px | Wider street, larger bubbles |

### Layout Adaptations

| Component | Mobile (< 600px) | Tablet (≥ 600px) |
|-----------|-----------------|-----------------|
| Street lane | 148px height | 180px height |
| Customer sprite | 40×60px | 52×78px |
| Bubble (selected) | 100px | 120px |
| EquipmentSheet | 64vh | 58vh, max-width 500px centered |
| SkyLeaderboard | min-width 172px | min-width 200px |
