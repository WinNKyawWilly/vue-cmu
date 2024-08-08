<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import EventInfo from '@/components/EventInfo.vue';
import type { Event } from '@/types'
import { ref, watchEffect, computed, onMounted } from 'vue'
import EventService from '@/services/EventService';
import nProgress from 'nprogress'
import { useRouter } from 'vue-router'

const events = ref<Event[] | null>(null)
const totalEvents = ref(0)
const router = useRouter()
const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / props.pageSize)
  return page.value < totalPages
})
const props = defineProps({
  page: {
    type: Number,
    required: true,
  },
  pageSize: {
    type: Number,
    required: true,
  }
})

const page = computed(() => props.page)
const pageSize = computed(() => props.pageSize)

onMounted(() => {
  watchEffect(() => {
    EventService.getEvents(pageSize.value, page.value)
      .then((response) => {
        events.value = response.data
        totalEvents.value = response.headers['x-total-count']
      })
      .catch(() => {
        router.push({ name: 'network-error' })
      })
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

    <div class="pagination">
      <RouterLink :to="{ name: 'event-list-view', query: { page: (page - 1), pageSize: props.pageSize } }" rel="prev"
        v-if="page != 1">
        &#60; Prev
        Page
      </RouterLink>
      <RouterLink :to="{ name: 'event-list-view', query: { page: (page + 1), pageSize: props.pageSize } }" rel="next"
        v-if="hasNextPage">Next Page
        &#62;
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pagination {
  display: flex;
  width: 200px;
  margin: 20px auto;
}

.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>