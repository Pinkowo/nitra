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
3. Room ID is displayed as QR code on host screen
4. Host pressing Start Game sets status to `playing` for all clients simultaneously

**Priority:** High

---

### REQ-GAME-ROOM-002: 5-Minute Game Timer (Host-Owned)

**Feature:** clinic-leverage-game
**Story:** US-1

**Description:**
The canonical game timer is managed by the host's Firebase write. All players read the start timestamp from Firebase and compute remaining time locally to avoid drift.

**Acceptance Criteria:**
1. Host writes `startedAt: serverTimestamp()` to Firebase on Start Game
2. All clients derive `timeRemaining = 300 - (now - startedAt)` locally
3. When `timeRemaining <= 0`, all clients independently trigger end-game flow
4. End-game: room status set to `ended` by first client to detect expiry (via Firebase transaction)

**Priority:** High

---

### REQ-COMBAT-001: Click Damage Formula & GSAP Floating Numbers

**Feature:** clinic-leverage-game
**Story:** US-2

**Description:**
Each tap on a customer applies damage equal to `10 + (totalAssetsValue / 100)`. Damage is shown as a floating number animation using GSAP.

**Acceptance Criteria:**
1. `attackPower` is a Pinia computed property: `10 + Math.floor(assetsValue / 100)`
2. Each tap applies `attackPower` damage to current customer HP
3. GSAP animates a floating `+{damage}` number at tap position, fading up and out
4. Customer defeat triggers cash reward equal to `currentHP_tier * 10`

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

### REQ-EQUIPMENT-001: Equipment Shop with Cash & Nitra Payment

**Feature:** clinic-leverage-game
**Story:** US-3

**Description:**
15 equipment items (10 standard + 5 premium) with price and assetValue. Purchase via cash (deduct cashBalance) or Nitra credit (consume creditUsed, no cash deduction).

**Acceptance Criteria:**
1. Cash purchase: `cashBalance -= item.price`; `assetsValue += item.assetValue`
2. Nitra purchase: `creditUsed += item.price`; `assetsValue += item.assetValue`; cashBalance unchanged
3. Nitra Buy button disabled when `creditUsed + item.price > creditLimit`
4. Both purchase types sync player data to Firebase `/rooms/{id}/players/{uid}`

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

### REQ-GLOBAL-EVENTS-001: Flash Sale (Limited Equipment, 1-Min Interval)

**Feature:** clinic-leverage-game
**Story:** US-4

**Description:**
Every 60 seconds, one premium equipment item appears for first-come-first-served claiming. Firebase transaction ensures race-condition-safe single-winner resolution.

**Acceptance Criteria:**
1. At 57-second mark each minute: all clients show 3-second countdown notification
2. At 60-second mark: claim button activates; item ID written to Firebase `/flashSale/current`
3. `runTransaction()` on `/flashSale/current/claimed`: only first writer wins
4. Losing clients see "Sold Out" immediately after transaction resolves
5. Winner's equipment is added to their player node in Firebase

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
When 5 minutes expire, all players are locked out and a final leaderboard is displayed showing totalWorth = cashBalance + assetsValue, ranked descending.

**Acceptance Criteria:**
1. Timer expiry triggers full-screen lock on all clients simultaneously
2. GSAP plays "TIME'S UP" animation before leaderboard renders
3. Leaderboard fetches all players from Firebase, sorts by `cashBalance + assetsValue` descending
4. Each row shows: rank, player name, cash, assets, totalWorth

**Priority:** High

---

### REQ-PINIA-001: Reactive Game State Store

**Feature:** clinic-leverage-game
**Story:** US-3

**Description:**
Pinia store manages all player financial state with computed properties for attackPower and totalWorth.

**Acceptance Criteria:**
1. Store state: `cashBalance`, `assetsValue`, `creditUsed`, `creditLimit`, `ownedEquipment[]`
2. Computed: `attackPower = 10 + Math.floor(assetsValue / 100)`
3. Computed: `totalWorth = cashBalance + assetsValue`
4. All mutations sync to Firebase within 500ms
5. Store hydrates from Firebase on game join

**Priority:** High

---

## MODIFIED

*(none — greenfield project)*

## REMOVED

*(none — greenfield project)*
