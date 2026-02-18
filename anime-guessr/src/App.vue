<script setup>
import axios from 'axios'
import testBackend from './components/testBackend.vue'
import { ref } from 'vue'

const message = ref('')

const fetchData = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/hello-world')
    message.value = response.data
    console.log('Backend response:', response.data)
  } catch (error) {
    console.error('Error calling backend:', error)
    message.value = 'Error: Could not reach backend'
  }
}
</script>


<template>
  <header class="barbie-navbar">
    <div class="header-content">
      <div class="left-section">
        <img src="./assets/logo.jpg" alt="Logo" class="mini-logo" />
        <button class="pink-icon-btn">📅</button>
      </div>
      <div class="right-section">
        <button class="pink-icon-btn">?</button>
        <button class="pink-icon-btn">...</button>
      </div>
    </div>
  </header>

  <main class="page-content">
    <testBackend />
  </main>


</template>
