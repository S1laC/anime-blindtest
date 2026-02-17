<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import axios from 'axios'
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
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header>

  <main>
    <TheWelcome />

    <div style="margin-top: 2rem; padding: 1rem; background: #f0f0f0; border-radius: 8px;">
      <h2>Backend Connection Test</h2>
      <button @click="fetchData" style="padding: 0.5rem 1rem; cursor: pointer;">
        Call Backend API
      </button>
      <p v-if="message" style="margin-top: 1rem;">
        <strong>Response:</strong> {{ message }}
      </p>
    </div>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
