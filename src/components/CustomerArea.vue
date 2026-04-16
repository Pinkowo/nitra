<template>
  <div class="customer-wrap">

    <!-- Customer A: female doctor, walks right -->
    <div
      class="customer"
      :class="{ dying: c0.dying }"
      style="top: 44%; animation: walk-right 6s linear infinite; animation-fill-mode: backwards;"
      @click="hit(0, $event)"
      @touchstart.prevent="hit(0, $event)"
    >
      <div class="hp-bar">
        <div class="hp-fill" :class="hpClass(c0)" :style="{ width: hpPct(c0) + '%' }"></div>
      </div>
      <svg class="char-svg" viewBox="0 0 16 24" width="40" height="60">
        <rect x="4" y="0" width="8" height="3" fill="#3C2415"/>
        <rect x="4" y="2" width="8" height="7" rx="1" fill="#F5C08A"/>
        <rect x="6" y="5" width="1" height="2" fill="#2C1A08"/>
        <rect x="9" y="5" width="1" height="2" fill="#2C1A08"/>
        <rect x="3" y="9" width="10" height="8" fill="#6AAABB"/>
        <rect x="1" y="10" width="3" height="5" rx="1" fill="#6AAABB"/>
        <rect x="12" y="10" width="3" height="5" rx="1" fill="#6AAABB"/>
        <rect x="0" y="14" width="3" height="2" rx="1" fill="#F5C08A"/>
        <rect x="13" y="14" width="3" height="2" rx="1" fill="#F5C08A"/>
        <rect x="4" y="17" width="3" height="5" fill="#4A88A8"/>
        <rect x="9" y="17" width="3" height="5" fill="#4A88A8"/>
        <rect x="3" y="21" width="5" height="3" rx="1" fill="#1A1A28"/>
        <rect x="8" y="21" width="5" height="3" rx="1" fill="#1A1A28"/>
      </svg>
    </div>

    <!-- Customer B: business suit, walks left (mirrored) -->
    <div
      class="customer"
      :class="{ dying: c1.dying }"
      style="top: 38%; animation: walk-left 5s linear 1.8s infinite; animation-fill-mode: backwards;"
      @click="hit(1, $event)"
      @touchstart.prevent="hit(1, $event)"
    >
      <div class="hp-bar">
        <div class="hp-fill" :class="hpClass(c1)" :style="{ width: hpPct(c1) + '%' }"></div>
      </div>
      <svg class="char-svg" viewBox="0 0 16 24" width="40" height="60" style="transform: scaleX(-1);">
        <rect x="4" y="0" width="8" height="3" fill="#2C1C10"/>
        <rect x="4" y="2" width="8" height="7" rx="1" fill="#E8B080"/>
        <rect x="6" y="5" width="1" height="2" fill="#2C1A08"/>
        <rect x="9" y="5" width="1" height="2" fill="#2C1A08"/>
        <rect x="3" y="9" width="10" height="8" fill="#5C6070"/>
        <rect x="7" y="9" width="2" height="5" fill="#FFFDF5"/>
        <rect x="7.5" y="10" width="1" height="4" fill="#B82828"/>
        <rect x="1" y="10" width="3" height="5" rx="1" fill="#5C6070"/>
        <rect x="12" y="10" width="3" height="5" rx="1" fill="#5C6070"/>
        <rect x="0" y="14" width="3" height="2" rx="1" fill="#E8B080"/>
        <rect x="12" y="13" width="4" height="4" rx="1" fill="#8A6840"/>
        <rect x="4" y="17" width="3" height="5" fill="#383840"/>
        <rect x="9" y="17" width="3" height="5" fill="#383840"/>
        <rect x="3" y="21" width="5" height="3" rx="1" fill="#18181E"/>
        <rect x="8" y="21" width="5" height="3" rx="1" fill="#18181E"/>
      </svg>
    </div>

    <!-- Customer C: elder, walks right -->
    <div
      class="customer"
      :class="{ dying: c2.dying }"
      style="top: 54%; animation: walk-right 8s linear 3.5s infinite; animation-fill-mode: backwards;"
      @click="hit(2, $event)"
      @touchstart.prevent="hit(2, $event)"
    >
      <div class="hp-bar">
        <div class="hp-fill" :class="hpClass(c2)" :style="{ width: hpPct(c2) + '%' }"></div>
      </div>
      <svg class="char-svg" viewBox="0 0 16 24" width="40" height="60">
        <rect x="3" y="0" width="10" height="3" fill="#9A9A9A"/>
        <rect x="4" y="2" width="8" height="7" rx="1" fill="#F0B878"/>
        <rect x="6" y="5" width="1" height="2" fill="#2C1A08"/>
        <rect x="9" y="5" width="1" height="2" fill="#2C1A08"/>
        <rect x="3" y="9" width="10" height="8" fill="#D07A40"/>
        <rect x="1" y="10" width="3" height="5" rx="1" fill="#D07A40"/>
        <rect x="12" y="10" width="3" height="5" rx="1" fill="#D07A40"/>
        <rect x="13" y="12" width="1.5" height="11" rx=".75" fill="#8A6030"/>
        <rect x="12.5" y="11" width="3" height="1.5" rx=".75" fill="#8A6030"/>
        <rect x="0" y="14" width="3" height="2" rx="1" fill="#F0B878"/>
        <rect x="4" y="17" width="3" height="5" fill="#6878A0"/>
        <rect x="9" y="17" width="3" height="5" fill="#6878A0"/>
        <rect x="3" y="21" width="5" height="3" rx="1" fill="#1A1A28"/>
        <rect x="8" y="21" width="5" height="3" rx="1" fill="#1A1A28"/>
      </svg>
    </div>

  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import { useGameStore } from '../stores/useGameStore'
