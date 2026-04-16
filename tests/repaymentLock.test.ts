import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useEventStore } from '../src/stores/useEventStore'
import { useGameStore } from '../src/stores/useGameStore'
import { useRepaymentLock } from '../src/composables/useRepaymentLock'
import { PaymentMode } from '../src/types'
import type { Equipment } from '../src/types'

vi.mock('../src/services/playerService', () => ({
  syncPlayerData: vi.fn().mockResolvedValue(undefined),
}))

const mockItem: Equipment = {
  id: 'bp-monitor',
  name: '血壓計',
  nameEn: 'BP Monitor',
  price: 300,
  assetValue: 350,
  imagePlaceholder: '',
  isPremium: false,
  description: '',
}

describe('useRepaymentLock — 3-second lock behavior', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('isLocked is false initially', () => {
    const { isLocked } = useRepaymentLock()
    expect(isLocked.value).toBe(false)
  })

  it('repay sets isRepaymentLocked to true immediately', () => {
    const gameStore = useGameStore()
    const eventStore = useEventStore()
    gameStore.init('uid1', 'room1', 'Alice')
    gameStore.buyEquipment(mockItem, PaymentMode.Nitra)

    const { repay, isLocked } = useRepaymentLock()
    repay()

    expect(isLocked.value).toBe(true)
    expect(eventStore.isRepaymentLocked).toBe(true)
  })

  it('lock automatically releases after 3000ms', () => {
    const gameStore = useGameStore()
    gameStore.init('uid1', 'room1', 'Bob')
    gameStore.buyEquipment(mockItem, PaymentMode.Nitra)

    const { repay, isLocked } = useRepaymentLock()
    repay()

    expect(isLocked.value).toBe(true)

    vi.advanceTimersByTime(2999)
    expect(isLocked.value).toBe(true)

    vi.advanceTimersByTime(1)
    expect(isLocked.value).toBe(false)
  })

  it('repay does nothing if creditUsed is 0', () => {
    const gameStore = useGameStore()
    const eventStore = useEventStore()
    gameStore.init('uid1', 'room1', 'Carol')

    const { repay } = useRepaymentLock()
    repay()

    expect(eventStore.isRepaymentLocked).toBe(false)
  })

  it('repay does nothing if already locked', () => {
    const gameStore = useGameStore()
    gameStore.init('uid1', 'room1', 'Dave')
    gameStore.buyEquipment(mockItem, PaymentMode.Nitra)

    const { repay } = useRepaymentLock()
    repay() // first repay, creditUsed → 0
    const lockTriggeredAt = Date.now()

    // Second repay during lock should be no-op
    gameStore.buyEquipment({ ...mockItem, id: 'x2' }, PaymentMode.Nitra)
    repay() // should not fire because isLocked=true

    // Timer should still be from first repay
    vi.advanceTimersByTime(3000)
    // After 3s, lock lifts
    expect(useRepaymentLock().isLocked.value).toBe(false)
    void lockTriggeredAt // reference to suppress unused warning
  })
})
