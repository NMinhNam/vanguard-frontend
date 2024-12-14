<script setup>
import { get } from '@/stores/https';
import HeadMenu from './WorkTypeHeadMenu.vue'
import WorkTypeTable from './WorkTypeTable.vue'
import { ref, computed, onMounted } from 'vue'

const listLoaiCong = ref([]);

const currentPage = ref(1);
const pageSize = ref(5); // Số lượng dòng hiển thị trên mỗi trang
const filteredWorkType = ref(listLoaiCong.value); // Dữ liệu sau khi tìm kiếm

// Hàm gọi API để lấy danh sách loại công
const getLoaiCong = async () => {
    try {
        const response = await get('/api/v1/attendance-types');
        listLoaiCong.value = response.data;
        filteredWorkType.value = listLoaiCong.value;
    } catch (error) {
        console.error('Lỗi khi gọi API getLoaiCong:', error);
    }
};

// Tính tổng số trang
const totalPages = computed(() => {
    return Math.ceil(filteredWorkType.value.length / pageSize.value);
});

// Dữ liệu cho bảng sau khi phân trang
const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    return filteredWorkType.value.slice(start, end);
});

// Chuyển đến trang trước
const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
};

// Chuyển đến trang sau
const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
};

// Tìm kiếm
const searchQuery = ref('');
const filterWorkTypeBySearchQuery = (query) => {
    searchQuery.value = query;
    if (query) {
        filteredWorkType.value = listLoaiCong.value.filter((item) =>
            item.tenLoaiCong.toLowerCase().includes(query.toLowerCase())
        );
    } else {
        filteredWorkType.value = listLoaiCong.value;
    }
    currentPage.value = 1; // Reset về trang đầu tiên
};

onMounted(async () => {
    await getLoaiCong();
});
</script>
<template>
    <div class="container-fluid mt-3" style="overflow-x: auto">
        <div class="row">
            <!-- Header -->
            <HeadMenu :currentPage="currentPage" :totalPages="totalPages" @prevPage="prevPage" @nextPage="nextPage"
                @search="filterWorkTypeBySearchQuery" :getLoaiCong="getLoaiCong"/>

            <!-- Table -->
            <div class="col-12 mt-3" style="overflow-x: auto">
                <WorkTypeTable :listLoaiCong="paginatedData" :currentPage="currentPage" :pageSize="pageSize" :getLoaiCong="getLoaiCong"/>
            </div>
        </div>
    </div>
</template>