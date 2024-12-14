<template>
    <div class="col-12 row m-0 p-0 align-items-center text-center my-3 fw-bold">
        <h2 class="text-start text-black mb-1 col-4">Theo dõi chấm công</h2>
        <div class="col-2">
            <button v-if="!todayTask?.gioVao" class="btn btn-success px-1 py-1"
                @click="btnCheckIn_Click()">Check-in</button>
            <button v-if="todayTask?.gioVao && !todayTask?.gioRa" class="btn btn-danger px-1 py-1"
                @click="btnCheckOut_Click()">Check-out</button>
        </div>
        <div class="col-4 row justify-content-center align-items-center">
            <select v-model="month" class="form-select mx-2 fw-bold" style="width: 150px;" @change="onMonthChange">
                <option v-for="(monthName, index) in monthNames" :value="index + 1" :key="index">
                    Tháng {{ monthName }}
                </option>
            </select>
            {{ year }}
        </div>
        <div class="col-1">
            <i class="fas fa-chevron-left fs-3 px-3 py-2 bg-danger text-white rounded-3" @click="prevMonth"></i>
        </div>
        <div class="col-1">
            <i class="fas fa-chevron-right fs-3 px-3 py-2 bg-danger text-white rounded-3" @click="nextMonth"></i>
        </div>
    </div>
</template>

<script setup>
import { post } from '@/stores/https';
import { ref, watch, onMounted } from 'vue';
import axios from "axios";

const props = defineProps(['todayTask']);
const emit = defineEmits(['updateDate']);

const month = ref(new Date().getMonth() + 1);
const year = ref(new Date().getFullYear());
const monthNames = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

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

const ip = ref("");

const getIPAddress = async () => {
    try {
        const response = await axios.get("https://api.ipify.org?format=json");
        ip.value = response.data.ip;
        console.log(ip.value)
    } catch (error) {
        console.error("Lỗi khi lấy IP:", error);
    }
};

const btnCheckIn_Click = async () => {
    await getIPAddress()
    const formData = ref({
        maNhanVien: sessionStorage.getItem('maNhanVien'),
        publicIp: ip.value
    })
    try {
        const response = await post('/api/v1/attendances/checkin', formData.value)
        console.log

        if (response.success) {
            Swal.fire({
                title: 'Checkin thành công',
                text: `Đã checkin: ${currentDateTime}`,
                icon: 'success',
                timer: 1500,
            }).then(() => {
                location.reload();
            })
        } else {
            Swal.fire({
                title: 'Checkin không thành công',
                text: 'Checkin Lỗi',
                icon: 'error',
                timer: 1500,
            })
        }
    } catch (error) {
        Swal.fire({
            title: 'Lỗi hệ thống',
            text: 'Lỗi',
            icon: 'error',
            timer: 1500,
        })
        console.log("Lỗi: ", error)
    }
}

const btnCheckOut_Click = async () => {
    await getIPAddress()
    const formData = ref({
        maNhanVien: sessionStorage.getItem('maNhanVien'),
        publicIp: ip.value
    })
    try {
        const response = await post('/api/v1/attendances/checkout', formData.value)

        if (response.success) {
            Swal.fire({
                title: 'Checkout thành công',
                text: `Đã checkout: ${currentDateTime}`,
                icon: 'success',
                timer: 1500,
            }).then(() => {
                location.reload();
            })
        } else {
            Swal.fire({
                title: 'Checkout không thành công',
                text: 'Checkout Lỗi',
                icon: 'error',
                timer: 1500,
            })
        }
    } catch (error) {
        Swal.fire({
            title: 'Checkout không thành công',
            text: 'Checkout Lỗi',
            icon: 'error',
            timer: 1500,
        })
        console.log("Lỗi: ", error)
    }
}

</script>
