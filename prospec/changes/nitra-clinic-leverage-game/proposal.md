# Proposal: Nitra Clinic Leverage Game

## Background

Nitra 需要一款展示其信用槓桿價值的互動遊戲，用於診所場景教育與行銷。遊戲透過 5 分鐘即時多人競爭，讓玩家親身體驗「借貸購買器材 → 提升攻擊力 → 賺取更多現金」的正向飛輪，直觀感受 Nitra 融資帶來的競爭優勢。

## User Stories

### US-1: 房間建立與加入 [P1]

As a **host（主持人）**,
I want to generate a 4-digit Room ID and start a 5-minute game session,
So that players can scan or enter the code to join and compete in real time.

**Acceptance Scenarios:**

- WHEN host opens the app, THEN a unique 4-digit Room ID is generated and displayed with a QR code
- WHEN player enters Room ID and name, THEN they are added to the room and see the waiting lobby
- WHEN host clicks Start Game, THEN 5-minute countdown begins for all players simultaneously
- WHEN game ends, THEN all actions are locked and final leaderboard is shown

**Independent Test:** Host creates room → player joins via Room ID → host starts → 5-minute timer syncs across devices

---

### US-2: 核心點擊戰鬥機制 [P1]

As a **player**,
I want to tap on customers to deal damage and earn cash,
So that I can accumulate money to buy equipment and grow my clinic.

**Acceptance Scenarios:**

- WHEN player taps customer, THEN damage = 10 + (totalAssetsValue / 100) is applied with GSAP floating number
- WHEN customer HP reaches 0, THEN player receives cash reward and a new customer spawns
- WHEN 30 seconds pass, THEN new customer's HP is 1.5× the previous tier's base HP
- WHEN player has more assets, THEN damage per tap increases and cash is earned faster

**Independent Test:** Solo play session — tap 10 times, verify cash accumulates and damage matches formula

---

### US-3: 器材商店與 Nitra 信用支付 [P1]

As a **player**,
I want to buy clinic equipment with cash or Nitra credit,
So that I can increase my attack power and total asset value.

**Acceptance Scenarios:**

- WHEN player clicks Buy (cash), THEN equipment is purchased, cash deducted, assets increase
- WHEN player clicks Buy (Nitra), THEN credit limit is consumed but cash is not deducted
- WHEN Nitra credit limit is full, THEN player can click Repay to clear credit (triggers 3-second lock)
- WHEN repayment lock is active, THEN all tapping, buying, and shop interactions are disabled
- WHEN equipment is owned, THEN attackPower and totalWorth update in real time via Pinia

**Independent Test:** Buy equipment via Nitra → verify credit bar fills → repay → verify 3-second lock → verify credit resets

---

### US-4: 全域事件 — 限量器材搶購 [P1]

As a **player**,
I want to compete in a flash sale for limited premium equipment every minute,
So that I can gain a significant competitive advantage.

**Acceptance Scenarios:**

- WHEN 57 seconds pass in a minute, THEN all players see a 3-second countdown notification
- WHEN 60-second mark arrives, THEN one limited equipment item becomes available (first-come-first-served)
- WHEN a player claims the item, THEN it is immediately locked for all other players
- WHEN race condition occurs, THEN Firebase transaction ensures only one winner

**Independent Test:** Two clients simultaneously claim the same item — verify only one succeeds, other sees "Sold Out"

---

### US-5: 全域事件 — 限量金客 (Whale Customer) [P1]

As a **player**,
I want to collectively attack a whale customer that appears randomly,
So that the last-hit player earns a massive cash bonus.

**Acceptance Scenarios:**

- WHEN whale customer is triggered, THEN all players see the same high-HP enemy via WebSocket
- WHEN multiple players tap, THEN the shared HP bar decreases in sync across all clients
- WHEN HP reaches 0, THEN the player who dealt the final hit receives the last-hit bonus
- WHEN whale is defeated, THEN normal individual customers resume for all players

