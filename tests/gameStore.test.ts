import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useGameStore } from '../src/stores/useGameStore'
import { PaymentMode } from '../src/types'
import type { Equipment } from '../src/types'

// Mock playerService to avoid Firebase calls in unit tests
vi.mock('../src/services/playerService', () => ({
  syncPlayerData: vi.fn().mockResolvedValue(undefined),
  subscribePlayer: vi.fn().mockReturnValue(() => {}),
  getLeaderboard: vi.fn().mockResolvedValue([]),
}))

const mockItem: Equipment = {
  id: 'test-chair',
  name: '診療椅',
  nameEn: 'Dental Chair',
  price: 500,
  assetValue: 600,
  imagePlaceholder: '',
  isPremium: false,
  description: '',
}

describe('useGameStore — attackPower & totalWorth computed getters', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('attackPower is 10 at game start (assetsValue = 0)', () => {
    const store = useGameStore()
    store.init('uid1', 'room1', 'Alice')
    expect(store.attackPower).toBe(10)
  })

  it('attackPower = 10 + floor(assetsValue / 100)', () => {
    const store = useGameStore()
    store.init('uid1', 'room1', 'Alice')
    store.buyEquipment(mockItem, PaymentMode.Cash)
    // assetValue += 600 → attackPower = 10 + floor(600/100) = 16
    expect(store.attackPower).toBe(16)
  })

  it('attackPower floors decimal division correctly', () => {
    const store = useGameStore()
    store.init('uid1', 'room1', 'Bob')
    // Manually push assetsValue to 250
    store.buyEquipment({ ...mockItem, id: 'x', price: 0, assetValue: 250 }, PaymentMode.Cash)
    // 10 + floor(250/100) = 12
    expect(store.attackPower).toBe(12)
  })

  it('totalWorth = cashBalance + assetsValue', () => {
    const store = useGameStore()
    store.init('uid1', 'room1', 'Carol')
    // initial: cashBalance=1000, assetsValue=0
    expect(store.totalWorth).toBe(1000)
    store.buyEquipment(mockItem, PaymentMode.Cash)
    // cashBalance: 1000-500=500, assetsValue: 600 → totalWorth=1100
    expect(store.totalWorth).toBe(1100)
  })

  it('Nitra purchase does not deduct cashBalance', () => {
    const store = useGameStore()
    store.init('uid1', 'room1', 'Dave')
    store.buyEquipment(mockItem, PaymentMode.Nitra)
    expect(store.cashBalance).toBe(1000) // unchanged
    expect(store.creditUsed).toBe(500)
    expect(store.assetsValue).toBe(600)
  })

  it('repayCredit zeroes creditUsed and deducts from cashBalance', () => {
    const store = useGameStore()
    store.init('uid1', 'room1', 'Eve')
    store.buyEquipment(mockItem, PaymentMode.Nitra) // creditUsed=500
    store.repayCredit()
    expect(store.creditUsed).toBe(0)
    expect(store.cashBalance).toBe(500) // 1000 - 500
  })
})
