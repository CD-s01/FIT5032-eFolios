<template>
  <h1>Create an Account</h1>
  <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
  <p v-if="loading" style="color: blue;">Creating account...</p>
  <p><input type="email" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Password (min 6 characters)" v-model="password" /></p>
  <button @click="register" :disabled="loading">Save to Firebase</button>
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

  // Validation before attempting registration
  if (!email.value || !email.value.includes('@')) {
    errorMessage.value = 'Please enter a valid email address'
    return
  }

  if (!password.value || password.value.length < 6) {
    errorMessage.value = 'Password must be at least 6 characters long'
    return
  }

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
    console.error('Registration error:', e)
    // Provide user-friendly error messages
    if (e.code === 'auth/email-already-in-use') {
      errorMessage.value = 'This email is already registered. Please sign in instead.'
    } else if (e.code === 'auth/invalid-email') {
      errorMessage.value = 'Invalid email address format'
    } else if (e.code === 'auth/weak-password') {
      errorMessage.value = 'Password is too weak. Please use at least 6 characters.'
    } else {
      errorMessage.value = e?.message || 'Registration failed. Please try again.'
    }
  } finally {
    loading.value = false
  }
}
</script>
