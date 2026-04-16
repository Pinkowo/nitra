<template>
  <q-header>
    <div class="hud">
      <div class="hud-rank">
        <svg width="12" height="12"><use href="#ico-trophy" color="#FFE08A"/></svg>
        <span>#{{ myRank }}</span>
      </div>
      <span class="hud-name">{{ gameStore.playerName }}</span>

      <div class="hud-timer" :class="{ urgent: timeRemaining <= 30 }">
        <svg width="14" height="14"><use href="#ico-clock" color="#7A5C3A"/></svg>
        <span>{{ formattedTime }}</span>
      </div>

      <div class="hud-money">
        <div class="hud-col">
          <span class="hud-lbl">現金</span>
          <div class="hud-val cash">
            <svg width="12" height="12"><use href="#ico-coin"/></svg>
            <span>{{ gameStore.cashBalance.toLocaleString() }}</span>
          </div>
        </div>
        <div class="hud-col">
          <span class="hud-lbl">Nitra</span>
          <div class="hud-val cred">
            <svg width="12" height="12"><use href="#ico-card" color="#C83A18"/></svg>
            <span>{{ gameStore.creditUsed.toLocaleString() }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="credit-bar">
      <div class="credit-row">
        <span>Nitra 額度已使用</span>
        <span>{{ gameStore.creditUsed.toLocaleString() }} / {{ gameStore.creditLimit.toLocaleString() }}</span>
      </div>
      <div class="credit-track">
        <div class="credit-fill" :style="{ width: creditPct + '%' }"></div>
      </div>
    </div>
  </q-header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useGameStore } from '../stores/useGameStore'
import { useRoomStore } from '../stores/useRoomStore'
import { useGameTimer } from '../composables/useGameTimer'

const gameStore = useGameStore()
const roomStore = useRoomStore()
const { timeRemaining, formattedTime } = useGameTimer()

const myRank = computed(() => {
  const idx = roomStore.sortedPlayers.findIndex((p) => p.uid === gameStore.uid)
  return idx === -1 ? '?' : idx + 1
})

const creditPct = computed(() => {
  if (!gameStore.creditLimit) return 0
  return Math.min(100, (gameStore.creditUsed / gameStore.creditLimit) * 100)
})
</script>

<style scoped>
.hud {
  background: var(--hud-bg);
  border-bottom: 1.5px solid var(--hud-bd);
  padding: 7px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 2px 8px rgba(60,30,0,.10);
}
.hud-rank {
  background: #3A80B8;
  color: #fff;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: .88rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 5px;
}
.hud-name {
  font-size: .96rem;
  font-weight: 700;
  color: var(--txt);
  max-width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.hud-timer {
  margin: 0 auto;
  font-size: 1.6rem;
  font-weight: 900;
  font-variant-numeric: tabular-nums;
  letter-spacing: .02em;
  display: flex;
  align-items: center;
  gap: 5px;
  color: var(--txt);
}
.hud-timer.urgent {
  color: var(--hp-lo);
  animation: blink .5s ease-in-out infinite alternate;
}
@keyframes blink { to { opacity: .3; } }
.hud-money { display: flex; gap: 12px; }
.hud-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1px;
}
.hud-lbl {
  font-size: .68rem;
  color: var(--txt-mid);
  font-weight: 700;
  letter-spacing: .06em;
  text-transform: uppercase;
}
.hud-val {
  font-size: 1.05rem;
  font-weight: 900;
  display: flex;
  align-items: center;
  gap: 3px;
}
.hud-val.cash { color: var(--cash); }
.hud-val.cred { color: var(--nitra); }

.credit-bar {
  background: rgba(255,252,238,.97);
  border-bottom: 1px solid var(--hud-bd);
  padding: 3px 12px 5px;
}
.credit-row {
  display: flex;
  justify-content: space-between;
  font-size: .74rem;
  color: var(--txt-mid);
  margin-bottom: 2px;
}
.credit-track {
  height: 6px;
  border-radius: 3px;
  background: #E8D8B8;
  overflow: hidden;
}
.credit-fill {
  height: 100%;
  border-radius: 3px;
  background: var(--nitra);
  transition: width .3s ease;
}
</style>
