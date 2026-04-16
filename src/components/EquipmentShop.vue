<template>
  <div class="equipment-shop q-pa-md">
    <!-- Header -->
    <div class="row items-center q-mb-sm">
      <div class="text-subtitle1 text-white text-weight-bold">器材商店</div>
      <q-space />
      <q-btn
        v-if="gameStore.creditUsed > 0"
        size="sm"
        color="orange"
        unelevated
        rounded
        :disable="isLocked"
        label="還款 Nitra"
        @click="repay"
      />
    </div>

    <!-- Equipment grid -->
    <div class="row q-gutter-sm">
      <q-card
        v-for="item in EQUIPMENT_LIST"
        :key="item.id"
        flat
        class="col-5"
        style="background: rgba(255,255,255,0.06); flex: 1 1 140px; max-width: 160px;"
      >
        <!-- Image slot -->
        <div class="flex flex-center q-pa-sm" style="height: 64px; font-size: 0.65rem; color: rgba(255,255,255,0.4); letter-spacing: 0.02em;">
          {{ item.isPremium ? '★' : '·' }}
        </div>

        <q-card-section class="q-pa-xs">
          <div class="text-caption text-white text-weight-bold ellipsis">{{ item.name }}</div>
          <div class="text-caption text-grey-4">+{{ item.assetValue.toLocaleString() }} 資產</div>
          <div class="text-caption text-grey-4">${{ item.price.toLocaleString() }}</div>
          <q-badge v-if="item.isPremium" color="purple" class="q-mt-xs">限量</q-badge>
        </q-card-section>

        <!-- Actions -->
        <q-card-actions v-if="!gameStore.ownedEquipment.includes(item.id)" class="q-pa-xs">
          <q-btn
            size="xs"
            color="orange-7"
            unelevated
            class="full-width"
            :disable="isLocked || !gameStore.canAffordNitra(item.price)"
            label="Nitra 購買"
            @click="buyItem(item)"
          />
        </q-card-actions>
        <div v-else class="text-positive text-caption text-center q-pa-xs">已擁有</div>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Equipment } from '../types'
import { PaymentMode } from '../types'
import { useGameStore } from '../stores/useGameStore'
import { useRepaymentLock } from '../composables/useRepaymentLock'
import { EQUIPMENT_LIST } from '../assets/equipment-data'

const gameStore = useGameStore()
const { isLocked, repay } = useRepaymentLock()

function buyItem(item: Equipment) {
  if (isLocked.value) return
  gameStore.buyEquipment(item, PaymentMode.Nitra)
}
</script>
