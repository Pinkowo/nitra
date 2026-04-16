import { computed } from 'vue'
import { useEventStore } from '../stores/useEventStore'
import { useGameStore } from '../stores/useGameStore'

export function useRepaymentLock() {
  const eventStore = useEventStore()
  const gameStore = useGameStore()

  const isLocked = computed(() => eventStore.isRepaymentLocked)

  function repay() {
    if (isLocked.value) return
    if (gameStore.creditUsed === 0) return
    const dur = Math.max(1, Math.min(5, Math.ceil(gameStore.creditUsed / (gameStore.creditLimit / 5))))
    gameStore.repayCredit()
    eventStore.triggerRepaymentLock(dur)
  }

  return { isLocked, repay }
}
