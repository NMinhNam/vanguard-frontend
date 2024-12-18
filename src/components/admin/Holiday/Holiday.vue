<script setup>
import { get } from '@/stores/https'
import HeadMenu from './HolidayHeadMenu.vue'
import HolidayTable from './HolidayTable.vue'
import { ref, computed, onMounted } from 'vue'

const listNgayLe = ref([])

const currentPage = ref(1)
const pageSize = ref(5) // Số lượng dòng hiển thị trên mỗi trang
const filteredHoliday = ref(listNgayLe.value) // Dữ liệu sau khi tìm kiếm

// Hàm gọi API để lấy danh sách ngày lễ
const getNgayLe = async () => {
    try {
        const response = await get('/api/v1/holidays')
        listNgayLe.value = response.data
        filteredHoliday.value = listNgayLe.value
    } catch (error) {
        console.error('Lỗi khi gọi API getNgayLe:', error)
    }
}

// Tính tổng số trang
const totalPages = computed(() => {
    return Math.ceil(filteredHoliday.value.length / pageSize.value)
})

// Dữ liệu cho bảng sau khi phân trang
const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    const end = start + pageSize.value
    return filteredHoliday.value.slice(start, end)
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
const filterHolidayBySearchQuery = (query) => {
    searchQuery.value = query
    if (query) {
        filteredHoliday.value = listNgayLe.value.filter((item) =>
            item.tenNgayLe.toLowerCase().includes(query.toLowerCase()),
        )
    } else {
        filteredHoliday.value = listNgayLe.value
    }
    currentPage.value = 1 // Reset về trang đầu tiên
}

onMounted(async () => {
    await getNgayLe()
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
                @search="filterHolidayBySearchQuery"
                :getNgayLe="getNgayLe"
            />

            <!-- Table -->
            <div class="col-12 mt-3" style="overflow-x: auto">
                <HolidayTable
                    :listNgayLe="paginatedData"
                    :currentPage="currentPage"
                    :pageSize="pageSize"
                    :getNgayLe="getNgayLe"
                />
            </div>
        </div>
    </div>
</template>
