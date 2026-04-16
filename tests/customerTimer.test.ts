import { describe, it, expect } from 'vitest'
import { ref } from 'vue'
import { useCustomerTimer } from '../src/composables/useCustomerTimer'

describe('useCustomerTimer — HP tier scaling formula', () => {
  function timerAt(seconds: number) {
    return useCustomerTimer(ref(seconds))
  }

  it.each([
    [0, 100],    // tier 0: 100 * 1.5^0 = 100
    [29, 100],   // still tier 0
    [30, 150],   // tier 1: 100 * 1.5^1 = 150
    [59, 150],   // still tier 1
    [60, 225],   // tier 2: 100 * 1.5^2 = 225
    [90, 338],   // tier 3: 100 * 1.5^3 ≈ 337.5 → 338
    [120, 506],  // tier 4: 100 * 1.5^4 ≈ 506.25 → 506
    [150, 759],  // tier 5: 100 * 1.5^5 ≈ 759.375 → 759
    [180, 1139], // tier 6: 100 * 1.5^6 ≈ 1139.06 → 1139
    [210, 1709], // tier 7: 100 * 1.5^7 ≈ 1708.59 → 1709
    [240, 2563], // tier 8: 100 * 1.5^8 ≈ 2562.89 → 2563
    [270, 3844], // tier 9: 100 * 1.5^9 ≈ 3844.34 → 3844
  ])('at elapsed=%ds: tier baseHp should be %d', (elapsed, expectedHp) => {
    const { baseHp, tier } = timerAt(elapsed)
    const expectedTier = Math.floor(elapsed / 30)
    expect(tier.value).toBe(expectedTier)
    expect(baseHp.value).toBe(expectedHp)
  })

  it('createCustomer sets cashReward = maxHp * 10', () => {
    const { createCustomer } = timerAt(0)
    const c = createCustomer(0)
    expect(c.cashReward).toBe(c.maxHp * 10)
    expect(c.cashReward).toBe(1000)
  })

  it('spawnNext creates a new customer at current tier', () => {
    const elapsedRef = ref(60) // tier 2
    const { spawnNext, customer } = useCustomerTimer(elapsedRef)
    const next = spawnNext()
    expect(next.tier).toBe(2)
    expect(next.maxHp).toBe(225)
    expect(customer.value.id).toBe(next.id)
  })
})
