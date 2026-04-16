<template>
  <div
    v-if="whaleState?.active"
    class="whale-overlay absolute-full flex flex-center column q-gutter-md q-pa-lg"
    style="background: rgba(0,0,0,0.75); z-index: 100;"
    @click="handleTap"
    @touchstart.prevent="handleTap"
  >
    <div class="text-h5 text-yellow text-weight-bold text-center">
      🐋 VIP 金客出現！最後一擊得大獎！
    </div>

    <!-- Shared HP bar -->
    <div class="full-width" style="max-width: 320px;">
      <q-linear-progress
        :value="hpRatio"
        color="yellow"
        track-color="grey-8"
        rounded
        size="20px"
      />
      <div class="text-caption text-grey-3 text-center q-mt-xs">
        HP {{ whaleState.currentHp.toLocaleString() }} / {{ whaleState.whaleBaseHp.toLocaleString() }}
      </div>
    </div>

    <!-- Whale sprite (AI art slot) -->
    <div class="text-center" style="font-size: 6rem; cursor: pointer;">🐋</div>

    <div class="text-caption text-grey-4">點擊攻擊！</div>

    <!-- Last hit banner -->
    <div v-if="lastHitWinner" class="text-center">
      <div class="text-h4 text-yellow text-weight-bold">🏆 LAST HIT!</div>
      <div class="text-h6 text-white">{{ lastHitWinner }}</div>
      <div class="text-h5 text-green-4">+{{ whaleState.bonusCash.toLocaleString() }} 💰</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useEventStore } from '../stores/useEventStore'
import { useGameStore } from '../stores/useGameStore'
import { useRoomStore } from '../stores/useRoomStore'
import { tapWhale, clearWhale } from '../services/whaleService'

const eventStore = useEventStore()
const gameStore = useGameStore()
const roomStore = useRoomStore()

const whaleState = computed(() => eventStore.whaleState)

const hpRatio = computed(() => {
  if (!whaleState.value) return 0
  return whaleState.value.currentHp / whaleState.value.whaleBaseHp
})

const lastHitWinner = computed(() => {
  if (!whaleState.value?.lastHitPlayer) return null
  const player = roomStore.players[whaleState.value.lastHitPlayer]
  return player?.name ?? whaleState.value.lastHitPlayer
})

async function handleTap() {
  if (!whaleState.value?.active) return
  const { lastHit, bonusCash } = await tapWhale(
    gameStore.roomId,
    gameStore.uid,
    gameStore.attackPower,
  )
  if (lastHit) {
    if (bonusCash > 0) gameStore.addCash(bonusCash)
    // Clear the whale node from Firebase so all clients know it's defeated
    await clearWhale(gameStore.roomId)
  }
}
</script>
