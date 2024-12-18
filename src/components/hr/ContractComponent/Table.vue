<template>
    <div class="table-responsive">
        <table class="table table-hover align-middle text-center">
            <thead class="table-light">
                <tr class="text-center">
                    <th scope="col">{{ t('contract.table.no') }}</th>
                    <th scope="col">{{ t('contract.table.fullname') }}</th>
                    <th scope="col">{{ t('contract.table.content') }}</th>
                    <th scope="col">{{ t('contract.table.start_day') }}</th>
                    <th scope="col">{{ t('contract.table.end_day') }}</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(Contract, index) in listContract"
                    :key="Contract.soHopDong || index"
                    @click="$router.push(`/hr/contract/${Contract.soHopDong}`)"
                    style="cursor: pointer"
                >
                    <td>{{ index + 1 }}</td>
                    <td>{{ getTenNhanVien(Contract.maNhanVien) }}</td>
                    <td>{{ Contract.noiDung }}</td>
                    <td>{{ Contract.ngayBatDau }}</td>
                    <td>{{ Contract.ngayKetThuc }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { get } from '@/stores/https'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const listNhanVien = ref([])
const props = defineProps({
    listContract: Array,
})
const getNhanVien = async () => {
    try {
        const response = await get('/api/v1/employees') // URL API danh sách nhân viên
        listNhanVien.value = response.data
    } catch (error) {
        console.error('Lỗi khi fetch danh sách nhân viên:', error)
    }
}

onMounted(async () => {
    await getNhanVien()
})
const getTenNhanVien = (maNhanVien) => {
    const nhanVien = listNhanVien.value.find((nv) => nv.maNhanVien === maNhanVien)
    return nhanVien ? nhanVien.hoTen : 'Không xác định' // Trả về tên hoặc giá trị mặc định
}
</script>
