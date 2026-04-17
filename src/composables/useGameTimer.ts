import { computed, ref } from 'vue'
import { useRoomStore } from '../stores/useRoomStore'
import { GameStatus } from '../types'
import { endGame } from '../services/roomService'

// ─── Module-level singletons (shared across all useGameTimer() calls) ─────────
// Without this, GamePage.vue and GameHeader.vue each get their own _tick,
// so only GamePage's interval would increment its own _tick — GameHeader
// never sees the update and the display freezes.
const _tick = ref(0)
const _intervalId = ref<ReturnType<typeof setInterval> | null>(null)

// ─── Composable ───────────────────────────────────────────────────────────────

export function useGameTimer() {
  const roomStore = useRoomStore()

  // timeRemaining reads _tick so it re-evaluates every second when tick increments
  const timeRemaining = computed(() => {
    _tick.value // reactive dependency — forces re-evaluation on each tick
    if (!roomStore.startedAt || roomStore.status !== GameStatus.Playing) return 90
    const elapsed = (Date.now() - roomStore.startedAt) / 1000
    return Math.max(0, 90 - elapsed)
  })

  const formattedTime = computed(() => {
    const t = Math.ceil(timeRemaining.value)
    const m = Math.floor(t / 60)
    const s = t % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  })

  function start() {
    if (_intervalId.value) return
    _intervalId.value = setInterval(() => {
      _tick.value++ // triggers reactive updates in all components using timeRemaining
      if (roomStore.status !== GameStatus.Playing) return
      if (timeRemaining.value <= 0) {
        stop()
        endGame(roomStore.roomId).catch((err) => {
          console.error('[useGameTimer] endGame failed:', err)
        })
      }
    }, 1000)
  }

  function stop() {
    if (_intervalId.value) {
      clearInterval(_intervalId.value)
      _intervalId.value = null
    }
  }

  return { timeRemaining, formattedTime, start, stop }
}
