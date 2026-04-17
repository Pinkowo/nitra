import { db, ref, onValue, set, update, runTransaction } from './firebase'
import type { FlashSaleState } from '../types'
import { PREMIUM_EQUIPMENT } from '../assets/equipment-data'

// ─── Internal timer map (roomId → intervalId) ─────────────────────────────────
const activeTimers = new Map<string, ReturnType<typeof setInterval>>()

// ─── Init Flash Sale Timer ────────────────────────────────────────────────────

/**
 * Starts a repeating 60-second cycle for the given room.
 * At t=57s: broadcasts a warning (active:true, claimed:false).
 * At t=60s (next tick): the claim window is already open — hosts call
 *   claimFlashSaleItem() to race for the item.
 *
 * Call this once per room, from the host client only.
 */
export function initFlashSaleTimer(roomId: string): void {
  if (activeTimers.has(roomId)) return // already running

  let secondsElapsed = 0

  // Exact seconds at which countdown starts (3s before each appearance)
  // Corresponding to 1:10, 0:50, 0:30 remaining in a 90s game
  const COUNTDOWN_SECONDS = new Set([17, 37, 57])
  // Exact seconds at which the overlay appears (after countdown finishes)
  const ACTIVATE_SECONDS  = new Set([20, 40, 60])

  const intervalId = setInterval(async () => {
    secondsElapsed++

    if (COUNTDOWN_SECONDS.has(secondsElapsed)) {
      // Start 3-second countdown — overlay is NOT shown yet (active: false)
      const randomItem = PREMIUM_EQUIPMENT[Math.floor(Math.random() * PREMIUM_EQUIPMENT.length)]
      try {
        await set(ref(db, `rooms/${roomId}/flashSale`), {
          active: false,
          equipmentId: randomItem?.id ?? null,
          claimed: false,
          claimedByUid: null,
          claimedByName: null,
          countdownStartedAt: Date.now(),
        } as FlashSaleState)
      } catch (error) {
        console.error('[flashSaleService] broadcasting flash sale countdown failed:', error)
      }
    }

    if (ACTIVATE_SECONDS.has(secondsElapsed)) {
      // Countdown finished — now reveal the overlay so players can grab
      try {
        await update(ref(db, `rooms/${roomId}/flashSale`), { active: true })
      } catch (error) {
        console.error('[flashSaleService] activating flash sale overlay failed:', error)
      }
    }
  }, 1000)

  activeTimers.set(roomId, intervalId)
}

// ─── Stop Flash Sale Timer ────────────────────────────────────────────────────

export function stopFlashSaleTimer(roomId: string): void {
  const id = activeTimers.get(roomId)
  if (id !== undefined) {
    clearInterval(id)
    activeTimers.delete(roomId)
  }
}

// ─── Claim Flash Sale Item ────────────────────────────────────────────────────

/**
 * Uses runTransaction to ensure only the first caller claims the item.
 * Returns true if this client successfully claimed it, false otherwise.
 */
export async function claimFlashSaleItem(
  roomId: string,
  uid: string,
  playerName: string,
): Promise<boolean> {
  const flashSaleRef = ref(db, `rooms/${roomId}/flashSale`)

  try {
    const result = await runTransaction(flashSaleRef, (current: FlashSaleState | null) => {
      if (!current || current.claimed) return // abort — already claimed or no sale
      return {
        ...current,
        claimed: true,
        claimedByUid: uid,
        claimedByName: playerName,
      } as FlashSaleState
    })

    return result.committed
  } catch (error) {
    console.error('[flashSaleService] claimFlashSaleItem failed:', error)
    return false
  }
}

// ─── Subscribe Flash Sale ─────────────────────────────────────────────────────

export function subscribeFlashSale(
  roomId: string,
  callback: (state: FlashSaleState | null) => void,
): () => void {
  const flashSaleRef = ref(db, `rooms/${roomId}/flashSale`)
  const unsubscribe = onValue(flashSaleRef, (snapshot) => {
    callback(snapshot.exists() ? (snapshot.val() as FlashSaleState) : null)
  })
  return unsubscribe
}
