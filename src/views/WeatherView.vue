<template>
  <div class="container">
    <div class="header">
      <h1>WEATHER APP</h1>
      <div class="search-bar">
        <input type="text" v-model="city" placeholder="Enter city name" class="search-input" />
        <button @click="searchByCity" class="search-button">Search</button>
      </div>
    </div>
  </div>

  <!--The <main> tag in HTML is used to specify the main content of a document 
      More info about main, check https://www.w3schools.com/tags/tag_main.asp-->
  <main>
    <!--If there are no data returned, then skip rendering the information-->
    <div v-if="weatherData">
      <!--Display the weather data attribute returned from API
          Example of API data: https://openweathermap.org/current-->
      <h2>{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
      <div>
        <!--The image source of of the weather icon will be coming from a function called iconUrl
                which will be shared in script later-->
        <img :src="iconUrl" alt="Weather Icon" />
        <p>{{ temperature }} °C</p>
      </div>
      <!-- weather[0] means the current weather, the way we need to obtain data depends on how
          the API JSON data looks-->
      <span>{{ weatherData.weather[0].description }}</span>
    </div>
  </main>
</template>

<script>
import axios from 'axios'

const API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY

export default {
  name: 'App',
  data() {
    return {
      city: '',
      weatherData: null,
      hourlyForecast: [],
      dailyForecast: [],
      loading: false,
      errorMsg: '',
    }
  },

  computed: {
    // Convert Kelvin → Celsius using precise offset; round to whole °C
    temperature() {
      return this.weatherData ? Math.round(this.weatherData.main.temp - 273.15) : null
    },
    // OpenWeather icon
    iconUrl() {
      return this.weatherData
        ? `https://openweathermap.org/img/wn/${this.weatherData.weather[0].icon}@2x.png`
        : null
    },
  },

  mounted() {
    this.fetchCurrentLocationWeather()
  },

  methods: {
    async fetchCurrentLocationWeather() {
      if (!('geolocation' in navigator)) return
      navigator.geolocation.getCurrentPosition(
        async ({ coords: { latitude, longitude } }) => {
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
          await this.fetchWeatherData(url)
        },
        (err) => {
          // Optional: surface a friendly message if location fails
          console.warn('Geolocation error:', err?.message || err)
        },
      )
    },

    // Called by your <button @click="searchByCity">
    async searchByCity() {
      if (!this.city) return
      // Using 'q' and HTTPS; you could add '&units=metric' to get °C from API
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        this.city,
      )}&appid=${API_KEY}`
      await this.fetchWeatherData(url)
    },

    async fetchWeatherData(url) {
      try {
        this.loading = true
        this.errorMsg = ''
        const { data } = await axios.get(url)
        this.weatherData = data
      } catch (error) {
        console.error('Error fetching weather data:', error)
        this.errorMsg = 'Unable to fetch weather data. Please try again.'
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
