
<template>
    <div class="table-responsive mt-3">
        <table class="table table-striped table-bordered text-center text-nowrap" cellspacing="0">
            <thead class="">
                <!-- Tiêu đề bảng -->
                <tr>
                    <th scope="col" class="align-middle">{{ t('payroll.table.no') }}</th>
                    <th scope="col" class="align-middle">{{ t('payroll.table.id') }}</th>
                    <th scope="col" class="align-middle">{{ t('payroll.table.name') }}</th>
                    <th scope="col" class="align-middle">{{ t('payroll.table.month') }}</th>
                    <th scope="col" class="align-middle">{{ t('payroll.table.year') }}</th>
                    <th scope="col" class="align-middle">{{ t('payroll.table.allowance') }}</th>
                    <th scope="col" class="align-middle">{{ t('payroll.table.violation') }}</th>
                    <th scope="col" class="align-middle">{{ t('payroll.table.total_salary') }}</th>
                    <th scope="col" class="align-middle">{{ t('payroll.table.real') }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="bangLuongs.length === 0" style="text-align: center; font-style: italic">
                    <td colspan="11">{{ t('payroll.table.search') }}</td>
                </tr>
                <!-- Dữ liệu bảng -->
                <tr v-for="(item, index) in bangLuongs" :key="index">
                    <td>{{ index }}</td>
                    <td>{{ item.maNhanVien }}</td>
                    <td>{{ item.tenNhanVien }}</td>
                    <td>{{ item.thangBangLuong }}</td>
                    <td>{{ item.namBangLuong }}</td>
                    <td>{{ item.tongPhuCap }}</td>
                    <td>{{ item.tongKhauTru }}</td>
                    <td>{{ item.tongLuong }}</td>
                    <td>{{ item.tongLuongThucNhan }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script setup>
import { get } from '@/stores/https'
import { ref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const bangLuongs = ref([])
const maNhanVien = ref(sessionStorage.getItem('maNhanVien'))

onMounted(async () => {
    await getBangLuongs()
})

const getBangLuongs = async () => {
    try {
        console.log(maNhanVien.value)
        const response = await get(`/api/v1/salary/employee/${maNhanVien.value}`)
        bangLuongs.value = response.data
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
