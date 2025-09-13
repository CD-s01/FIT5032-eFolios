import './assets/main.css'
// import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'

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
