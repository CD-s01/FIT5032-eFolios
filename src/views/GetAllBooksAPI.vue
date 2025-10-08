<template>
  <pre>{{ jsondata }}</pre>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      jsondata: null,
      error: null,
    }
  },
  methods: {
    async getAllBooksAPI() {
      try {
        const response = await axios.get('https://getallbooks-zg6jlarueq-uc.a.run.app')
        this.jsondata = response.data
        this.error = null
      } catch (error) {
        console.error('Error fetching all books:', error)
        this.error = error
        this.jsondata = null
      }
    },
  },
  mounted() {
    this.getAllBooksAPI()
  },
}
</script>
