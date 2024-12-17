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
                    v-for="(Contract, index) in paginatedContract"
                    :key="Contract.soHopDong || index"
                    @click="$router.push(`/admin/contract/${Contract.soHopDong}`)"
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
    <div class="pagination d-flex justify-content-center align-items-center">
        <button
            class="btn btn-secondary rounded-0 mx-1 d-flex align-items-center"
            :disabled="props.currentPage === 1"
            @click="goToPage(props.currentPage - 1)"
        >
            <span class="material-symbols-outlined"> keyboard_double_arrow_left </span>
        </button>
        <span>{{ t('approve.page') }} {{ props.currentPage }} / {{ totalPages }}</span>
        <button
            class="btn btn-secondary rounded-0 d-flex align-items-center"
            :disabled="props.currentPage === totalPages"
            @click="goToPage(props.currentPage + 1)"
        >
            <span class="material-symbols-outlined"> keyboard_double_arrow_right </span>
        </button>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { ref, onMounted } from 'vue'
import { get } from '@/stores/https'
import { useI18n } from 'vue-i18n'

const emit = defineEmits(['updatePage'])
const { t, locale } = useI18n()
const listNhanVien = ref([])
const props = defineProps({
    listContract: Array,
    searchQuery: {
        type: String,
        default: '',
    },
    currentPage: {
        type: Number,
        default: 1,
    },
    pageSize: {
        type: Number,
        default: 2,
    },
})

const filteredContract = computed(() => {
    let contracts = props.listContract
    // Lọc theo searchQuery nếu có
    if (props.searchQuery) {
        contracts = contracts.filter((contract) =>
            getTenNhanVien(contract.maNhanVien).toLowerCase().includes(props.searchQuery.toLowerCase()),
        )
    }
    return contracts
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
const paginatedContract = computed(() => {
    const start = (props.currentPage - 1) * props.pageSize
    const end = start + props.pageSize
    return filteredContract.value.slice(start, end)
})

const totalPages = computed(() => {
    return Math.ceil(filteredContract.value.length / props.pageSize)
})

const goToPage = (page) => {
    emit('updatePage', page)
}
</script>
