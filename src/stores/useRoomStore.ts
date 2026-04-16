import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Player, Room } from '../types'
import { GameStatus } from '../types'

// ─── Store ────────────────────────────────────────────────────────────────────

export const useRoomStore = defineStore('room', () => {
  // ─── State ─────────────────────────────────────────────────────────────────

  const roomId = ref<string>('')
  const hostUid = ref<string>('')
  const status = ref<GameStatus>(GameStatus.Waiting)
  const startedAt = ref<number | null>(null)
  const players = ref<Record<string, Player>>({})

  // ─── Computed ───────────────────────────────────────────────────────────────

  const timeRemaining = computed<number>(() => {
    if (!startedAt.value || status.value !== GameStatus.Playing) return 180
    const elapsed = (Date.now() - startedAt.value) / 1000
    return Math.max(0, 180 - elapsed)
  })

  const sortedPlayers = computed<Player[]>(() =>
    Object.values(players.value).sort(
      (a, b) => b.cashBalance + b.assetsValue - (a.cashBalance + a.assetsValue),
    ),
  )

  // ─── Actions ────────────────────────────────────────────────────────────────

  function setRoom(room: Room): void {
    roomId.value = room.id
    hostUid.value = room.hostUid
    status.value = room.status
    startedAt.value = room.startedAt
    // Firebase omits empty arrays; normalize ownedEquipment to [] for each player
    const normalized = Object.fromEntries(
      Object.entries(room.players ?? {}).map(([uid, p]) => [
        uid,
        { ...p, ownedEquipment: p.ownedEquipment ?? [] },
      ])
    )
    players.value = normalized
  }

  function setStatus(newStatus: GameStatus): void {
    status.value = newStatus
  }

  return {
    // state
    roomId,
    hostUid,
    status,
    startedAt,
    players,
    // getters
    timeRemaining,
    sortedPlayers,
    // actions
    setRoom,
    setStatus,
  }
})
