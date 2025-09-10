import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated } from '@/stores/auth'

import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '@/views/LoginView.vue'
import AccessDenied from '@/views/AccessDenied.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    meta: { requiresAuth: true },
  },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/denied', name: 'denied', component: AccessDenied },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// navigation guard to check for authentication
router.beforeEach((to) => {
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    return { name: 'denied' }
    // { name: 'login', query: { redirect: to.fullPath } }
  }
})

export default router
