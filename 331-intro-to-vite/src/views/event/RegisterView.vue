<script setup lang="ts">
import { toRefs, defineProps } from 'vue'
import type { Event } from '@/types'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'

const props = defineProps<{
    event: Event
    id: string
}>()

//eslint-disable-next-line @typescript-eslint/no-unused-vars
const { event } = toRefs(props)
const router = useRouter()
const store = useMessageStore()
const register = () => {
    //If the registeration API call successful
    //Push back to the event detail view
    store.updateMessage('Event Registered for ' + event.value.title)
    setTimeout(() => {
        store.resetMessage()
    }, 3000);
    router.push({ name: 'event-detail-view', params: { id: props.id } })
}
</script>

<template>
    <p>Register Event Here</p>
    <button @click="register">Register</button>
</template>