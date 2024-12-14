<!-- CalendarGrid.vue -->
<template>
    <div class="calendar-grid">
      <div class="row week-header">
        <div class="col" v-for="day in weekDays" :key="day">{{ day }}</div>
      </div>
      <div class="row">
        <div
          class="col day-cell"
          v-for="(day, index) in daysInMonth"
          :key="index"
          @click="onDayClick(day)"
        >
          <span>{{ day }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  const props = defineProps({
    month: Number,
    year: Number,
  });
  
  const emit = defineEmits(['daySelected']);
  
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  const daysInMonth = computed(() => {
    const firstDayOfMonth = new Date(props.year, props.month - 1, 1);
    const lastDayOfMonth = new Date(props.year, props.month, 0);
    const days = [];
  
    // Get days in month
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      days.push(i);
    }
  
    return days;
  });
  
  const onDayClick = (day) => {
    emit('daySelected', day);
  };
  </script>
  
  <style scoped>
  .calendar-grid {
    display: flex;
    flex-direction: column;
  }
  
  .week-header {
    display: flex;
    justify-content: space-between;
  }
  
  .day-cell {
    padding: 10px;
    text-align: center;
    cursor: pointer;
  }
  </style>
  