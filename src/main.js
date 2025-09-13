import './assets/main.css'
// import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'

import { initializeApp } from 'firebase/app'

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

app.mount('#app')

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBQY1pu2nwSS-ct6sgJtjD6ncj-AYvwY34',
  authDomain: 'week7-9dd44.firebaseapp.com',
  projectId: 'week7-9dd44',
  storageBucket: 'week7-9dd44.firebasestorage.app',
  messagingSenderId: '708437994512',
  appId: '1:708437994512:web:e16f027c577ee001a5ae95',
}

// Initialize Firebase
initializeApp(firebaseConfig)
