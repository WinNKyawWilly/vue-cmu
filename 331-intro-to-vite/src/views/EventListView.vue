<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import EventInfo from '@/components/EventInfo.vue';
import type { Event } from '@/types'
import { ref, onMounted } from 'vue'
import EventService from '@/services/EventService';

const events = ref<Event[]>()

onMounted(() => {
  EventService.getEvents().then((response) => {
    events.value = response.data
  })
})
</script>

<template>
  <div class="home">
    <h2>Events for Good</h2>
    <div v-for="event in events" :key="event.id">
      <EventCard :event="event" />
      <EventInfo :event="event" />
    </div>
    
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>