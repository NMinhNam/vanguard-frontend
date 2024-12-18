<script setup>
import { get } from '@/stores/https'
import HeadMenu from './HeadMenu.vue'
import ViolationTable from './ViolationTable.vue'
import { ref, computed, onMounted } from 'vue'

const listViPham = ref([])

// Hàm gọi API để lấy danh sách phụ cấp
const getViPham = async () => {
    try {
        const response = await get('/api/v1/violations')
        listViPham.value = response.data
        filteredViolation.value = listViPham.value
    } catch (error) {
        console.error('Lỗi khi gọi API getPhuCap:', error)
    }
}

const currentPage = ref(1)
const pageSize = ref(5) // Số lượng dòng hiển thị trên mỗi trang
const filteredViolation = ref(listViPham.value) // Dữ liệu sau khi tìm kiếm

// Tính tổng số trang
const totalPages = computed(() => {
    return Math.ceil(filteredViolation.value.length / pageSize.value)
})

// Dữ liệu cho bảng sau khi phân trang
const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    const end = start + pageSize.value
    return filteredViolation.value.slice(start, end)
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
const searchQuery = ref('')
const filterViolationBySearchQuery = (query) => {
    searchQuery.value = query
    if (query) {
        filteredViolation.value = listViPham.value.filter(
            (item) =>
                item.maViPham.toLowerCase().includes(query.toLowerCase()) ||
                item.tenViPham.toLowerCase().includes(query.toLowerCase()),
        )
    } else {
        filteredViolation.value = listViPham.value
    }
    currentPage.value = 1 // Reset về trang đầu tiên
}

onMounted(async () => {
    await getViPham()
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
                @search="filterViolationBySearchQuery"
                :getViPham="getViPham"
            />

            <!-- Table -->
            <div class="col-12 mt-3" style="overflow-x: auto">
                <ViolationTable
                    :listViPham="paginatedData"
                    :currentPage="currentPage"
                    :pageSize="pageSize"
                    :getViPham="getViPham"
                />
            </div>
        </div>
    </div>
</template>
