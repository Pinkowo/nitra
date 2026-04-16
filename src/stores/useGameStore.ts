import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Equipment, Player } from '../types'
import { PaymentMode } from '../types'
import { syncPlayerData } from '../services/playerService'
import { equipmentById } from '../assets/equipment-data'

// ─── Store ────────────────────────────────────────────────────────────────────

export const useGameStore = defineStore('game', () => {
  // ─── State ─────────────────────────────────────────────────────────────────

  const uid = ref<string>('')
  const roomId = ref<string>('')
  const playerName = ref<string>('')
  const isHost = ref<boolean>(false)

  const cashBalance = ref<number>(0)
  const assetsValue = ref<number>(0)
  const creditUsed = ref<number>(0)
  const creditLimit = ref<number>(10000)
  const ownedEquipment = ref<string[]>([])
  const customersRecruited = ref<number>(0)

  // ─── Computed Getters ───────────────────────────────────────────────────────

  const attackPower = computed(() => 10)

  // 1 + 已買器材總價 / 20000（例如買了 $2000 → 1.1x，全買完約 1.7x）
  const rewardMultiplier = computed(() => {
    const totalCost = ownedEquipment.value.reduce(
      (sum, id) => sum + (equipmentById[id]?.price ?? 0), 0,
    )
    return 1 + totalCost / 20000
  })

  const totalWorth = computed(() => cashBalance.value + assetsValue.value)

  const availableCredit = computed(() => creditLimit.value - creditUsed.value)

  const canAffordCash = (price: number): boolean => cashBalance.value >= price

  const canAffordNitra = (price: number): boolean =>
    creditUsed.value + price <= creditLimit.value

  // ─── Helpers ────────────────────────────────────────────────────────────────

  function _buildSyncPayload(): Partial<Player> {
    return {
      cashBalance: cashBalance.value,
      assetsValue: assetsValue.value,
      creditUsed: creditUsed.value,
      ownedEquipment: [...ownedEquipment.value],
      customersRecruited: customersRecruited.value,
    }
  }

  function _sync(): void {
    if (!roomId.value || !uid.value) return
    syncPlayerData(roomId.value, uid.value, _buildSyncPayload()).catch((err) => {
      console.error('[useGameStore] syncPlayerData failed:', err)
    })
  }

  // ─── Actions ────────────────────────────────────────────────────────────────

  function init(
    newUid: string,
    newRoomId: string,
    name: string,
    hostFlag = false,
  ): void {
    uid.value = newUid
    roomId.value = newRoomId
    playerName.value = name
    isHost.value = hostFlag

    cashBalance.value = 0
    assetsValue.value = 0
    creditUsed.value = 0
    creditLimit.value = 10000
    ownedEquipment.value = []
    customersRecruited.value = 0
  }

  function syncFromFirebase(playerData: Player): void {
    cashBalance.value = playerData.cashBalance
    assetsValue.value = playerData.assetsValue
    creditUsed.value = playerData.creditUsed
    creditLimit.value = playerData.creditLimit
    ownedEquipment.value = [...(playerData.ownedEquipment ?? [])]
    customersRecruited.value = playerData.customersRecruited ?? 0
    playerName.value = playerData.name
    isHost.value = playerData.isHost
  }

  function buyEquipment(item: Equipment, mode: PaymentMode): void {
    if (mode === PaymentMode.Cash) {
      cashBalance.value -= item.price
    } else {
      creditUsed.value += item.price
    }
    assetsValue.value += item.assetValue
    ownedEquipment.value.push(item.id)
    _sync()
  }

  function repayCredit(): void {
    if (creditUsed.value === 0) return
    cashBalance.value -= creditUsed.value
    creditUsed.value = 0
    _sync()
  }

  function addCash(amount: number): void {
    cashBalance.value += amount
    _sync()
  }

  /** Flash sale win: deducts Nitra credit and adds equipment. Returns false if insufficient credit. */
  function buyEquipmentFlashSale(item: Equipment): boolean {
    if (ownedEquipment.value.includes(item.id)) return false
    if (availableCredit.value < item.price) return false
    creditUsed.value += item.price
    assetsValue.value += item.assetValue
    ownedEquipment.value.push(item.id)
    _sync()
    return true
  }

  function recruitCustomer(): void {
    customersRecruited.value++
    _sync()
  }

  return {
    // state
    uid,
    roomId,
    playerName,
    isHost,
    cashBalance,
    assetsValue,
    creditUsed,
    creditLimit,
    ownedEquipment,
    customersRecruited,
    // getters
    attackPower,
    rewardMultiplier,
    totalWorth,
    availableCredit,
    canAffordCash,
    canAffordNitra,
    // actions
    init,
    syncFromFirebase,
    buyEquipment,
    buyEquipmentFlashSale,
    recruitCustomer,
    repayCredit,
    addCash,
  }
})
