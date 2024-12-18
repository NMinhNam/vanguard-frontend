<template>
    <div class="container mt-5">
        <h3 class="text-center fw-bold">Quét QR chấm công</h3>
        <div class="text-center mt-4">
            <!-- Gắn ref video -->
            <video ref="videoElement" class="box-shadow video" autoplay muted playsinline></video>
        </div>
        <div class="text-center mt-3">
            <button class="btn btn-primary" @click="startScanner" style="height: 39px">
                <span class="material-symbols-outlined me-2 align-middle"> qr_code_scanner </span>Bắt đầu quét
            </button>
            <button class="btn btn-danger ms-2" @click="stopScanner">
                <span class="material-symbols-outlined me-2 align-middle">close</span>Dừng quét
            </button>
        </div>
    </div>
</template>
  
<script setup>
import { post } from '@/stores/https'
import { ref, onBeforeUnmount } from 'vue'

const qrCodeData = ref(null)
const videoElement = ref(null)
let qrScanner = null
const ip = ref('')

const loadQrScanner = async () => {
    const QrScanner = (await import('qr-scanner')).default
    return QrScanner
}

const getIPAddress = async () => {
    try {
        const response = await axios.get('https://api.ipify.org?format=json')
        ip.value = response.data.ip
    } catch (error) {
        console.error('Lỗi khi lấy IP:', error)
    }
}

const startScanner = async () => {
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
                try {
                    const maNhanVien = result.data
                    const formData = ref({
                        maNhanVien: maNhanVien,
                        publicIp: ip.value,
                    })
                    const response = post('http://localhost:1688/api/v1/attendances/checkin', formData.value)
                    if (response.status == 200) {
                        Swal.fire({
                            title: 'Thành công',
                            text: 'Check-in thành công',
                            icon: 'success',
                            timer: 2000,
                        })
                    }
                } catch (error) {
                    Swal.fire({
                        title: 'Thất bại',
                        text: 'Check-in thất bại',
                        icon: 'error',
                        timer: 2000,
                    })
                    console.error(error)
                }
                stopScanner()
            },
            {
                returnDetailedScanResult: true,
            },
        )
    }
    qrScanner.start()
}

const stopScanner = () => {
    if (qrScanner) {
        qrScanner.stop()
    }
}

onBeforeUnmount(() => {
    if (qrScanner) {
        qrScanner.destroy()
    }
})
</script>
  
  <style>
.box-shadow {
    border-radius: 1rem;
    border: 1px solid #d7d7da;
}

.video {
    width: 400px;
    height: auto;
}

@media screen and (max-width: 768px) {
    .video {
        width: 100% !important;
    }
}
</style>