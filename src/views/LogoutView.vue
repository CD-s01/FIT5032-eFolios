<template>
  <section style="padding: 1rem">
    <h1>Signing you out…</h1>
    <p v-if="done">You are signed out.</p>
    <button v-if="!done" @click="doLogout">Sign out now</button>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { signOut } from 'firebase/auth'
import { auth } from '@/firebase/init'

const done = ref(false)
const router = useRouter()

async function doLogout() {
  console.log('[logout] before signOut currentUser =', auth.currentUser?.email ?? null)
  await signOut(auth)
  console.log('[logout] after signOut currentUser =', auth.currentUser) // should be null
  done.value = true
  // redirect wherever you prefer:
  router.replace('/FireLogin')
}

// auto-run when page loads
onMounted(() => {
  void doLogout()
})
</script>
