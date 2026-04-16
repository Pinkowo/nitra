<template>
  <q-page class="flex flex-center column q-pa-lg" style="background: #0a1628; min-height: 100vh;">
    <!-- Back / cancel button -->
    <div style="position: absolute; top: 16px; left: 16px;">
      <q-btn
        flat round icon="arrow_back" color="grey-4"
        @click="roomId ? handleCancel() : router.back()"
      />
    </div>

    <div class="text-center q-mb-lg">
      <div class="text-h4 text-white">🏥 主持人房間</div>
    </div>

    <!-- Name input (before room is created) -->
    <div v-if="!roomId" style="width: 300px;" class="column q-gutter-md">
      <q-input
        v-model="hostName"
        label="你的名字"
        dark
        outlined
        color="yellow-7"
        label-color="grey-4"
        input-class="text-white"
      />
      <q-btn
        size="lg"
        color="yellow-8"
        text-color="black"
        unelevated
        rounded
        label="建立房間"
        :disable="!hostName.trim() || creating"
        :loading="creating"
        @click="handleCreate"
      />
    </div>

    <!-- Lobby (after room is created) -->
    <template v-else>
      <!-- Room ID + controls -->
      <div class="text-center q-mb-lg">
        <div class="text-caption text-grey-4">Room ID</div>
        <div class="text-h1 text-weight-bold text-yellow" style="letter-spacing: 8px;">
          {{ roomId }}
        </div>
        <div class="text-caption text-grey-5 q-mt-xs">掃 QR Code 或輸入 ID 加入</div>
        <div class="row justify-center q-mt-md">
          <q-btn
            flat
            dense
            color="blue-3"
            icon="refresh"
            label="換號"
            :loading="rerolling"
            @click="handleReroll"
          />
        </div>
      </div>

      <!-- QR Code -->
      <q-card flat class="q-mb-lg" style="background: #fff; border-radius: 16px; padding: 12px;">
        <canvas ref="qrCanvas" style="display: block;" />
      </q-card>

      <!-- Players joined -->
      <q-card flat class="q-mb-lg" style="background: #1a3a6b; min-width: 280px;">
        <q-card-section>
          <div class="text-subtitle2 text-grey-4 q-mb-sm">已加入玩家 ({{ playerList.length }})</div>
          <div v-if="playerList.length === 0" class="text-grey-6 text-caption">等待玩家加入...</div>
          <q-item v-for="p in playerList" :key="p.uid" dense>
            <q-item-section>
              <q-item-label class="text-white">👤 {{ p.name }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-card-section>
      </q-card>

      <!-- Start Game -->
      <q-btn
        size="lg"
        color="green-7"
        unelevated
        rounded
        :disable="playerList.length < 1 || started"
        :label="started ? '遊戲進行中...' : '🚀 開始遊戲'"
        class="full-width"
        style="max-width: 280px;"
        @click="handleStart"
      />
    </template>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, watch, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '../stores/useGameStore'
import { useRoomStore } from '../stores/useRoomStore'
import { createRoom, startGame, deleteRoom, subscribeRoom } from '../services/roomService'
import { GameStatus } from '../types'
import QRCode from 'qrcode'

const router = useRouter()
const gameStore = useGameStore()
const roomStore = useRoomStore()

const hostName = ref('')
const roomId = ref('')
const hostUid = ref('')
const started = ref(false)
const creating = ref(false)
const rerolling = ref(false)
const qrCanvas = ref<HTMLCanvasElement | null>(null)
let unsubscribe: (() => void) | null = null

function joinUrl(id: string): string {
  const base = window.location.href.split('#')[0]
  return `${base}#/join?room=${id}`
}

watch(roomId, async (id) => {
  if (!id) return
  await nextTick()
  if (qrCanvas.value) {
    await QRCode.toCanvas(qrCanvas.value, joinUrl(id), { width: 200, margin: 1 })
  }
})

const playerList = computed(() => Object.values(roomStore.players).filter((p) => !p.isHost))

onUnmounted(() => {
  unsubscribe?.()
})

function subscribeToRoom(id: string) {
  unsubscribe?.()
  unsubscribe = subscribeRoom(id, (room) => {
    if (room) {
      roomStore.setRoom(room)
      if (room.status === GameStatus.Playing && !started.value) {
        started.value = true
        void router.push('/game')
      }
    }
  })
}

async function handleCreate() {
  if (!hostName.value.trim()) return
  creating.value = true

  hostUid.value = crypto.randomUUID()
  const id = await createRoom(hostUid.value, hostName.value.trim())
  roomId.value = id
  gameStore.init(hostUid.value, id, hostName.value.trim(), true)
  subscribeToRoom(id)

  creating.value = false
}

async function handleReroll() {
  rerolling.value = true

  // Delete old room, create new one with same host
  const oldId = roomId.value
  const newId = await createRoom(hostUid.value, hostName.value.trim())

  roomId.value = newId
  gameStore.init(hostUid.value, newId, hostName.value.trim(), true)
  subscribeToRoom(newId)

  // Clean up old room after switching subscription
  await deleteRoom(oldId)

  rerolling.value = false
}

async function handleCancel() {
  const idToDelete = roomId.value
  unsubscribe?.()
  unsubscribe = null
  roomId.value = ''
  await deleteRoom(idToDelete)
  router.back()
}

async function handleStart() {
  if (playerList.value.length < 1) return
  await startGame(roomId.value)
}
</script>
