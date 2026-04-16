import { db, ref, onValue, update, get } from './firebase'
import type { Player, LeaderboardEntry } from '../types'

// ─── Sync Player Data ─────────────────────────────────────────────────────────

export async function syncPlayerData(
  roomId: string,
  uid: string,
  data: Partial<Player>,
): Promise<void> {
  try {
    await update(ref(db, `rooms/${roomId}/players/${uid}`), data)
  } catch (error) {
    console.error('[playerService] syncPlayerData failed:', error)
    throw error
  }
}

// ─── Get Leaderboard ──────────────────────────────────────────────────────────

export async function getLeaderboard(roomId: string): Promise<LeaderboardEntry[]> {
  try {
    const snapshot = await get(ref(db, `rooms/${roomId}/players`))

    if (!snapshot.exists()) return []

    const players = snapshot.val() as Record<string, Player>

    const entries: Omit<LeaderboardEntry, 'rank'>[] = Object.values(players).map((player) => ({
      uid: player.uid,
      name: player.name,
      cashBalance: player.cashBalance,
      assetsValue: player.assetsValue,
      attackPower: 10 + Math.floor(player.assetsValue / 100),
      customersRecruited: player.customersRecruited ?? 0,
      totalWorth: player.cashBalance + player.assetsValue,
    }))

    entries.sort((a, b) => b.totalWorth - a.totalWorth)

    return entries.map((entry, index) => ({ ...entry, rank: index + 1 }))
  } catch (error) {
    console.error('[playerService] getLeaderboard failed:', error)
    throw error
  }
}

// ─── Subscribe Player ─────────────────────────────────────────────────────────

export function subscribePlayer(
  roomId: string,
  uid: string,
  callback: (player: Player | null) => void,
): () => void {
  const playerRef = ref(db, `rooms/${roomId}/players/${uid}`)
  const unsubscribe = onValue(playerRef, (snapshot) => {
    callback(snapshot.exists() ? (snapshot.val() as Player) : null)
  })
  return unsubscribe
}
