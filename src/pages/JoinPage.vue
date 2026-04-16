<template>
  <q-page class="flex flex-center column q-pa-lg" style="background: #0a1628; min-height: 100vh;">
    <!-- Back button -->
    <div v-if="!joined" style="position: absolute; top: 16px; left: 16px;">
      <q-btn flat round icon="arrow_back" color="grey-4" @click="router.back()" />
    </div>

    <div class="text-center q-mb-xl">
      <div class="text-h4 text-white">🎮 加入遊戲</div>
    </div>

    <!-- Input form -->
    <div v-if="!joined" style="width: 300px;" class="column q-gutter-md">
      <q-input
        v-model="playerName"
        label="你的名字"
        dark
        outlined
        color="blue-4"
        label-color="grey-4"
        input-class="text-white"
      />
      <q-input
        v-model="inputRoomId"
        label="Room ID (4 位數)"
        dark
        outlined
        color="blue-4"
        label-color="grey-4"
        input-class="text-white text-h5"
        maxlength="4"
        mask="####"
      />

      <!-- Error message -->
      <div v-if="joinError" class="column q-gutter-sm">
        <div class="text-negative text-center text-body2">{{ joinError }}</div>
        <q-btn flat color="grey-4" label="← 返回" @click="joinError = ''" />
      </div>

      <q-btn
        v-else
        size="lg"
        color="teal-7"
        unelevated
        rounded
        label="加入！"
        :disable="!canJoin || joining"
        :loading="joining"
        @click="handleJoin"
      />
    </div>

    <!-- Waiting state -->
    <div v-else class="text-center column q-gutter-md">
      <q-spinner-dots color="blue-4" size="3em" />
      <div class="text-white text-h6">已加入房間 {{ inputRoomId }}</div>
      <div class="text-grey-4">等待主持人開始遊戲...</div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useGameStore } from '../stores/useGameStore'
import { useRoomStore } from '../stores/useRoomStore'
import { joinRoom, subscribeRoom } from '../services/roomService'
import { subscribePlayer } from '../services/playerService'
import { db } from '../services/firebase'
import { ref as dbRef, get } from 'firebase/database'
import { GameStatus } from '../types'

const router = useRouter()
const route  = useRoute()
const gameStore = useGameStore()
const roomStore = useRoomStore()

const playerName = ref('')
const inputRoomId = ref('')

onMounted(() => {
  const r = route.query.room
  if (r && typeof r === 'string') inputRoomId.value = r
})
const joining = ref(false)
const joined = ref(false)
const joinError = ref('')
let unsubscribe: (() => void) | null = null
let unsubPlayer: (() => void) | null = null

const canJoin = computed(() => playerName.value.trim().length > 0 && inputRoomId.value.length === 4)

onUnmounted(() => {
  unsubscribe?.()
  unsubPlayer?.()
})

async function handleJoin() {
  if (!canJoin.value || joining.value) return
  joining.value = true
  joinError.value = ''

  try {
    const snapshot = await get(dbRef(db, `rooms/${inputRoomId.value}`))
    if (!snapshot.exists()) {
      joinError.value = '❌ 房間不存在，請確認 Room ID'
      joining.value = false
      return
    }

    const room = snapshot.val()
    if (room.status === 'ended') {
      joinError.value = '❌ 此房間已結束遊戲'
      joining.value = false
      return
    }

    const uid = crypto.randomUUID()

    await joinRoom(inputRoomId.value, {
      uid,
      name: playerName.value.trim(),
      cashBalance: 0,
      assetsValue: 0,
      creditUsed: 0,
      creditLimit: 10000,
      ownedEquipment: [],
      customersRecruited: 0,
      joinedAt: Date.now(),
      isHost: false,
    })

    gameStore.init(uid, inputRoomId.value, playerName.value.trim())

    unsubPlayer = subscribePlayer(inputRoomId.value, uid, (player) => {
      if (player) gameStore.syncFromFirebase(player)
    })

    unsubscribe = subscribeRoom(inputRoomId.value, (room) => {
      if (room) {
        roomStore.setRoom(room)
        if (room.status === GameStatus.Playing) {
          void router.push('/game')
        }
      }
    })

    joining.value = false
    joined.value = true
  } catch (err) {
    console.error('[JoinPage] handleJoin failed:', err)
    joinError.value = '❌ 連線失敗，請稍後再試'
    joining.value = false
  }
}
</script>
