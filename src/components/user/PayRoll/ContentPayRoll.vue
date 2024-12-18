
<template>
    <div class="container d-flex justify-content-center">
        <div class="col-sm-4 card-body border my-2 rounded-3">
            <div class="mb-4">
                <div class="d-flex justify-content-between align-items-center">
                    <p>{{ $t('pay_roll.items.total_income') }}</p>
                    <p class="fw-bolder">Tháng {{ bangLuongNew.thangBangLuong }} năm {{ bangLuongNew.namBangLuong }}</p>
                    <i class="fa-regular fa-credit-card mb-3"></i>
                </div>
                <b>{{ bangLuongNew.tongLuong }}</b>
            </div>
            <div class="mb-4">
                <p>{{ $t('pay_roll.items.violation') }}</p>
                <b>{{ bangLuongNew.tongKhauTru }}</b>
            </div>
            <div class="mb-4">
                <p>{{ $t('pay_roll.items.allowance') }}</p>
                <b>{{ bangLuongNew.tongPhuCap }}</b>
                <hr />
            </div>
            <div class="mb-4">
                <p>{{ $t('pay_roll.items.net_pay') }}</p>
                <b class="text-success">{{ bangLuongNew.tongLuongThucNhan }}</b>
            </div>
        </div>
    </div>
</template>

<script setup>
import { get } from '@/stores/https'
import { ref, onMounted, computed } from 'vue'

const bangLuongs = ref([])
const bangLuongNew = ref({})
const maNhanVien = ref(sessionStorage.getItem('maNhanVien'))

const props = defineProps({
    thang: String,
    nam: String,
})

onMounted(async () => {
    await getBangLuongs()
})

const getBangLuongs = async () => {
    try {
        console.log(maNhanVien.value)
        const response = await get(`/api/v1/salary/employee/${maNhanVien.value}`)
        bangLuongs.value = response.data
        bangLuongNew.value = bangLuongs.value[bangLuongs.value.length - 1]
    } catch (error) {
        console.error(error)
    }
}
</script>

<style scoped>
/* Tùy chỉnh thêm nếu cần, ví dụ: */
.card-body {
    padding: 20px;
    max-width: 350px; /* Đặt chiều rộng tối đa */
    width: 100%; /* Đảm bảo phần tử thu nhỏ với màn hình */
}
</style>
