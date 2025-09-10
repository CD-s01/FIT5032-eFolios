<template>
  <!-- Using Bootstrap's Header template (starter code) -->
  <!-- https://getbootstrap.com/docs/5.0/examples/headers/ -->
  <div class="container">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active" aria-current="page"
            >Home</router-link
          >
        </li>
        <li class="nav-item">
          <router-link v-if="isAuthenticated" to="/about" class="nav-link" active-class="active"
            >About</router-link
          >
        </li>
        <li class="nav-item">
          <!-- <button v-if="isAuthenticated" @click="doLogout">Logout</button> -->
          <a v-if="isAuthenticated" href="#" class="nav-link" @click.prevent="doLogout">Logout</a>
          <router-link v-else to="/login" class="nav-link" active-class="active">Login</router-link>
        </li>
      </ul>
    </header>
  </div>
</template>

<script setup>
import { isAuthenticated, logout } from '@/stores/auth'
import { useRouter } from 'vue-router'
const router = useRouter()

function doLogout() {
  logout()
  router.push('/login')
}
</script>
