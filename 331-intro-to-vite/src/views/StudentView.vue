<template>
    <div>
        <h1>Student View</h1>
        <div class="card-container">
            <StudentCard v-for="student in students" :key="student.id" :student="student" />
        </div>
    </div>
</template>

<script setup lang="ts">
import StudentCard from '@/components/StudentCard.vue';
import type { Student } from '@/types';
import { ref, onMounted } from 'vue';
import StudentService from '@/services/StudentService';

const students = ref<Student[] | null>(null);

onMounted(() => {
    StudentService.getStudents().then((response) => {
        students.value = response.data;
    });
});
</script>