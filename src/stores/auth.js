// src/stores/auth.js
import { ref } from 'vue'

// one shared reactive source of truth (module singletons in ESM)
export const isAuthenticated = ref(false)

export function login() {
  isAuthenticated.value = true
}

export function logout() {
  isAuthenticated.value = false
}
