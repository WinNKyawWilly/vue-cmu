<script setup lang="ts">
import { ref } from 'vue'
import type { Event } from '@/types'

defineProps<{
    event: Event
}>();

</script>
<template>
    <div class="wrapper">
        <div class="event-info">
            <span> {{ event.organizer }}</span>
            <br/>
            <span>category - {{ event.category }}</span>
        </div>
    </div>
</template>

<style scoped>

.event-info {
    padding: 20px;
    width: 250px;
    text-align: right;
    background-color: #fff;
    margin: auto;
    cursor: pointer;
    border: 1px solid #39495c;
    margin-bottom: 20px;
}
.event-info span {
    font-size: 16px;
    margin-bottom: 5px;
    text-align: right;
}
</style>