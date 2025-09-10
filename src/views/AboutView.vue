<template>
  <div>
    <!-- Show if logged in -->
    <div v-if="isAuthenticated">
      <h1>About Our Library</h1>
      <p>
        Welcome to our digital library! We're dedicated to providing a vast collection of books and
        resources to our community.
      </p>
    </div>

    <!-- Show if NOT logged in -->
    <!-- <div v-else>
      <h2>About</h2>
      <p>This page is restricted to authenticated users.</p>
    </div> -->
  </div>
</template>

<script setup>
import { isAuthenticated } from '@/stores/auth'
</script>

<style></style>
