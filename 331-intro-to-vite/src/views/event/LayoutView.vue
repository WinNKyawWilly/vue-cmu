<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue'
import type { Event } from '@/types'
import EventService from '@/services/EventService'
import { useRouter } from 'vue-router'

import { useEventStore } from '@/stores/event'
import { storeToRefs } from 'pinia'

const store = useEventStore()
const { event } = storeToRefs(store)

</script>

<template>
    <div v-if="event">
        <h2>{{ event.title }}</h2>
        <nav>
            <RouterLink :to="{ name: 'event-detail-view' }">Details</RouterLink> |
            <RouterLink :to="{ name: 'event-register-view' }">Register</RouterLink> |
            <RouterLink :to="{ name: 'event-edit-view' }">Edit</RouterLink>
        </nav>
        <RouterView :event="event" />
    </div>
</template>

<style scoped>
nav a {
    font-weight: bold;
    color: #2c3e50;
}

nav a.router-link-exact-active {
    color: #42b983;
}
</style>