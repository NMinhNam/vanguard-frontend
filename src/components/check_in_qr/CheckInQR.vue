<template>
    <div class="qr-wrapper">
        <div class="clock-container">
            <!-- Hiển thị ngày tháng năm -->
            <div class="date-display fw-bolder fs-4">
                {{ date }}
            </div>
            <!-- Hiển thị giờ phút -->
            <div class="time-display fw-bolder fs-3">
                {{ time }}
            </div>
        </div>
        <!-- Tiêu đề -->
        <h1 class="title">Quét QR Check In</h1>
        <!-- Video Camera -->
        <div class="camera-container">
            <video ref="videoElement" class="box-shadow video" autoplay muted playsinline></video>
        </div>

        <!-- Nút điều khiển -->
        <div class="control-buttons">
            <button class="btn start-btn" @click="startScanner">Bắt đầu quét</button>
            <button class="btn stop-btn" @click="stopScanner">Dừng quét</button>
        </div>
    </div>
</template>
  
<script setup>
import { post } from '@/stores/https'
import { ref, onBeforeUnmount, onMounted } from 'vue'
import axios from 'axios'
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()

const time = ref('')
const date = ref('')
const qrCodeData = ref(null)
const videoElement = ref(null)
let qrScanner = null
const ip = ref('')
let clockInterval = null
const updateClock = () => {
    const now = new Date()
    time.value = now.toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    })

    date.value = now.toLocaleDateString('vi-VN', {
        weekday: 'long',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    })
}

onMounted(() => {
    updateClock() // Chạy ngay khi load
    clockInterval = setInterval(updateClock, 1000) // Cập nhật mỗi giây
})

const loadQrScanner = async () => {
    const QrScanner = (await import('qr-scanner')).default
    return QrScanner
}

const getIPAddress = async () => {
    try {
        const response = await axios.get('https://api.ipify.org?format=json')
        ip.value = response.data.ip
        console.log(ip.value)
    } catch (error) {
        console.error('Lỗi khi lấy IP:', error)
    }
}

const startScanner = async () => {
    await getIPAddress()
    if (!videoElement.value) {
        console.error('Video element not mounted!')
        return
    }

    qrCodeData.value = null
    const QrScanner = await loadQrScanner()

    if (!qrScanner) {
        qrScanner = new QrScanner(
            videoElement.value,
            (result) => {
                checkInQr(result.data)
                stopScanner()
            },
            {
                returnDetailedScanResult: true,
            },
        )
    }
    qrScanner.start()
}
const checkInQr = async (maNhanVien) => {
    await getIPAddress()
    const formData = ref({
        maNhanVien: maNhanVien,
        publicIp: ip.value,
    })

    try {
        const response = await post('/api/v1/attendances/checkin', formData.value)
        if (response) {
            Swal.fire({
                title: t('checkin.check_in.success.title'),
                text: t('checkin.check_in.success.text'),
                icon: 'success',
                timer: 1500,
            })
        }
    } catch (error) {
        Swal.fire({
            title: t('checkin.error.title'),
            text: t('checkin.error.text'),
            icon: 'error',
            timer: 1500,
        })
        console.log('Lỗi: ', error)
    }
}

const stopScanner = () => {
    if (qrScanner) {
        qrScanner.stop()
    }
}

onBeforeUnmount(() => {
    clearInterval(clockInterval)
    if (qrScanner) {
        qrScanner.destroy()
    }
})
</script>
<style scoped>
.qr-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: #c3d8ed;
    font-family: Arial, sans-serif;
}

.title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 20px;
    color: #333;
}

.camera-container {
    width: 480px;
    height: 360px;
    border: 5px solid #4a90e2;
    border-radius: 15px;
    overflow: hidden;
    background-color: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.camera-view {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.control-buttons {
    margin-top: 20px;
    display: flex;
    gap: 10px;
}

.btn {
    padding: 10px 20px;
    font-size: 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    color: #fff;
    font-weight: bold;
}

.start-btn {
    background-color: #4caf50;
}

.stop-btn {
    background-color: #f44336;
}

.btn:hover {
    opacity: 0.8;
}
</style>