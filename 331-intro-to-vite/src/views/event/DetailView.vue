<script setup lang="ts">
import { toRefs, defineProps } from 'vue'
import type { Event } from '@/types'
import { storeToRefs } from 'pinia'
import { useEditStore } from '@/stores/edit';

const store = useEditStore()
const { message } = storeToRefs(store)

const props = defineProps<{
    event: Event
    id: string
}>()
const { event } = toRefs(props)
</script>

<template>

    <div v-if="message">
        <div id="flashEdit">
            <h4>{{ message }}</h4>
        </div>
    </div>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
</template>

<style>
#flashEdit {
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