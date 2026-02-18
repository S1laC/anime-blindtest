<script setup>
import axios from 'axios'
import { ref } from 'vue'

const message = ref('')

const fetchData = async () => {
  try {
    // Note: localhost:8080 est ton adresse Tomcat trouvée tout à l'heure
    const response = await axios.get('http://localhost:8080/api/hello-world')
    message.value = response.data
  } catch (error) {
    console.error('Error:', error)
    message.value = 'Error: Could not reach backend'
  }
}
</script>

<template>
  <div class="barbie-card">
    <h2>Backend Connection Test</h2>
    <button @click="fetchData" class="btn-barbie">
      💖 CALL BACKEND API 💖
    </button>

    <div v-if="message" class="response-box">
      <strong>Response:</strong> {{ message }}
    </div>
  </div>
</template>