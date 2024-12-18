<script setup>
import HeadMenu from './AccountHeadMenu.vue'
import AccountTable from './AccountTable.vue'
import { ref, computed, onMounted } from 'vue'
import { get } from '@/stores/https'

const listTaiKhoan = ref([])
const listRole = ref([])
const filteredAccount = ref([]) // Dữ liệu sau khi tìm kiếm
const currentPage = ref(1)
const pageSize = ref(10) // Số lượng dòng hiển thị trên mỗi trang
const searchQuery = ref('')

const getTaiKhoan = async () => {
    try {
        const response = await get('/api/v1/users')
        listTaiKhoan.value = response.data

        listTaiKhoan.value.sort((a, b) => {
            if (a.maNhanVien < b.maNhanVien) return -1
            if (a.maNhanVien > b.maNhanVien) return 1
            return 0
        })
        filteredAccount.value = listTaiKhoan.value
    } catch (error) {
        console.error('Lỗi khi gọi API:', error)
    }
}

const getAllRole = async () => {
    const response = await get('/api/v1/role')
    listRole.value = response.data
}

const totalPages = computed(() => {
    return Math.ceil(filteredAccount.value.length / pageSize.value)
})

// Dữ liệu cho bảng sau khi phân trang
const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    const end = start + pageSize.value
    return filteredAccount.value.slice(start, end)
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
const filterAccountBySearchQuery = (query) => {
    searchQuery.value = query
    if (query) {
        filteredAccount.value = listTaiKhoan.value.filter(
            (item) =>
                item.maNhanVien.toLowerCase().includes(query.toLowerCase()) ||
                item.tenNhanVien.toLowerCase().includes(query.toLowerCase()) ||
                item.userName.toLowerCase().includes(query.toLowerCase()),
        )
    } else {
        filteredAccount.value = listTaiKhoan.value
    }
    currentPage.value = 1
}

onMounted(async () => {
    await getTaiKhoan()
    await getAllRole()
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
                @search="filterAccountBySearchQuery"
            />

            <!-- Table -->
            <div class="col-12 mt-3" style="overflow-x: auto">
                <AccountTable
                    :listTaiKhoan="paginatedData"
                    :listRole="listRole"
                    :currentPage="currentPage"
                    :pageSize="pageSize"
                    :getTaiKhoan="getTaiKhoan"
                />
            </div>
        </div>
    </div>
</template>
