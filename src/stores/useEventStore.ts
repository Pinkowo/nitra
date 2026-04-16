import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { FlashSaleState, WhaleState } from '../types'

// ─── Store ────────────────────────────────────────────────────────────────────

export const useEventStore = defineStore('event', () => {
  // ─── State ─────────────────────────────────────────────────────────────────

  const flashSaleState = ref<FlashSaleState | null>(null)
  const whaleState = ref<WhaleState | null>(null)
  const isRepaymentLocked = ref<boolean>(false)
  const repayLockSecondsLeft = ref<number>(0)

  // ─── Actions ────────────────────────────────────────────────────────────────

  function setFlashSale(state: FlashSaleState | null): void {
    flashSaleState.value = state
  }

  function setWhale(state: WhaleState | null): void {
    whaleState.value = state
  }

  function triggerRepaymentLock(durationSeconds: number): void {
    isRepaymentLocked.value = true
    repayLockSecondsLeft.value = durationSeconds
    const tick = setInterval(() => {
      repayLockSecondsLeft.value--
      if (repayLockSecondsLeft.value <= 0) {
        clearInterval(tick)
        isRepaymentLocked.value = false
      }
    }, 1000)
  }

  return {
    // state
    flashSaleState,
    whaleState,
    isRepaymentLocked,
    repayLockSecondsLeft,
    // actions
    setFlashSale,
    setWhale,
    triggerRepaymentLock,
  }
})