import { useEventStore } from '../stores/useEventStore'
import { useRoomStore } from '../stores/useRoomStore'

const gameStore = useGameStore()
const eventStore = useEventStore()
const roomStore = useRoomStore()

// Current tier drives maxHp (HP grows 50% every 30s)
const tier = computed(() => {
  if (!roomStore.startedAt) return 0
  return Math.floor((Date.now() - roomStore.startedAt) / 30000)
})
const tierHp = computed(() => Math.round(100 * Math.pow(1.5, tier.value)))

// Three independent customer states
const c0 = reactive({ hp: 100, maxHp: 100, dying: false })
const c1 = reactive({ hp: 100, maxHp: 100, dying: false })
const c2 = reactive({ hp: 100, maxHp: 100, dying: false })
const customers = [c0, c1, c2]

function hpPct(c: typeof c0) {
  return Math.max(0, (c.hp / c.maxHp) * 100)
}
function hpClass(c: typeof c0) {
  const pct = hpPct(c)
  if (pct < 30) return 'low'
  if (pct < 60) return 'mid'
  return ''
}

function hit(idx: number, event: MouseEvent | TouchEvent) {
  if (eventStore.isRepaymentLocked) return
  const c = customers[idx]
  if (c.dying) return

  const dmg = gameStore.attackPower
  c.hp = Math.max(0, c.hp - dmg)
  navigator.vibrate?.(30)
  spawnFloat(`-${dmg}`, 'dmg', event)

  if (c.hp <= 0) {
    const reward = dmg * 12
    c.dying = true
    gameStore.addCash(reward)
    spawnFloat(`+${reward}`, 'cash-pop', event)
    setTimeout(() => {
      c.maxHp = tierHp.value
      c.hp = c.maxHp
      c.dying = false
    }, 800)
  }
}

function spawnFloat(text: string, cls: string, event: MouseEvent | TouchEvent) {
  const x = 'touches' in event
    ? (event.changedTouches[0]?.clientX ?? 100)
    : (event as MouseEvent).clientX
  const y = 'touches' in event
    ? (event.changedTouches[0]?.clientY ?? 200)
    : (event as MouseEvent).clientY
  const el = document.createElement('div')
  el.className = `float-num ${cls}`
  el.textContent = text
  el.style.left = `${x + Math.round((Math.random() - 0.5) * 60)}px`
  el.style.top  = `${y}px`
  document.body.appendChild(el)
  setTimeout(() => el.remove(), 800)
}
</script>

<style scoped>
.customer-wrap {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: visible;
}

.customer {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  user-select: none;
  pointer-events: auto;
  transition: opacity 0.15s ease;
}

/* Death flash */
.customer.dying {
  opacity: 0.25;
}

.hp-bar {
  width: 46px;
  height: 6px;
  border-radius: 3px;
  background: rgba(0,0,0,.22);
  margin-bottom: 4px;
  overflow: hidden;
}
.hp-fill {
  height: 100%;
  border-radius: 3px;
  background: var(--hp-hi);
  transition: width 130ms ease, background 200ms ease;
}
.hp-fill.mid { background: var(--hp-md); }
.hp-fill.low { background: var(--hp-lo); }

.char-svg {
  display: block;
  animation: char-bob .42s ease-in-out infinite alternate;
  image-rendering: pixelated;
}
@keyframes char-bob {
  from { transform: translateY(0); }
  to   { transform: translateY(-4px); }
}

/* Walk animations — fill-mode: backwards keeps customer at "from" position during delay */
@keyframes walk-right {
  from { left: -100px; }
  to   { left: calc(100% + 100px); }
}
@keyframes walk-left {
  from { right: -100px; left: auto; }
  to   { right: calc(100% + 100px); left: auto; }
}
</style>
