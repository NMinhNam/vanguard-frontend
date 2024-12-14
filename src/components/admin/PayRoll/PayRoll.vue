<script setup>
import HeadMenu from './HeadMenu.vue'
import PayRollTable from './PayRollTable.vue'
import { ref, onMounted, computed } from 'vue'

const listBangLuong = ref([
    {
        maNhanVien: "NV00",
        hoTen: "Nguyễn Minh Nam",
        chucVu: "Nhân Viên",
        luongCoBan: 4000,
        heSoLuong: 1,
        soCong: 22,
        luongThuong: 0,
        phuCap: {
            tienAnTrua: 500000,
            tienXang: 100000,
            tienDienThoai: 50000
        },
        khauTru: {
            bhyt: 1000000,
            bhxh: 200000,
            viPham: 0,
            tamUng: 300000
        },
        thucLanh: 0
    },
    {
        maNhanVien: "NV01",
        hoTen: "Nguyễn Minh Nam",
        chucVu: "Nhân Viên",
        luongCoBan: 4000,
        heSoLuong: 1,
        soCong: 22,
        luongThuong: 0,
        phuCap: {
            tienAnTrua: 500000,
            tienXang: 100000,
            tienDienThoai: 50000
        },
        khauTru: {
            bhyt: 1000000,
            bhxh: 200000,
            viPham: 0,
            tamUng: 300000
        },
        thucLanh: 0
    },
]);

const currentPage = ref(1);
const pageSize = ref(1); // Số lượng dòng hiển thị trên mỗi trang
const filteredPayRoll = ref(listBangLuong.value); // Dữ liệu sau khi tìm kiếm

// Tính tổng số trang
const totalPages = computed(() => {
    return Math.ceil(filteredPayRoll.value.length / pageSize.value);
});

// Dữ liệu cho bảng sau khi phân trang
const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    return filteredPayRoll.value.slice(start, end);
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
const filterPayRollBySearchQuery = (query) => {
    searchQuery.value = query;
    if (query) {
        filteredPayRoll.value = listBangLuong.value.filter((item) =>
            item.hoTen.toLowerCase().includes(query.toLowerCase()) ||
            item.maNhanVien.toLowerCase().includes(query.toLowerCase())
        );
    } else {
        filteredPayRoll.value = listBangLuong.value;
    }
    currentPage.value = 1; // Reset về trang đầu tiên
};
</script>

<template>
    <div class="container-fluid mt-3" style="overflow-x: auto">
        <div class="row">
            <!-- Header -->
            <HeadMenu :currentPage="currentPage" :totalPages="totalPages" @prevPage="prevPage" @nextPage="nextPage"
                @search="filterPayRollBySearchQuery" />

            <!-- Table -->
            <div class="col-12" style="overflow-x: auto">
                <PayRollTable :listBangLuong="paginatedData" :currentPage="currentPage" :pageSize="pageSize" />
            </div>
        </div>
    </div>
</template>
