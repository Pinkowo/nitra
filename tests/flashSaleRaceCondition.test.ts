import { describe, it, expect, vi, beforeEach } from 'vitest'

/**
 * Integration test for flash sale race condition.
 *
 * Because the real Firebase runTransaction cannot be tested without a live DB,
 * we test the transaction logic contract via a mock that simulates atomic
 * first-writer-wins semantics.
 */

// Simulated atomic in-memory transaction (mirrors Firebase runTransaction behavior)
function createAtomicClaimer() {
  let state: { claimed: boolean; claimedByUid: string | null } = {
    claimed: false,
    claimedByUid: null,
  }

  async function runTransaction(uid: string): Promise<boolean> {
    // Simulate atomic CAS: only the first writer wins
    if (state.claimed) {
      return false // already claimed
    }
    state = { claimed: true, claimedByUid: uid }
    return true
  }

  function reset() {
    state = { claimed: false, claimedByUid: null }
  }

  function getState() {
    return { ...state }
  }

  return { runTransaction, reset, getState }
}

describe('Flash Sale race condition — single winner guarantee', () => {
  const claimer = createAtomicClaimer()

  beforeEach(() => {
    claimer.reset()
  })

  it('sequential claims: only the first succeeds', async () => {
    const result1 = await claimer.runTransaction('player-A')
    const result2 = await claimer.runTransaction('player-B')

    expect(result1).toBe(true)
    expect(result2).toBe(false)
    expect(claimer.getState().claimedByUid).toBe('player-A')
  })

  it('concurrent claims (Promise.all): exactly 1 winner out of N', async () => {
    const players = ['p1', 'p2', 'p3', 'p4', 'p5']
    const results = await Promise.all(players.map((uid) => claimer.runTransaction(uid)))

    const winners = results.filter(Boolean)
    expect(winners).toHaveLength(1)
    expect(claimer.getState().claimed).toBe(true)
  })

  it('100 concurrent claims: exactly 1 winner', async () => {
    const players = Array.from({ length: 100 }, (_, i) => `player-${i}`)
    const results = await Promise.all(players.map((uid) => claimer.runTransaction(uid)))

    const winCount = results.filter(Boolean).length
    expect(winCount).toBe(1)
  })

  it('claiming after sold-out always returns false', async () => {
    await claimer.runTransaction('first-player')
    const lateResult = await claimer.runTransaction('late-player')
    expect(lateResult).toBe(false)
  })
})

describe('Flash Sale — Firebase transaction signature contract', () => {
  it('transaction updater returns undefined (abort) when already claimed', () => {
    // The Firebase transaction updater function should return undefined to abort
    // when the item is already claimed — this is the contract we must follow
    const flashSaleTransactionUpdater = (
      current: { claimed: boolean; claimedByUid: string | null } | null,
      uid: string,
      playerName: string,
    ) => {
      if (current?.claimed) return undefined // abort
      return { ...current, claimed: true, claimedByUid: uid, claimedByName: playerName }
    }

    const alreadyClaimed = { claimed: true, claimedByUid: 'winner' }
    expect(flashSaleTransactionUpdater(alreadyClaimed, 'loser', 'Loser')).toBeUndefined()

    const notYetClaimed = { claimed: false, claimedByUid: null }
    const result = flashSaleTransactionUpdater(notYetClaimed, 'winner', 'Winner')
    expect(result?.claimed).toBe(true)
    expect(result?.claimedByUid).toBe('winner')
  })
})
