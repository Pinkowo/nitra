<template>
  <div class="lb-page">
    <div class="timesup">TIME'S UP！</div>
    <div class="lb-subtitle">最終排名 · 總資產計算</div>

    <div class="lb-list">
      <div
        v-for="(entry, i) in entries"
        :key="entry.uid"
        class="lb-entry"
        :class="i < 3 ? `r${i + 1}` : ''"
        :style="{ animationDelay: `${1.1 + i * 0.14}s` }"
      >
        <div class="lb-rank">
          <svg v-if="i < 3" width="28" height="28" viewBox="0 0 16 16">
            <circle cx="8" cy="8" r="7" :fill="medalFill[i]"/>
            <text x="8" y="12" font-size="9" font-weight="900" text-anchor="middle" :fill="medalText[i]">
              {{ i + 1 }}
            </text>
          </svg>
          <span v-else style="font-size:1rem;color:#999;">#{{ i + 1 }}</span>
        </div>
        <div class="lb-name">{{ entry.name }}</div>
        <div class="lb-chips">
          <span class="stat-chip">Atk {{ entry.attackPower }}</span>
          <span class="stat-chip">{{ entry.customersRecruited }} 人</span>
        </div>
        <div class="lb-total">{{ (entry.cashBalance + entry.assetsValue).toLocaleString() }}</div>
      </div>

      <div v-if="loading" class="flex-center" style="padding:40px;color:#888;">
        載入中...
      </div>
    </div>

    <div class="lb-back">
      <button class="btn-back" @click="router.push('/')">回首頁</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '../stores/useGameStore'
import { getLeaderboard } from '../services/playerService'
import type { LeaderboardEntry } from '../types'

const router = useRouter()
const gameStore = useGameStore()

const entries = ref<LeaderboardEntry[]>([])
const loading = ref(true)

const medalFill = ['#FFD700', '#B0B8C8', '#C87A32']
const medalText = ['#7A5000', '#404858', '#fff']

onMounted(async () => {
  entries.value = await getLeaderboard(gameStore.roomId)
  loading.value = false
})
</script>

<style scoped>
.lb-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #FFF8EC 0%, #FFF0D0 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 16px 40px;
  font-family: 'Helvetica Neue', system-ui, sans-serif;
  color: #2C1F0F;
}

.timesup {
  font-size: 2.2rem;
  font-weight: 900;
  color: #C83A18;
  letter-spacing: .04em;
  text-align: center;
  margin-bottom: 6px;
  opacity: 0;
  animation: timesup-in 0.55s 0.2s cubic-bezier(0.17,0.67,0.35,1.4) forwards;
}
@keyframes timesup-in {
  from { transform: scale(0.4) rotate(-4deg); opacity: 0; }
  to   { transform: scale(1) rotate(0deg);    opacity: 1; }
}

.lb-subtitle {
  font-size: .9rem;
  color: #8A6845;
  text-align: center;
  margin-bottom: 24px;
  opacity: 0;
  animation: fade-in 0.4s 0.9s ease forwards;
}
@keyframes fade-in { to { opacity: 1; } }

.lb-list {
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.lb-entry {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255,255,255,.7);
  border: 1.5px solid rgba(200,160,80,.25);
  border-radius: 10px;
  padding: 10px 14px;
  opacity: 0;
  animation: slide-in 0.4s ease both;
}
.lb-entry.r1 { border-color: rgba(255,215,0,.5); background: rgba(255,240,160,.4); }
.lb-entry.r2 { border-color: rgba(180,190,210,.5); background: rgba(230,235,245,.4); }
.lb-entry.r3 { border-color: rgba(200,120,50,.4); background: rgba(245,225,200,.4); }

@keyframes slide-in {
  from { transform: translateX(60px); opacity: 0; }
  to   { transform: translateX(0);    opacity: 1; }
}

.lb-rank {
  min-width: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lb-name {
  flex: 1;
  font-weight: 700;
  font-size: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.lb-chips {
  display: flex;
  gap: 5px;
}
.stat-chip {
  font-size: .72rem;
  font-weight: 700;
  background: rgba(160,112,0,.12);
  color: #8A6000;
  border-radius: 20px;
  padding: 2px 8px;
  white-space: nowrap;
}

.lb-total {
  font-size: 1.1rem;
  font-weight: 900;
  color: #A07000;
  white-space: nowrap;
}

.lb-back {
  margin-top: 32px;
}
.btn-back {
  padding: 12px 32px;
  border-radius: 8px;
  background: #3A80B8;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
}
</style>
