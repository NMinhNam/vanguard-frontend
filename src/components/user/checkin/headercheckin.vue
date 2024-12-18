<template>
    <div class="col-12 row m-0 p-0 align-items-center text-center mb-3 fw-bold border-bottom pb-3">
        <h4 class="text-start text-black mb-1 col-4">{{ $t('checkin.header.title') }}</h4>
        <div class="col-2">
            <button v-if="!todayTask?.gioVao" class="btn btn-success px-2 py-1" @click="btnCheckIn_Click()">
                Check-in
            </button>
            <button
                v-if="todayTask?.gioVao && !todayTask?.gioRa"
                class="btn btn-danger px-2 py-1"
                @click="btnCheckOut_Click()"
            >
                Check-out
            </button>
        </div>
        <div class="col-4 row justify-content-center align-items-center">
            <select v-model="month" class="form-select mx-2 fw-bold" style="width: 150px" @change="onMonthChange">
                <option v-for="(monthName, index) in monthNames" :value="index + 1" :key="index">
                    {{ $t('checkin.header.month') }} {{ monthName }}
                </option>
            </select>
            {{ year }}
        </div>
        <div class="col-1 d-flex justify-content-end">
            <button class="btn btn-secondary rounded-0 mx-1 d-flex align-items-center" @click="prevMonth()">
                <span class="material-symbols-outlined"> keyboard_double_arrow_left </span>
            </button>
        </div>
        <div class="col-1">
            <button class="btn btn-secondary rounded-0 d-flex align-items-center" @click="nextMonth()">
                <span class="material-symbols-outlined"> keyboard_double_arrow_right </span>
            </button>
        </div>
    </div>
</template>

<script setup>
import { post } from '@/stores/https'
import { ref, watch, onMounted } from 'vue'
import axios from 'axios'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const props = defineProps(['todayTask'])
const emit = defineEmits(['updateDate'])

const month = ref(new Date().getMonth() + 1)
const year = ref(new Date().getFullYear())
const monthNames = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']

const now = new Date()
const currentDateTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`

watch([month, year], () => {
    emit('updateDate', { month: month.value, year: year.value })
})

const nextMonth = () => {
    if (month.value === 12) {
        month.value = 1
        year.value++
    } else {
        month.value++
    }
}

const prevMonth = () => {
    if (month.value === 1) {
        month.value = 12
        year.value--
    } else {
        month.value--
    }
}

const ip = ref('')

const getIPAddress = async () => {
    try {
        const response = await axios.get('https://api.ipify.org?format=json')
        ip.value = response.data.ip
    } catch (error) {
        console.error('Lỗi khi lấy IP:', error)
    }
}

const btnCheckIn_Click = async () => {
    await getIPAddress()
    const formData = ref({
        maNhanVien: sessionStorage.getItem('maNhanVien'),
        publicIp: ip.value,
    })
    try {
        const response = await post('/api/v1/attendances/checkin', formData.value)

        if (response.success) {
            Swal.fire({
                title: t('checkin.check_in.success.title'),
                text: `${t('checkin.check_in.success.text')}: ${currentDateTime}`,
                icon: 'success',
                timer: 1500,
            }).then(() => {
                location.reload()
            })
        } else {
            Swal.fire({
                title: t('checkin.check_in.fail.title'),
                text: t('checkin.check_in.fail.text'),
                icon: 'error',
                timer: 1500,
            })
        }
    } catch (error) {
        if (error.data.status === 1003) {
            Swal.fire({
                title: t('checkin.check_in.fail.title'),
                text: t('checkin.check_in.fail.text'),
                icon: 'error',
                timer: 1500,
            })
        } else {
            Swal.fire({
                title: t('checkin.error.title'),
                text: t('checkin.error.text'),
                icon: 'error',
                timer: 1500,
            })
            console.log("Lỗi: ", error)
        }

    }
}

const btnCheckOut_Click = async () => {
    await getIPAddress()
    const formData = ref({
        maNhanVien: sessionStorage.getItem('maNhanVien'),
        publicIp: ip.value,
    })
    try {
        const response = await post('/api/v1/attendances/checkout', formData.value)

        if (response.success) {
            Swal.fire({
                title: t('checkin.check_out.success.title'),
                text: `${t('checkin.check_out.success.text')}: ${currentDateTime}`,
                icon: 'success',
                timer: 1500,
            }).then(() => {
                location.reload()
            })
        } else {
            Swal.fire({
                title: t('checkin.check_out.fail.title'),
                text: t('checkin.check_out.fail.text'),
                icon: 'error',
                timer: 1500,
            })
        }
    } catch (error) {
        if (error.data.status === 1003) {
            Swal.fire({
                title: t('checkin.check_out.fail.title'),
                text: t('checkin.check_out.fail.text'),
                icon: 'error',
                timer: 1500,
            })
        } else {
            Swal.fire({
            title: t('checkin.erorr.title'),
            text: t('checkin.erorr.text'),
            icon: 'error',
            timer: 1500,
        })
        }

        
    }
}
</script>
