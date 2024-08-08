<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue'
import type { Event } from '@/types'
import EventService from '@/services/EventService'
import { useRouter } from 'vue-router'

const event = ref<Event | null>(null)
const router = useRouter()
const props = defineProps({
    id: {
        type: String,
        required: true
    }
})

onMounted(() => {
    EventService.getEvent(parseInt(props.id))
        .then((response) => {
            event.value = response.data
        })
        .catch((error) => {
            if (error.response && error.response.status === 404) {
                router.push({
                    name: '404-resource-view',
                    params: { resource: 'event' }
                })
            } else {
                router.push({ name: 'network-error' })
            }
        })
})
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