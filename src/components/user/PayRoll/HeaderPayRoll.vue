<template>
    <div class="head-menu border-0 border-secondary-subtle col-12">
        <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center">
                <h5 class="mb-0 fw-bolder">Phiếu lương</h5>
            </div>
            <div class="pagination d-flex justify-content-center align-items-center">
                <div class="px-2">
                    <select v-model="month" class="form-select mx-2 fw-bold" style="width: 150px;"
                        @change="onMonthChange">
                        <option v-for="(monthName, index) in monthNames" :value="index + 1" :key="index">
                            Tháng {{ monthName }}
                        </option>
                    </select>
                </div>
                <div class="px-2">
                    <select v-model="year" class="form-select mx-2 fw-bold" style="width: 150px;"
                        @change="onYearChange">
                        <option v-for="y in yearRange" :value="y" :key="y">
                            Năm {{ y }}
                        </option>
                    </select>
                </div>
                <button class="btn btn-secondary rounded-0 mx-1 d-flex align-items-center" @click="prevMonth()">
                    <span class="material-symbols-outlined"> keyboard_double_arrow_left </span>
                </button>
                <button class="btn btn-secondary rounded-0 d-flex align-items-center" @click="nextMonth()">
                    <span class="material-symbols-outlined"> keyboard_double_arrow_right </span>
                </button>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref, watch } from 'vue';

const props = defineProps(['todayTask']);
const emit = defineEmits(['updateDate']);

const month = ref(new Date().getMonth() + 1);
const year = ref(new Date().getFullYear());
const monthNames = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

// Tạo danh sách các năm (5 năm trước và 5 năm sau)
const yearRange = Array.from({ length: 11 }, (_, i) => new Date().getFullYear() - 5 + i);

const now = new Date();
const currentDateTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

watch([month, year], () => {
    emit('updateDate', { month: month.value, year: year.value });
});

const nextMonth = () => {
    if (month.value === 12) {
        month.value = 1;
        year.value++;
    } else {
        month.value++;
    }
};

const prevMonth = () => {
    if (month.value === 1) {
        month.value = 12;
        year.value--;
    } else {
        month.value--;
    }
};

const onMonthChange = () => {
    console.log(`Tháng được chọn: ${month.value}`);
};

const onYearChange = () => {
    console.log(`Năm được chọn: ${year.value}`);
};
</script>


<style scoped>
.head-menu {
    padding: 0.88rem 1rem;
    width: 100%;
    position: relative;
    height: calc(100% - 60px - 0.88rem * 2);
    background-color: var(--color-main);
    transition: var(--tran-05);
    border: 1px solid var(--color-border);
}
</style>
