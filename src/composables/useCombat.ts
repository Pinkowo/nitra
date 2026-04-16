import { computed, type Ref } from 'vue'
import { gsap } from 'gsap'
import { useGameStore } from '../stores/useGameStore'
import { useEventStore } from '../stores/useEventStore'
import { tapWhale } from '../services/whaleService'
import { useCustomerTimer } from './useCustomerTimer'

// ─── Composable ───────────────────────────────────────────────────────────────

export function useCombat(elapsedSeconds: Ref<number>) {
  const gameStore = useGameStore()
  const eventStore = useEventStore()

  const { customer, tier, spawnNext } = useCustomerTimer(elapsedSeconds)

  const isRepaymentLocked = computed(() => eventStore.isRepaymentLocked)
  const whaleState = computed(() => eventStore.whaleState)
  const attackPower = computed(() => gameStore.attackPower)

  // ─── GSAP Floating Damage Number ─────────────────────────────────────────────

  function showDamageNumber(damage: number, x: number, y: number): void {
    const el = document.createElement('div')
    el.textContent = `+${damage}`
    el.style.cssText = `position:fixed;left:${x}px;top:${y}px;color:#FFD700;font-size:1.5rem;font-weight:bold;pointer-events:none;z-index:9999;`
    document.body.appendChild(el)
    gsap.to(el, {
      y: -60,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      onComplete: () => el.remove(),
    })
  }

  // ─── Tap Handler ─────────────────────────────────────────────────────────────

  async function tapCustomer(event: MouseEvent | TouchEvent): Promise<void> {
    if (isRepaymentLocked.value) return

    const damage = attackPower.value

    // Determine tap coordinates
    let x: number
    let y: number
    if (event instanceof MouseEvent) {
      x = event.clientX
      y = event.clientY
    } else {
      const touch = event.touches[0] ?? event.changedTouches[0]
      x = touch?.clientX ?? 0
      y = touch?.clientY ?? 0
    }

    // Vibration feedback
    navigator.vibrate?.(30)

    if (whaleState.value?.active) {
      // Delegate to whale combat
      const { lastHit, bonusCash } = await tapWhale(
        gameStore.roomId,
        gameStore.uid,
        damage,
      )
      if (lastHit && bonusCash > 0) {
        gameStore.addCash(bonusCash)
      }
    } else {
      // Damage customer
      const c = customer.value
      const newHp = Math.max(0, c.currentHp - damage)
      customer.value = { ...c, currentHp: newHp }

      if (newHp <= 0) {
        // Award cash reward and spawn next customer
        gameStore.addCash(c.cashReward)
        spawnNext()
      }
    }

    showDamageNumber(damage, x, y)
  }

  return {
    customer,
    tier,
    tapCustomer,
    showDamageNumber,
  }
}
