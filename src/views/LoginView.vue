<template>
  <div class="login-view">
    <h1>Login</h1>

    <form @submit.prevent="handleLogin">
      <div>
        <label for="email">Email:</label>
        <input id="email" type="email" v-model="email" required />
      </div>

      <div>
        <label for="password">Password:</label>
        <input id="password" type="password" v-model="password" required />
      </div>

      <button type="submit" :disabled="loading">{{ loading ? 'Signing in…' : 'Login' }}</button>
      <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>
    </form>
  </div>
  <!-- <div class="login-view">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required />
      </div>

      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>

      <button type="submit">Login</button>
   </form>
  </div> -->
  <!-- </div>
    </div>  
              <div v-if="errors.confirmPassword" class="text-danger">{{ errors.confirmPassword }}</div>
            </div>
          </div>

          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
  </div> -->
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase/init'

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const loading = ref(false)

const router = useRouter()
const route = useRoute()

async function handleLogin() {
  errorMessage.value = ''
  loading.value = true
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value)
    // onAuthStateChanged in main.js will populate session with role
    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/about'
    router.push(redirect)
  } catch (e) {
    errorMessage.value = e?.message ?? 'Login failed'
  } finally {
    loading.value = false
  }
}

// import { ref } from 'vue'
// import { useRouter, useRoute } from 'vue-router'
// import { login } from '@/stores/auth'

// const username = ref('')
// const password = ref('')

// const errorMessage = ref('')

// router instance
// const router = useRouter()

// const route = useRoute()

// hardcoded credentials (for now)
// const validUser = {
//   username: 'admin',
//   password: '1234',
// }

// formValues = {
//   username: '',
//   password: ''
// }

// handle login
// function handleLogin() {
//   if (username.value === validUser.username && password.value === validUser.password) {
//     login()
//     const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/about'
//     router.push(redirect)
//   } else {
//     errorMessage.value = 'Invalid username or password.'
//   }
// }
</script>
