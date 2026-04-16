<template>
  <q-page class="flex flex-center column q-gutter-lg" style="background: linear-gradient(135deg, #0a1628 0%, #1a3a6b 100%); min-height: 100vh;">
    <div class="text-center">
      <div class="text-h2 text-white text-weight-bold">🏥 Nitra</div>
      <div class="text-h5 text-blue-3">Clinic Leverage Game</div>
      <div class="text-caption text-grey-5 q-mt-sm">掌握槓桿，擴張你的診所帝國</div>
    </div>

    <div class="column q-gutter-md" style="width: 280px;">
      <q-btn
        size="lg"
        color="blue-7"
        unelevated
        rounded
        label="🏥 我是主持人 (Host)"
        @click="router.push('/host')"
        class="full-width"
      />
      <q-btn
        size="lg"
        color="teal-7"
        unelevated
        rounded
        label="🎮 加入遊戲 (Join)"
        @click="router.push('/join')"
        class="full-width"
      />
    </div>

    <div class="text-center text-grey-6 text-caption q-mt-xl">
      <div>掃碼加入 · 5 分鐘結算總資產 · Powered by Nitra</div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
</script>
