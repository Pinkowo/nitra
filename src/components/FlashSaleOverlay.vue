<template>
  <Teleport to="body">
    <div v-if="show" class="flash-sky-wrap">
      <div class="flash-sky-card">
        <div class="flash-sky-title">⚡ 限量道具出現！</div>
        <div class="flash-sky-item">{{ currentItem?.name ?? '' }}</div>

        <template v-if="!claimed">
          <div v-if="!canAfford" class="flash-sky-note">Nitra 額度不足（需 ${{ currentItem?.price.toLocaleString() }}）</div>
          <button v-else class="btn-grab" :disabled="claiming" @click="claim">搶！</button>
        </template>
        <template v-else>
          <div v-if="isWinner" class="flash-sky-note" style="color:#68EDAA;">搶到了！{{ currentItem?.name }}</div>
          <div v-else class="flash-sky-note" style="color:#F88;">Sold Out — 被人搶先一步</div>
        </template>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useEventStore } from '../stores/useEventStore'
import { useGameStore } from '../stores/useGameStore'
import { claimFlashSaleItem } from '../services/flashSaleService'
import { equipmentById } from '../assets/equipment-data'

const eventStore = useEventStore()
const gameStore  = useGameStore()

const claiming = ref(false)

const flashSale = computed(() => eventStore.flashSaleState)
const show = computed(() => flashSale.value?.active === true)
const claimed = computed(() => flashSale.value?.claimed === true)
const isWinner = computed(() =>
  flashSale.value?.claimed === true &&
  flashSale.value?.claimedByUid === gameStore.uid,
)
const currentItem = computed(() =>
  flashSale.value?.equipmentId ? equipmentById[flashSale.value.equipmentId] : null,
)
const canAfford = computed(() =>
  currentItem.value ? gameStore.availableCredit >= currentItem.value.price : false,
)

async function claim() {
  if (claiming.value || !flashSale.value?.equipmentId) return
  claiming.value = true

  // Demo mode: claim locally without Firebase transaction
  if (gameStore.roomId === 'demo') {
    const ok = currentItem.value ? gameStore.buyEquipmentFlashSale(currentItem.value) : false
    eventStore.setFlashSale(flashSale.value ? {
      ...flashSale.value,
      claimed: true,
      claimedByUid: ok ? gameStore.uid : null,
      claimedByName: ok ? gameStore.playerName : null,
    } : null)
    claiming.value = false
    return
  }

  const won = await claimFlashSaleItem(
    gameStore.roomId,
    gameStore.uid,
    gameStore.playerName,
  )
  if (won && currentItem.value) {
    gameStore.buyEquipmentFlashSale(currentItem.value)
  }
  isWinner.value = won
  claiming.value = false
}
</script>

<style scoped>
/* 全螢幕容器：透明、不擋點擊，只讓卡片本身可點 */
.flash-sky-wrap {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  /* 垂直置中偏上，落在天空中央 */
  padding-bottom: 40vh;
  pointer-events: none;
  z-index: 30;
}

.flash-sky-card {
  pointer-events: auto;
  background: rgba(10,5,0,.82);
  border: 2.5px solid #FFD028;
  border-radius: 18px;
  padding: 18px 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  box-shadow: 0 0 32px rgba(255,208,40,.45);
  animation: sky-card-in .25s ease;
}
@keyframes sky-card-in {
  from { transform: scale(.7); opacity: 0; }
  to   { transform: scale(1);  opacity: 1; }
}

.flash-sky-title {
  font-size: 1rem;
  font-weight: 900;
  color: #FFD028;
  letter-spacing: .06em;
}
.flash-sky-item {
  font-size: 1.3rem;
  font-weight: 900;
  color: #fff;
  text-align: center;
}
.flash-sky-note {
  font-size: .9rem;
  font-weight: 700;
  color: rgba(255,255,255,.62);
  text-align: center;
}
.btn-grab {
  padding: 12px 36px;
  border-radius: 12px;
  background: #C82000;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  font-weight: 900;
  box-shadow: 0 0 0 4px rgba(200,32,0,.3);
  animation: grab-pulse .42s ease-in-out infinite alternate;
}
.btn-grab:disabled { opacity: .5; animation: none; cursor: not-allowed; }
@keyframes grab-pulse {
  from { transform: scale(1); }
  to   { transform: scale(1.06); box-shadow: 0 0 0 10px rgba(200,32,0,.15); }
}
</style>
