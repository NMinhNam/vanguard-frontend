<template>
    <table class="table table-bordered text-center mt-1">
        <thead>
            <tr>
                <th>{{ $t('checkin.table.mon') }}</th>
                <th>{{ $t('checkin.table.tue') }}</th>
                <th>{{ $t('checkin.table.wed') }}</th>
                <th>{{ $t('checkin.table.thu') }}</th>
                <th>{{ $t('checkin.table.fri') }}</th>
                <th>{{ $t('checkin.table.sat') }}</th>
                <th>{{ $t('checkin.table.sun') }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(week, weekIndex) in calendarRows" :key="weekIndex">
                <td v-for="(day, index) in week" :key="index" :class="{
                    'bg-primary text-white': isToday(day),
                    'weekend': index >= 5,
                }" class="day-cell" @click="handleDayClick(day)">
                    <div class="cell-content">
                        <div class="d-flex justify-content-between align-items-center">
                            <b>{{ day }}</b>
                            <i v-if="getCheckInOut(day).day" class="fa-solid fa-user-check text-success"></i>
                        </div>
                        <div class="d-flex justify-content-between align-items-center text-success"
                            v-if="getCheckInOut(day).day">
                            <span>{{ $t('checkin.table.in') }}: {{ getCheckInOut(day).checkIn }}</span>
                            <span>{{ $t('checkin.table.out') }}: {{ getCheckInOut(day).checkOut }}</span>
                        </div>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { get } from "@/stores/https";

const props = defineProps(["month", "year"]);
const tasks = ref([])
const emit = defineEmits(['updateTodayTask']);

const getChamCong = async () => {
    const response = await get(`/api/v1/attendances/employess/${sessionStorage.getItem('maNhanVien')}`);
    tasks.value = response.data

    const todayDate = new Date();
    const todayTask = tasks.value.find(task =>
        task.ngayChamCong === `${todayDate.getFullYear()}-${String(todayDate.getMonth() + 1).padStart(2, '0')}-${String(todayDate.getDate()).padStart(2, '0')}`
    );
    emit('updateTodayTask', todayTask || null);
}

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

const isToday = (day) => {
    const today = new Date();
    return (
        day &&
        today.getDate() === day &&
        today.getMonth() + 1 === props.month &&
        today.getFullYear() === props.year
    );
};

const getCheckInOut = (day) => {
    if (!day) return { checkIn: "", checkOut: "", day: "" };
    const task = tasks.value.find(
        (task) => task.ngayChamCong === `${props.year}-${String(props.month).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    );
    if (!task?.gioRa) return task ? { checkIn: task.gioVao.slice(0, 5), checkOut: "", day: task.ngayChamCong } : { checkIn: "", checkOut: "", day: "" };
    return task ? { checkIn: task.gioVao.slice(0, 5), checkOut: null || task.gioRa.slice(0, 5), day: task.ngayChamCong } : { checkIn: "", checkOut: "", day: "" };
};

const handleDayClick = (day) => {
    if (!day) return;
};

onMounted(async () => {
    await getChamCong()
})
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
    width: 150px;
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
    /* Viền đậm hơn */
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
</style>