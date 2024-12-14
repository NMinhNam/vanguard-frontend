<template>
  <div>
    <table class="table table-bordered text-center mt-1">
      <thead>
        <tr>
          <th>Mon</th>
          <th>Tue</th>
          <th>Wed</th>
          <th>Thu</th>
          <th>Fri</th>
          <th>Sat</th>
          <th>Sun</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(week, weekIndex) in calendarRows" :key="weekIndex">
          <td 
            v-for="(day, index) in week" 
            :key="index" 
            :class="{
              'bg-primary text-white': isToday(day),
              'weekend': index >= 5,
            }" 
            class="day-cell" 
            @click="handleDayClick(day)"
          >
            <div class="cell-content">
              <b>{{ day }}</b>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <div v-if="isModalOpen" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <h3>Thông tin cuộc họp cho ngày {{ selectedDay }}</h3>

        <form @submit.prevent="saveEvent">
          <div class="form-group">
            <label for="event-name">Tên cuộc họp:</label>
            <input type="text" id="event-name" v-model="eventName" placeholder="Nhập tên cuộc họp" required />
          </div>

          <div class="form-group">
            <label for="created-by">Người tạo cuộc họp:</label>
            <input type="text" id="created-by" v-model="createdBy" placeholder="Nhập tên người tạo" required />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="start-date">Ngày bắt đầu:</label>
              <input type="date" id="start-date" v-model="startDate" required />
            </div>

            <div class="form-group">
              <label for="start-time">Giờ bắt đầu:</label>
              <input type="time" id="start-time" v-model="startTime" required />
            </div>
          </div>

          <div class="form-group">
            <label for="video-call-url">Video Call URL:</label>
            <input type="url" id="video-call-url" v-model="videoCallUrl" placeholder="Nhập URL Video Call" required />
          </div>

          <div class="form-group">
            <label for="description">Mô tả:</label>
            <textarea id="description" v-model="description" placeholder="Mô tả cuộc họp" rows="2"></textarea>
          </div>

          <button type="submit">Lưu cuộc họp</button>
          <button type="button" @click="closeModal">Đóng</button>
        </form>
      </div>
    </div>
  </div>
</template>



<script setup>
import { ref, computed } from "vue";

const props = defineProps(["month", "year"]);

const isModalOpen = ref(false);
const selectedDay = ref(null);
const eventName = ref('');
const startDate = ref('');
const startTime = ref('');
const createdBy = ref('');
const videoCallUrl = ref('');
const description = ref('');

const handleDayClick = (day) => {
  if (!day) return;
  selectedDay.value = day;
  isModalOpen.value = true; 
};

const closeModal = () => {
  isModalOpen.value = false;
  eventName.value = '';
  startDate.value = '';
  startTime.value = '';
  createdBy.value = '';
  videoCallUrl.value = '';
  description.value = '';
};

const isToday = (day) => {
  const today = new Date();
  return (
    day &&
    today.getDate() === day &&
    today.getMonth() + 1 === props.month &&
    today.getFullYear() === props.year
  );
};

const daysInMonth = (month, year) => new Date(year, month, 0).getDate();
const firstDayOfMonth = computed(() => new Date(props.year, props.month - 1, 1).getDay());
const calendarRows = computed(() => {
  const days = [];
  const totalDays = daysInMonth(props.month, props.year);
  let week = new Array(firstDayOfMonth.value === 0 ? 6 : firstDayOfMonth.value - 1).fill("");
  for (let day = 1; day <= totalDays; day++) {
    week.push(day);
    if (week.length === 7) {
      days.push(week);
      week = [];
    }
  }
  if (week.length > 0) {
    while (week.length < 7) {
      week.push("");
    }
    days.push(week);
  }
  return days;
});

const saveEvent = () => {
  console.log({
    eventName: eventName.value,
    startDate: startDate.value,
    startTime: startTime.value,
    createdBy: createdBy.value,
    videoCallUrl: videoCallUrl.value,
    description: description.value,
  });

  closeModal();
};
</script>

<style scoped>
.table-bordered {
  border: 2px solid black;
}

th {
  background-color: #343a40;
  color: white;
}

td.day-cell {
  width: 100px;
  height: 100px;
  vertical-align: top;
  padding: 8px 12px;
  cursor: pointer;
  border: 2px solid black;
}

.cell-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.weekend {
  background-color: #f8d7da;
  color: #721c24;
  border: 2px solid #dc3545;
}

.bg-primary {
  background-color: lightskyblue !important;
}

.text-white {
  color: #ffffff !important;
}

span,
.fa-solid {
  font-size: 14px;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px; /* Đổi kích thước modal */
  text-align: left; /* Căn trái nội dung */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

h3 {
  margin-bottom: 20px;
  color: #343a40;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
}

.form-group textarea {
  resize: vertical;
  height: 120px;
}

.form-row {
  display: flex;
  justify-content: space-between;
  gap: 20px; 
}

.form-row .form-group {
  width: 48%; 
}

button {
  padding: 8px 16px;
  margin-top: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
}

button[type="button"] {
  background-color: #dc3545;
}

button:hover {
  background-color: #0056b3;
}

button[type="button"]:hover {
  background-color: #c82333;
}


</style>
