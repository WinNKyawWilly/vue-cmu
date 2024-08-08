<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import { storeToRefs } from 'pinia'

const store = useMessageStore()
const { message } = storeToRefs(store)
</script>

<template>
  <div id="layout">
    <header>
      <div id="flashMessage" v-if="message">
        <h4>{{ message }}</h4>
      </div>
      <div class="wrapper">
        <nav>
          <RouterLink :to="{ name: 'event-list-view' }" exact>Event</RouterLink> |
          <RouterLink :to="{ name: 'about' }">About</RouterLink> |
          <RouterLink :to="{ name: 'student' }">Student</RouterLink>
        </nav>
      </div>
    </header>
    <RouterView />
  </div>
</template>

<style>
#layout {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

h2 {
  font-size: 20px;
}

@keyframes yellowfade {
  from {
    background-color: yellow;
  }

  to {
    background-color: transparent;
  }
}

#flashMessage {
  position: fixed;
  top: 0;
  right: 0;
  font-size: medium;
  color: black;
  width: fit-content;
  padding: 20px 10px;
  margin: 2rem;
  border-radius: 20px;
  animation: yellowfade 3s ease-in-out;
}
</style>
