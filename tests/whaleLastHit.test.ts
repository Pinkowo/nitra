import { describe, it, expect, beforeEach } from 'vitest'

/**
 * Integration test for whale last-hit logic.
 * Tests the transaction contract that determines the last-hit winner.
 */

interface WhaleState {
  active: boolean
  whaleBaseHp: number
  currentHp: number
  lastHitPlayer: string | null
  bonusCash: number
}

// Simulate atomic whale HP transaction (mirrors Firebase runTransaction)
function createWhaleSimulator(baseHp: number) {
  let state: WhaleState = {
    active: true,
    whaleBaseHp: baseHp,
    currentHp: baseHp,
    lastHitPlayer: null,
    bonusCash: 0,
  }

  const mutex = { locked: false }

  async function tapWhale(uid: string, damage: number): Promise<{ lastHit: boolean; bonusCash: number }> {
    // Serialize via simple queue (simulates Firebase atomic transaction)
    while (mutex.locked) {
      await Promise.resolve()
    }
    mutex.locked = true

    try {
      if (!state.active || state.currentHp <= 0) {
        return { lastHit: false, bonusCash: 0 }
      }
      const newHp = state.currentHp - damage
      if (newHp <= 0) {
        state = {
          ...state,
          currentHp: 0,
          lastHitPlayer: uid,
          bonusCash: state.whaleBaseHp * 50,
          active: false,
        }
        return { lastHit: true, bonusCash: state.bonusCash }
      }
      state.currentHp = newHp
      return { lastHit: false, bonusCash: 0 }
    } finally {
      mutex.locked = false
    }
  }

  function getState() { return { ...state } }
  return { tapWhale, getState }
}

describe('Whale last-hit — single bonus recipient guarantee', () => {
  it('player who reduces HP to 0 gets last-hit bonus', async () => {
    const whale = createWhaleSimulator(100)
    // Player A deals 90 damage
    await whale.tapWhale('player-A', 90)
    // Player B deals final 10 damage
    const result = await whale.tapWhale('player-B', 10)

    expect(result.lastHit).toBe(true)
    expect(result.bonusCash).toBe(5000) // 100 * 50
    expect(whale.getState().lastHitPlayer).toBe('player-B')
  })

  it('non-last-hit players receive 0 bonus', async () => {
    const whale = createWhaleSimulator(100)
    const result = await whale.tapWhale('player-A', 50) // not finishing blow
    expect(result.lastHit).toBe(false)
    expect(result.bonusCash).toBe(0)
  })

  it('concurrent taps: exactly 1 player receives last-hit bonus', async () => {
    const whale = createWhaleSimulator(200)
    const players = ['p1', 'p2', 'p3', 'p4']
    // Each deals 60 damage — total 240, whale has 200 HP
    const results = await Promise.all(players.map((uid) => whale.tapWhale(uid, 60)))

    const lastHitResults = results.filter((r) => r.lastHit)
    expect(lastHitResults).toHaveLength(1)
    expect(lastHitResults[0]?.bonusCash).toBe(10000) // 200 * 50
    expect(whale.getState().active).toBe(false)
  })

  it('bonus = whaleBaseHp * 50', async () => {
    const whale = createWhaleSimulator(1000)
    // Deal enough damage to kill
    await whale.tapWhale('player-A', 999)
    const result = await whale.tapWhale('player-B', 1)
    expect(result.bonusCash).toBe(50000) // 1000 * 50
  })

  it('tapping after whale is defeated returns no bonus', async () => {
    const whale = createWhaleSimulator(50)
    await whale.tapWhale('killer', 50) // kill it
    const lateResult = await whale.tapWhale('late-player', 50)
    expect(lateResult.lastHit).toBe(false)
    expect(lateResult.bonusCash).toBe(0)
  })
})
