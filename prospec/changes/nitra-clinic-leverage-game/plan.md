# Plan: Nitra Clinic Leverage Game

## Overview

本 Story 從零建立一款基於 Quasar 的多人 PWA 遊戲，讓診所醫師在 5 分鐘內透過點擊客人賺錢、使用 Nitra 信用購買器材，以總資產價值決勝負。遊戲的核心教育目標是讓玩家直觀感受「槓桿融資 → 擴大資產 → 提升攻擊力」的正向飛輪。

實作策略分為六個平行模組：(1) Firebase 房間系統、(2) 戰鬥引擎與難度曲線、(3) 器材商店與 Nitra 信用、(4) 全域事件協調（限量搶購 + 金客）、(5) Pinia 全域狀態、(6) UI 層（Quasar components + GSAP）。以 Firebase Realtime Database 作為多人同步骨幹，Pinia 管理本地響應式計算，GSAP 處理動效。

## Technical Context (Greenfield)

> AI Knowledge not yet established — substitute context collected below

### Tech Stack Detection
- Language: TypeScript + Vue 3
- Framework: Quasar (PWA mode), Vue 3 Composition API
- State: Pinia
- Backend/Sync: Firebase Realtime Database
- Animation: GSAP
- Test Framework: Vitest (recommended)

### Project Structure Scan
- Entry points: `src/main.ts`, `src/App.vue`
- Recommended directory structure:
  - `src/stores/` — Pinia stores
  - `src/composables/` — game logic composables
  - `src/pages/` — Quasar pages (Lobby, Game, Leaderboard)
  - `src/components/` — UI components
  - `src/services/` — Firebase service layer
  - `src/types/` — TypeScript interfaces

### Detected Patterns
- Vue 3 Composition API with `<script setup>`
- Pinia store with computed getters for `attackPower` and `totalWorth`
- Firebase Realtime DB transactions for race-condition-safe writes

### External Dependencies
- `quasar`, `@quasar/extras` — UI framework + PWA
- `firebase` — Realtime Database
- `gsap` — animations
- `pinia` — state management

## Affected Modules

| Module | Impact | Changes |
|--------|--------|---------|
| game-room | High | New: Firebase room CRUD, host/player roles, game lifecycle |
| combat-engine | High | New: click damage formula, customer HP lifecycle, 30s difficulty scaling |
| equipment-store | High | New: 15-item catalog, cash/Nitra payment, repayment lock |
| global-events | High | New: flash sale (1-min interval, Firebase tx), whale customer (WebSocket/Firebase sync) |
| pinia-store | High | New: reactive cashBalance, assetsValue, attackPower, creditUsage, totalWorth |
| ui-layer | High | New: Quasar pages/components, GSAP floating damage, QInnerLoading lock |

## Implementation Steps

1. **Project Scaffold & Firebase Setup**
   - Init Quasar project in PWA mode with TypeScript
   - Configure Firebase Realtime Database, add `src/services/firebase.ts`
   - Define TypeScript types: `Player`, `Room`, `Equipment`, `GlobalEvent`

2. **Pinia Store: Core Reactive State**
   - `useGameStore`: cashBalance, assetsValue, creditUsed, creditLimit
   - Computed: `attackPower = 10 + (assetsValue / 100)`, `totalWorth = cashBalance + assetsValue`
   - Actions: buyEquipment (cash/Nitra), repayCredit, syncFromFirebase

3. **Room System (Firebase)**
   - Host page: generate 4-digit Room ID, write to Firebase, display QR code
   - Player page: input name + Room ID, join room node in Firebase
   - Game lifecycle: `status: waiting → playing → ended`, host-triggered start

4. **Combat Engine**
   - Customer entity: HP with 30-second tier scaling (initial 100, ×1.5 per tier)
   - Tap handler: apply damage = attackPower, animate floating number via GSAP
   - Customer defeat: award cash, spawn next customer at current HP tier

5. **Equipment Store**
   - Data: 10 standard items + 5 premium (price, assetValue, image slot)
   - Purchase logic: cash mode (deduct cashBalance) / Nitra mode (consume credit)
   - Repayment: clear creditUsed → trigger 3-second QInnerLoading full-screen lock

6. **Global Events: Flash Sale**
   - Timer: every 60 seconds, broadcast 3-second pre-warning to all players
   - Claim: Firebase transaction to ensure single winner (race-condition safe)
   - UI: countdown overlay → "GRAB!" button → "Sold Out" for losers

7. **Global Events: Whale Customer**
   - Firebase node: `whaleHP`, decremented by each player's tap
   - All players read `whaleHP` in real time; last writer to set HP ≤ 0 wins last-hit bonus
   - UI: full-width HP bar, "LAST HIT!" banner for winner

8. **End-Game Leaderboard**
   - Timer reaches 0 → set room status to `ended` → lock all interactions
   - Collect all player `totalWorth` from Firebase, sort descending
   - GSAP sequence: "TIME'S UP" full-screen animation → slide-in leaderboard rows

9. **PWA & Mobile Polish**
   - Quasar PWA mode: manifest, service worker, installable
   - Mobile: vibration API on customer hit, fullscreen lock on mobile
   - QR code on host screen for easy player join

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Race condition on flash sale | High | Firebase `runTransaction()` with retry; validate server-side |
| Firebase latency causing HP desync on whale | Medium | Optimistic local HP + Firebase source of truth reconciliation |
| Repayment lock bypass via fast double-tap | Medium | Disable store/tap reactively in Pinia; QInnerLoading covers full screen |
| PWA not installable on iOS Safari | Low | Follow Apple PWA guidelines; test on real device early |
| Timer drift across devices | Medium | Host owns canonical timer in Firebase; clients read from Firebase timestamp |