**Independent Test:** Two players attack whale → one deals final hit → verify bonus only goes to last-hit player

---

### US-6: 結算與排行榜 [P1]

As a **player**,
I want to see a final leaderboard ranked by total worth after 5 minutes,
So that I know how my clinic expansion compared to other players.

**Acceptance Scenarios:**

- WHEN timer hits 0:00, THEN full-screen lock activates immediately for all players
- WHEN lock triggers, THEN "Time's Up" animation plays via GSAP before leaderboard appears
- WHEN leaderboard loads, THEN players are sorted by totalWorth = cashBalance + assetsValue
- WHEN leaderboard shows, THEN each entry displays player name, rank, cash, assets, and total

**Independent Test:** End game with 3 players → verify rankings match totalWorth formula for all players

---

## Edge Cases

- **Race condition on flash sale**: Two players tap buy simultaneously — Firebase transaction must guarantee atomic single-winner selection
- **Repayment mid-attack**: Player repaying while whale exists — lock should freeze all interactions including whale tapping
- **Player disconnect**: Player leaves mid-game — their data remains frozen in leaderboard at last sync state
- **Credit overflow**: Player's Nitra credit exactly at limit — Buy (Nitra) button disabled until repay
- **Whale spawns during lock**: Whale event triggers while player is in 3-second repayment lock — whale participation resumes after lock lifts

## Functional Requirements

- **FR-001**: Room system with 4-digit ID, host/player roles, Firebase real-time sync
- **FR-002**: Click combat with formula `damage = 10 + (totalAssetsValue / 100)` and GSAP floating numbers
- **FR-003**: Dynamic customer HP scaling: initial 100 HP, +50% per 30-second tier
- **FR-004**: Equipment shop with 10 standard + 5 premium items; cash and Nitra credit payment modes
- **FR-005**: Nitra repayment triggers 3-second full-screen lock via QInnerLoading
- **FR-006**: Flash sale global event: 1-minute interval, 3-second warning, Firebase transaction for race condition
- **FR-007**: Whale customer global event: shared HP bar, last-hit bonus, WebSocket sync
- **FR-008**: Game timer 5 minutes, host-controlled start, synchronized end with leaderboard
- **FR-009**: totalWorth = cashBalance + assetsValue; attackPower computed reactively via Pinia
- **FR-010**: PWA deployment with mobile fullscreen, vibration feedback, GSAP animations

## Success Criteria

- **SC-001**: Room creation → join → game start works across ≥2 real devices with <500ms sync latency
- **SC-002**: Damage formula and HP scaling produce correct values verified by unit tests
- **SC-003**: Flash sale race condition resolved correctly — 0 duplicate winners across 100 simulated concurrent claims
- **SC-004**: Repayment lock correctly blocks all interactions for exactly 3 seconds
- **SC-005**: Final leaderboard shows correct totalWorth ranking for all connected players
- **SC-006**: PWA installable and runs fullscreen on iOS Safari and Android Chrome

## Related Modules

- **game-room**: Firebase room creation, player join, host start/stop logic
- **combat-engine**: Click damage calculation, customer HP lifecycle, difficulty scaling
- **equipment-store**: Equipment catalog, purchase logic, Nitra credit management
- **global-events**: Flash sale and whale customer WebSocket/Firebase event coordination
- **leaderboard**: End-game totalWorth calculation, ranking display, animation
- **pinia-store**: Reactive state for attackPower, cashBalance, assetsValue, creditUsage

## Open Questions

- [ ] **NEEDS CLARIFICATION**: WebSocket provider for global events — Firebase Realtime DB or separate Socket.io server?
- [ ] **NEEDS CLARIFICATION**: Whale customer spawn interval — purely random or minimum/maximum gap defined?

## Constitution Check

- [x] Reviewed against `prospec/CONSTITUTION.md`
- [x] Constitution is a template (not yet filled) — no violations identified; greenfield project

## UI Scope

**Scope:** full
