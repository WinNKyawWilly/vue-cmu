<script setup lang="ts">
import { toRefs, defineProps } from 'vue'
import type { Event } from '@/types'
import { useRouter } from 'vue-router'
import { useEditStore } from '@/stores/edit';

const props = defineProps<{
    event: Event
    id: string
}>()

const router = useRouter()
const store = useEditStore()

const edit = () => {
    store.updateMessage('The data has been updated')
    setTimeout(() => {
        store.resetMessage()
    }, 3000);
    router.push({ name: 'event-detail-view', params: { id: props.id } })
}
</script>

<template>
    <p>Edit Event Here</p>
    <button @click="edit">Edit</button>
</template>