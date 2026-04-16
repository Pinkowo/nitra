import { computed, ref, type Ref } from 'vue'
import type { Customer } from '../types'

// ─── Composable ───────────────────────────────────────────────────────────────

export function useCustomerTimer(elapsedSeconds: Ref<number>) {
  // Tier advances every 30 seconds
  const tier = computed<number>(() => Math.floor(elapsedSeconds.value / 30))

  // Base HP for the current tier
  const baseHp = computed<number>(() => Math.round(100 * Math.pow(1.5, tier.value)))

  // ─── Factory ────────────────────────────────────────────────────────────────

  function createCustomer(currentTier: number): Customer {
    const maxHp = Math.round(100 * Math.pow(1.5, currentTier))
    return {
      id: crypto.randomUUID(),
      maxHp,
      currentHp: maxHp,
      tier: currentTier,
      cashReward: maxHp * 10,
    }
  }

  // ─── State ──────────────────────────────────────────────────────────────────

  const customer = ref<Customer>(createCustomer(0))

  // ─── Actions ────────────────────────────────────────────────────────────────

  function spawnNext(): Customer {
    const next = createCustomer(tier.value)
    customer.value = next
    return next
  }

  return {
    customer,
    tier,
    baseHp,
    spawnNext,
    createCustomer,
  }
}
