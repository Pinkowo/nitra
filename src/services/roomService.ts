import { db, ref, onValue, set, update, runTransaction, serverTimestamp, remove } from './firebase'
import type { Room, Player } from '../types'
import { GameStatus } from '../types'

// ─── Helpers ─────────────────────────────────────────────────────────────────

function generateRoomId(): string {
  return Math.floor(1000 + Math.random() * 9000).toString()
}

// ─── Create Room ─────────────────────────────────────────────────────────────

export async function createRoom(hostUid: string, hostName: string): Promise<string> {
  const roomId = generateRoomId()

  const hostPlayer: Player = {
    uid: hostUid,
    name: hostName,
    cashBalance: 0,
    assetsValue: 0,
    creditUsed: 0,
    creditLimit: 10000,
    ownedEquipment: [],
    customersRecruited: 0,
    joinedAt: Date.now(),
    isHost: true,
  }

  const room: Omit<Room, 'id'> & { id: string } = {
    id: roomId,
    hostUid,
    status: GameStatus.Waiting,
    startedAt: null,
    players: {
      [hostUid]: hostPlayer,
    },
  }

  try {
    await set(ref(db, `rooms/${roomId}`), room)
    return roomId
  } catch (error) {
    console.error('[roomService] createRoom failed:', error)
    throw error
  }
}

// ─── Join Room ────────────────────────────────────────────────────────────────

export async function joinRoom(
  roomId: string,
  player: Omit<Player, 'isHost'>,
): Promise<void> {
  try {
    await set(ref(db, `rooms/${roomId}/players/${player.uid}`), {
      ...player,
      isHost: false,
    })
  } catch (error) {
    console.error('[roomService] joinRoom failed:', error)
    throw error
  }
}

// ─── Start Game ───────────────────────────────────────────────────────────────

export async function startGame(roomId: string): Promise<void> {
  try {
    await update(ref(db, `rooms/${roomId}`), {
      status: GameStatus.Playing,
      startedAt: serverTimestamp(),
    })
  } catch (error) {
    console.error('[roomService] startGame failed:', error)
    throw error
  }
}

// ─── End Game ─────────────────────────────────────────────────────────────────

export async function endGame(roomId: string): Promise<void> {
  try {
    const roomRef = ref(db, `rooms/${roomId}`)
    await runTransaction(roomRef, (current: Room | null) => {
      if (!current) return // abort — room doesn't exist
      if (current.status === GameStatus.Ended) return // abort — already ended
      return { ...current, status: GameStatus.Ended }
    })
  } catch (error) {
    console.error('[roomService] endGame failed:', error)
    throw error
  }
}

// ─── Delete Room ─────────────────────────────────────────────────────────────

export async function deleteRoom(roomId: string): Promise<void> {
  try {
    await remove(ref(db, `rooms/${roomId}`))
  } catch (error) {
    console.error('[roomService] deleteRoom failed:', error)
    throw error
  }
}

// ─── Subscribe Room ───────────────────────────────────────────────────────────

export function subscribeRoom(
  roomId: string,
  callback: (room: Room | null) => void,
): () => void {
  const roomRef = ref(db, `rooms/${roomId}`)
  const unsubscribe = onValue(roomRef, (snapshot) => {
    callback(snapshot.exists() ? (snapshot.val() as Room) : null)
  })
  return unsubscribe
}
