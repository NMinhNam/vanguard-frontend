<script setup>
import HeadMenu from './HeadMenu.vue'
import AllowanceTable from './AllowanceTable.vue'
import { ref, computed, onMounted } from 'vue'
import { get } from '@/stores/https'

const listPhuCap = ref([])
const filteredAlowance = ref([]) // Dữ liệu sau khi tìm kiếm
const currentPage = ref(1)
const pageSize = ref(10) // Số lượng dòng hiển thị trên mỗi trang
const searchQuery = ref('')

// Hàm gọi API để lấy danh sách phụ cấp
const getPhuCap = async () => {
    try {
        const response = await get('/api/v1/allowance')
        listPhuCap.value = response.data
        filteredAlowance.value = listPhuCap.value
    } catch (error) {
        console.error('Lỗi khi gọi API getPhuCap:', error)
    }
}

// Tính tổng số trang
const totalPages = computed(() => {
    return Math.ceil(filteredAlowance.value.length / pageSize.value)
})

// Dữ liệu cho bảng sau khi phân trang
const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    const end = start + pageSize.value
    return filteredAlowance.value.slice(start, end)
})

// Chuyển đến trang trước
const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--
    }
}

// Chuyển đến trang sau
const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++
    }
}

// Tìm kiếm
const filterAlowanceBySearchQuery = (query) => {
    searchQuery.value = query
    if (query) {
        filteredAlowance.value = listPhuCap.value.filter(
            (item) =>
                item.maPhuCap.toLowerCase().includes(query.toLowerCase()) ||
                item.tenPhuCap.toLowerCase().includes(query.toLowerCase()),
        )
    } else {
        filteredAlowance.value = listPhuCap.value
    }
    currentPage.value = 1
}

onMounted(async () => {
    await getPhuCap()
})
</script>

<template>
    <div class="container-fluid mt-3" style="overflow-x: auto">
        <div class="row">
            <!-- Header -->
            <HeadMenu
                :currentPage="currentPage"
                :totalPages="totalPages"
                @prevPage="prevPage"
                @nextPage="nextPage"
                @search="filterAlowanceBySearchQuery"
                :getPhuCap="getPhuCap"
            />

            <!-- Table -->
            <div class="col-12 mt-3" style="overflow-x: auto">
                <AllowanceTable
                    :listPhuCap="paginatedData"
                    :currentPage="currentPage"
                    :pageSize="pageSize"
                    :getPhuCap="getPhuCap"
                />
            </div>
        </div>
    </div>
</template>
