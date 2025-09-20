<template>
  <h1>Create an Account</h1>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p>
  <button @click="register">Save to Firebase</button>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '@/firebase/init' // use named exports from your init.js

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')
const router = useRouter()

async function register() {
  errorMessage.value = ''
  loading.value = true
  try {
    // 1) create the account
    const cred = await createUserWithEmailAndPassword(auth, email.value, password.value)

    // 2) create the user profile/role doc
    await setDoc(doc(db, 'users', cred.user.uid), {
      email: cred.user.email,
      role: 'member',
      createdAt: serverTimestamp(),
    })
    console.log(`[register] created user ${cred.user.email} with role "member"`)
    // 3) go to login (make sure the route name/path matches exact casing)
    router.push('/FireLogin')
  } catch (e) {
    errorMessage.value = e?.message || 'Registration failed'
  } finally {
    loading.value = false
  }
}
</script>
