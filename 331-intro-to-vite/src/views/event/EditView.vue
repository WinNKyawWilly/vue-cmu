<script setup lang="ts">
import { toRefs, defineProps } from 'vue'
import type { Event } from '@/types'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'

const props = defineProps<{
    event: Event
    id: string
}>()
const { event } = toRefs(props)
const router = useRouter()

const store = useMessageStore()
const edit = () => {
    //If the edit API call successful
    //Push back to the event detail view
    store.updateEditedMessage('Event Edited for ' + event.value.title)
    setTimeout(() => {
        store.resetEditedMessage('')
    }, 3000);
    router.push({ name: 'event-detail-view', params: { id: props.id } })
}
</script>

<template>
    <p>Edit Event Here</p>
    <button @click="edit">Edit</button>
</template>