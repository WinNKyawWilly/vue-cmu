<script setup lang="ts">
import { ref } from 'vue'

const event = ref({
  id: 5928101,
  category: 'Animal Welfare',
  title: 'Cat Adoption Day',
  description: 'Find your new feline friend at this event',
  location: '123 Main St, Springfield, IL',
  date: 'January,28, 2022',
  time: '12:00',
  petsAllowed: true,
  organizer: 'Kat Laydee'
})
</script>

<template>
  <div class="event-class">
    <div class="event-class">
      <h2> {{ event.title }}</h2>
      <span>@{{ event.time }} on {{ event.date }}</span>
    </div>
  </div>
</template>

<style scoped>
.event-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 10px;
}

.event-card:hover {
  transform: scale(1.05);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}
</style>