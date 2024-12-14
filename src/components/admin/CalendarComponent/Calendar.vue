<!-- Calendar.vue -->
<template>
    <div>
      <CalendarHeader @updateDate="updateDate" />
      <CalendarGrid :month="month" :year="year" @daySelected="onDaySelected" />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import CalendarHeader from './CalendarHeader.vue';
  import CalendarGrid from './CalendarGrid.vue';
  
  const month = ref(new Date().getMonth() + 1);
  const year = ref(new Date().getFullYear());
  
  const updateDate = ({ month, year }) => {
    month.value = month;
    year.value = year;
  };
  
  const onDaySelected = (day) => {
    console.log('Selected day:', day);
  };
  </script>
  