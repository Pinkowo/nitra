import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory

  return createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    history: createHistory(process.env.VUE_ROUTER_BASE),
    routes: [
      {
        path: '/',
        component: () => import('../layouts/MainLayout.vue'),
        children: [
          { path: '', component: () => import('../pages/LandingPage.vue') },
          { path: 'host', component: () => import('../pages/HostPage.vue') },
          { path: 'join', component: () => import('../pages/JoinPage.vue') },
          { path: 'game', component: () => import('../pages/GamePage.vue') },
          { path: 'leaderboard', component: () => import('../pages/LeaderboardPage.vue') },
        ],
      },
    ],
  })
})
