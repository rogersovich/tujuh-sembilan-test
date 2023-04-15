import { createRouter, createWebHistory } from 'vue-router'
// const HomeView = () => import('@/views/HomeView.vue')
import HomeView from '@/views/HomeView.vue'
import HomeLayout from '@/layouts/HomeLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/users'
    },
    {
      path: '/users',
      name: 'users',
      component: HomeView,
      meta: {
        layout: HomeLayout
      }
    },
  ]
})

export default router
