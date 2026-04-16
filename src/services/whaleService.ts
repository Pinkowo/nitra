import { db, ref, onValue, set, runTransaction, remove } from './firebase'
import type { WhaleState } from '../types'

// ─── Spawn Whale ──────────────────────────────────────────────────────────────

export async function spawnWhale(roomId: string, whaleBaseHp: number): Promise<void> {
  try {
    await set(ref(db, `rooms/${roomId}/whale`), {
      active: true,
      whaleBaseHp,
      currentHp: whaleBaseHp,
      lastHitPlayer: null,
      bonusCash: 0,
    } as WhaleState)
  } catch (error) {
    console.error('[whaleService] spawnWhale failed:', error)
    throw error
  }
}

// ─── Tap Whale ────────────────────────────────────────────────────────────────

/**
 * Atomically deals `damage` to the whale.
 * If this hit reduces HP to ≤ 0, the caller is recorded as the last-hit winner.
 * Returns whether this call was the last hit and the bonus cash earned.
 */
export async function tapWhale(
  roomId: string,
  uid: string,
  damage: number,
): Promise<{ lastHit: boolean; bonusCash: number }> {
  const whaleRef = ref(db, `rooms/${roomId}/whale`)

  try {
    const result = await runTransaction(whaleRef, (current: WhaleState | null) => {
      if (!current || !current.active || current.currentHp <= 0) return // abort
      const newHp = current.currentHp - damage
      if (newHp <= 0) {
        const bonusCash = current.whaleBaseHp * 50
        return {
          ...current,
          currentHp: 0,
          lastHitPlayer: uid,
          bonusCash,
          active: false,
        } as WhaleState
      }
      return { ...current, currentHp: newHp }
    })

    const finalState = result.snapshot.val() as WhaleState | null
    const lastHit = finalState?.lastHitPlayer === uid && result.committed
    const bonusCash = lastHit ? (finalState?.bonusCash ?? 0) : 0

    return { lastHit, bonusCash }
  } catch (error) {
    console.error('[whaleService] tapWhale failed:', error)
    return { lastHit: false, bonusCash: 0 }
  }
}

// ─── Subscribe Whale ──────────────────────────────────────────────────────────

export function subscribeWhale(
  roomId: string,
  callback: (state: WhaleState | null) => void,
): () => void {
  const whaleRef = ref(db, `rooms/${roomId}/whale`)
  const unsubscribe = onValue(whaleRef, (snapshot) => {
    callback(snapshot.exists() ? (snapshot.val() as WhaleState) : null)
  })
  return unsubscribe
}

// ─── Clear Whale ──────────────────────────────────────────────────────────────

export async function clearWhale(roomId: string): Promise<void> {
  try {
    await remove(ref(db, `rooms/${roomId}/whale`))
  } catch (error) {
    console.error('[whaleService] clearWhale failed:', error)
    throw error
  }
}
