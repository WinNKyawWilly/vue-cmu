<script setup lang="ts">
import { toRefs, defineProps } from 'vue'
import type { Event } from '@/types'
import { storeToRefs } from 'pinia'
import { useMessageStore } from '@/stores/message'

const store = useMessageStore()
const { message } = storeToRefs(store)

const props = defineProps<{
    event: Event
    id: string
}>()
const { event } = toRefs(props)
</script>

<template>
    <div id="flashMessage" v-if="message">
        <p>{{ message }}</p>
    </div>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
</template>

<style>
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