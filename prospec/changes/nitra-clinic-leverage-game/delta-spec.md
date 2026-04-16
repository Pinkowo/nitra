# Delta Spec: Nitra Clinic Leverage Game

## ADDED

### REQ-GAME-ROOM-001: Room Creation & Player Join

**Feature:** clinic-leverage-game
**Story:** US-1

**Description:**
Host generates a unique 4-digit Room ID stored in Firebase Realtime Database. Players join by entering Room ID and display name. Room state includes player list and game lifecycle status.

**Acceptance Criteria:**
1. Host generates Room ID; Firebase node `/rooms/{id}` is created with status `waiting`
2. Player entry with name + valid Room ID adds them to `/rooms/{id}/players/{uid}`
3. Room ID is displayed as QR code on host screen (via `qrcode` canvas); QR URL encodes `/#/join?room={id}`
4. Scanning QR code opens JoinPage with room ID pre-filled via `?room=` query param
5. Host pressing Start Game sets status to `playing` for all clients simultaneously

**Priority:** High

---

### REQ-GAME-ROOM-002: 3-Minute Game Timer (Host-Owned)

**Feature:** clinic-leverage-game
**Story:** US-1

**Description:**
The canonical game timer is managed by the host's Firebase write. All players read the start timestamp from Firebase and compute remaining time locally to avoid drift.

**Acceptance Criteria:**
1. Host writes `startedAt: serverTimestamp()` to Firebase on Start Game
2. All clients derive `timeRemaining = 180 - (now - startedAt)` locally
3. When `timeRemaining <= 0`, all clients independently trigger end-game flow
4. End-game: room status set to `ended` by first client to detect expiry (via Firebase transaction)

**Priority:** High

---

### REQ-COMBAT-001: Click Damage Formula & Floating Numbers

**Feature:** clinic-leverage-game
**Story:** US-2

**Description:**
Each tap on a customer applies fixed damage of 10. Attack power is equal for all players and does NOT scale with equipment. Equipment ownership instead multiplies the cash reward earned on customer defeat.

**Acceptance Criteria:**
1. `attackPower` is a Pinia computed property fixed at `10` for all players
2. Each tap applies `attackPower` damage to current customer HP
3. Floating damage number animates at tap position, fading up and out
4. Customer defeat cash reward = `Math.round(attackPower * 12 * rewardMultiplier)`

**Priority:** High

---

### REQ-COMBAT-002: Dynamic Customer HP Difficulty Scaling

**Feature:** clinic-leverage-game
**Story:** US-2

**Description:**
Customer HP increases every 30 seconds to force equipment investment. New customers spawn with HP = `100 * 1.5^tier` where `tier = floor(elapsedSeconds / 30)`.

**Acceptance Criteria:**
1. At game start (tier 0): customer HP = 100
2. At 30s (tier 1): new customer HP = 150
3. At 60s (tier 2): new customer HP = 225
4. Formula: `Math.round(100 * Math.pow(1.5, tier))`

**Priority:** High

---

### REQ-COMBAT-003: Equipment Cash Reward Multiplier

**Feature:** clinic-leverage-game
**Story:** US-3

**Description:**
Equipment raises the cash reward earned on each customer defeat. The more (and more expensive) equipment a player owns, the higher the bonus. This creates the leverage flywheel: buy equipment → higher per-kill income → buy more equipment.

**Acceptance Criteria:**
1. `rewardMultiplier = 1 + (totalOwnedEquipmentCost / 20000)` as Pinia computed
2. `totalOwnedEquipmentCost` = sum of `price` fields of all owned equipment IDs
3. Base defeat reward (no equipment): `attackPower * 12 * 1.0 = 120`
4. With $2,000 equipment: multiplier = 1.1 → reward = 132
5. With all standard equipment (~$8,250): multiplier ≈ 1.41 → reward ≈ 169
6. Multiplier applied to both regular customer and whale bonus calculations

**Priority:** High

---

### REQ-EQUIPMENT-001: Equipment Shop with Cash & Nitra Payment

**Feature:** clinic-leverage-game
**Story:** US-3

**Description:**
15 equipment items (10 standard + 5 premium) with price and assetValue. Purchase via cash (deduct cashBalance) or Nitra credit (consume creditUsed, no cash deduction). Equipment contributes to final asset score and activates cash reward multiplier.

**Acceptance Criteria:**
1. Cash purchase: `cashBalance -= item.price`; `assetsValue += item.assetValue`
2. Nitra purchase: `creditUsed += item.price`; `assetsValue += item.assetValue`; cashBalance unchanged
3. Nitra Buy button disabled when `creditUsed + item.price > creditLimit`
4. Both purchase types sync player data to Firebase `/rooms/{id}/players/{uid}`
5. Equipment does NOT affect `attackPower` — only `rewardMultiplier` and `assetsValue`

**Priority:** High

---

### REQ-EQUIPMENT-002: Nitra Repayment Lock

**Feature:** clinic-leverage-game
**Story:** US-3

**Description:**
Repaying Nitra credit clears the credit balance and triggers a 3-second full-screen lock using QInnerLoading. All interactions are disabled during the lock.

