// import { ref } from 'vue'
import { reactive, computed } from 'vue'

// one shared reactive source of truth (module singletons in ESM)
// export const isAuthenticated = ref(false)

// export function login() {
//   isAuthenticated.value = true
// }

// export function logout() {
//   isAuthenticated.value = false
// }

export const session = reactive({
  isAuthenticated: false,
  uid: null,
  email: null,
  role: null,
})

export const isAuthenticated = computed(() => !!session.uid)

export function setSession({ uid, email, role }) {
  session.isAuthenticated = true
  session.uid = uid
  session.email = email ?? null
  session.role = role ?? 'member'
}

export function clearSession() {
  session.isAuthenticated = false
  session.uid = null
  session.email = null
  session.role = null
}
