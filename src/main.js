import './assets/main.css'
// import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'

// Firebase + store imports
import { auth, db } from '@/firebase/init.js'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { setSession, clearSession } from '@/stores/auth'

const app = createApp(App)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '', // disable dark mode auto
    },
  },
})
app.use(router)

// Keep session in sync with Firebase
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    console.log('[auth] signed out; currentUser =', auth.currentUser) // null
    clearSession()
    return
  }
  // Fetch role from Firestore
  const snap = await getDoc(doc(db, 'users', user.uid))
  const role = snap.exists() ? snap.data().role : 'member'
  if (!snap.exists()) {
    console.warn(`[auth] no user doc for ${user.uid}; defaulting role=member`)
  }
  setSession({ uid: user.uid, email: user.email, role })
  console.log(`[auth] signed in: ${user.email} (uid: ${user.uid}, role: ${role})`)
})

app.mount('#app')