**Acceptance Criteria:**
1. Repay action sets `creditUsed = 0` and deducts repayment amount from `cashBalance`
2. QInnerLoading covers full viewport for exactly 3000ms
3. During lock: tap, buy, shop, and repay actions are all disabled
4. After lock lifts: all interactions re-enable; Nitra credit bar shows empty

**Priority:** High

---

### REQ-GLOBAL-EVENTS-001: Flash Sale (Limited Equipment, Fixed Time Points)

**Feature:** clinic-leverage-game
**Story:** US-4

**Description:**
At exactly five fixed time points during the game, one premium equipment item appears for first-come-first-served claiming. A 3-second countdown shows first; the claim UI only appears after the countdown finishes. The overlay is non-blocking so players can choose to ignore it and continue hitting customers.

**Acceptance Criteria:**
1. Flash sale fires at exactly these five game-time-remaining points: **2:30 / 2:00 / 1:30 / 1:00 / 0:30** (elapsed seconds: 30 / 60 / 90 / 120 / 150)
2. At t-3s before each point: `active: false` + `countdownStartedAt` broadcast → all clients show 3→2→1 countdown only
3. At the exact time point: `active: true` broadcast → claim UI appears in the **centre of the sky area** (NOT full-screen modal, NOT blocking customer interaction)
4. Claim UI is a floating card (non-blocking, `pointer-events: none` on wrapper, only card itself is interactive)
5. `runTransaction()` on Firebase ensures single winner
6. `isWinner` is a `computed` property (`claimedByUid === gameStore.uid && claimed`) — never a persistent `ref` that carries across rounds
7. Loser sees "Sold Out"; winner sees "搶到了！"
8. No flash sale fires outside of the five defined time points

**Priority:** High

---

### REQ-GLOBAL-EVENTS-002: Whale Customer (Shared HP, Last-Hit Bonus)

**Feature:** clinic-leverage-game
**Story:** US-5

**Description:**
A randomly triggered whale customer has high HP shared across all players. All taps decrement the same Firebase HP value. The player whose tap reduces HP to ≤ 0 receives the last-hit cash bonus.

**Acceptance Criteria:**
1. Host triggers whale via Firebase node `/rooms/{id}/whale` with HP = `whaleBaseHP`
2. Each player tap calls `runTransaction()` on whale HP, decrementing by attackPower
3. Transaction that crosses HP ≤ 0 also writes `lastHitPlayer: uid` atomically
4. Winner receives bonus cash = `whaleBaseHP * 50`
5. Whale defeat clears the whale node; all clients return to individual combat

**Priority:** High

---

### REQ-LEADERBOARD-001: End-Game Settlement & Ranking

**Feature:** clinic-leverage-game
**Story:** US-6

**Description:**
When 3 minutes expire, all players are locked out and a final leaderboard is displayed showing totalWorth = cashBalance + assetsValue, ranked descending. Each row also shows equipment count and customers recruited as supplementary stats.

**Acceptance Criteria:**
1. Timer expiry triggers full-screen lock on all clients simultaneously
2. GSAP plays "TIME'S UP" animation before leaderboard renders
3. Leaderboard fetches all players from Firebase, sorts by `cashBalance + assetsValue` descending
4. Each row shows: rank medal, player name, **equipment count** (number of owned items), customers recruited, totalWorth
5. `equipmentCount = ownedEquipment.length` — attack power is NOT shown (all players share the same fixed value)

**Priority:** High

---

### REQ-PINIA-001: Reactive Game State Store

**Feature:** clinic-leverage-game
**Story:** US-3

**Description:**
Pinia store manages all player financial state with computed properties for attackPower, rewardMultiplier, and totalWorth.

**Acceptance Criteria:**
1. Store state: `cashBalance`, `assetsValue`, `creditUsed`, `creditLimit`, `ownedEquipment[]`
2. Computed: `attackPower = 10` (fixed constant for all players)
3. Computed: `rewardMultiplier = 1 + totalOwnedEquipmentCost / 20000`
4. Computed: `totalWorth = cashBalance + assetsValue`
5. All mutations sync to Firebase within 500ms
6. Store hydrates from Firebase on game join

**Priority:** High

---

## MODIFIED

### REQ-COMBAT-001 (revised)
- **Before:** `attackPower = 10 + Math.floor(assetsValue / 100)` — equipment scaled attack
- **After:** `attackPower = 10` fixed; equipment now scales cash reward via `rewardMultiplier`
- **Rationale:** Equalises PvP combat feel while preserving equipment leverage incentive

### REQ-GLOBAL-EVENTS-001 (revised)
- **Before:** Timer fires every 60 seconds indefinitely; `active: true` set simultaneously with countdown; full-screen blocking overlay
- **After:** Five fixed time points only (2:30/2:00/1:30/1:00/0:30); `active: false` during countdown then `active: true` after; non-blocking sky-centre floating card
- **Rationale:** Gives players meaningful choice — grab item or keep attacking customers

### REQ-LEADERBOARD-001 (revised)
- **Before:** Stats row showed `attackPower`
- **After:** Stats row shows `equipmentCount` — more meaningful since all players share the same attackPower

## REMOVED

*(none)*
