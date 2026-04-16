# Tasks: Nitra Clinic Leverage Game

## Types

- [x] [P] Define `Player`, `Room`, `Equipment`, `GlobalEvent` TypeScript interfaces ~40 lines
- [x] [P] Define `FlashSaleState`, `WhaleState` interfaces for global event nodes ~20 lines
- [x] [P] Define `PaymentMode` enum (Cash | Nitra) and `GameStatus` enum (waiting | playing | ended) ~15 lines

## Services

- [x] [P] Implement `firebase.ts` service: init Firebase, export `db` reference ~30 lines
- [x] Implement `roomService.ts`: createRoom, joinRoom, startGame, subscribeRoom ~80 lines
- [x] Implement `playerService.ts`: syncPlayerData (write cashBalance, assetsValue, creditUsed to Firebase) ~50 lines
- [x] Implement `flashSaleService.ts`: schedule flash sale timer, `runTransaction()` for claim ~70 lines
- [x] Implement `whaleService.ts`: create whale node, `runTransaction()` for HP decrement + last-hit detection ~70 lines

## Stores (Pinia)

- [x] Implement `useGameStore`: state (cashBalance, assetsValue, creditUsed, creditLimit, ownedEquipment) ~60 lines
- [x] Add computed getters: `attackPower = 10 + floor(assetsValue/100)`, `totalWorth = cashBalance + assetsValue` ~20 lines
- [x] Add actions: `buyEquipment(item, mode)`, `repayCredit()`, `syncFromFirebase(playerData)` ~80 lines
- [x] Implement `useRoomStore`: roomId, players list, gameStatus, startedAt, timeRemaining computed ~60 lines
- [x] Implement `useEventStore`: flashSaleState, whaleState, isLocked (repayment lock) ~40 lines

## Composables

- [x] [P] Implement `useCombat.ts`: tap handler, GSAP floating damage number, customer HP lifecycle ~80 lines
- [x] [P] Implement `useCustomerTimer.ts`: 30-second tier scaling, spawn next customer with correct HP ~50 lines
- [x] Implement `useGameTimer.ts`: derive timeRemaining from Firebase startedAt, trigger end-game at 0 ~40 lines
- [x] Implement `useRepaymentLock.ts`: 3-second lock state, disable all interactions via QInnerLoading ~30 lines

## Pages & Components

- [x] [P] Build `HostPage.vue`: generate Room ID, show QR code, Start Game button, player list ~80 lines
- [x] [P] Build `JoinPage.vue`: input name + Room ID, join room, navigate to GamePage ~50 lines
- [x] Build `GamePage.vue`: assemble all game areas, bind game store, handle game lifecycle ~100 lines
- [x] Build `CustomerArea.vue`: tappable customer sprite (image slot), GSAP damage pop-up ~60 lines
- [x] Build `EquipmentShop.vue`: grid of 15 equipment cards (image slot), cash/Nitra buy buttons ~100 lines
- [x] Build `GameHeader.vue`: QLinearProgress credit bar, QBadge rank, countdown timer display ~50 lines
- [x] Build `FlashSaleOverlay.vue`: 3-second countdown + claim button + sold-out state ~60 lines
- [x] Build `WhaleOverlay.vue`: shared HP bar, tap area, last-hit winner banner ~70 lines
- [x] Build `LeaderboardPage.vue`: GSAP "TIME'S UP" animation → ranked player rows ~80 lines

## Tests

- [x] [P] Unit test `attackPower` and `totalWorth` computed getters (formula correctness) ~40 lines
- [x] [P] Unit test customer HP tier scaling formula for tiers 0–10 ~30 lines
- [x] Integration test flash sale race condition: 2 concurrent clients → exactly 1 winner ~60 lines
- [x] Integration test repayment lock: verify all actions disabled for 3000ms ~40 lines
- [x] Integration test whale last-hit: concurrent taps → correct bonus recipient ~50 lines

## Summary

- **Total Tasks:** 30
- **Parallelizable Tasks:** 11
- **Total Estimated Lines:** ~1,580 lines
