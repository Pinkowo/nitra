<template>
  <q-layout view="hHh lpR fFf">
    <!-- Game header: only shown on /game route -->
    <GameHeader v-if="showGameHeader" />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import GameHeader from '../components/GameHeader.vue'

const route = useRoute()
const showGameHeader = computed(() => route.path === '/game')
</script>
