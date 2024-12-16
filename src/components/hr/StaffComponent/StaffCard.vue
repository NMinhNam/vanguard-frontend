<template>
    <div class="p-4">
        <div class="row row-cols-1 row-cols-md-3 g-4">
            <div
                v-for="staff in paginatedStaffs"
                :key="staff.maNhanVien"
                class="col"
                @dblclick="$router.push('/admin/staff/' + staff.maNhanVien)"
            >
                <div class="card h-100">
                    <div class="card-body d-flex p-0">
                        <div class="employee-avatar">
                            <img v-if="staff.hinhAnh" :src="staff.hinhAnh" :alt="staff.hoTen" class="img-fluid" />
                            <div v-else>
                                <img
                                    src="https://static-00.iconduck.com/assets.00/avatar-default-symbolic-icon-2048x1949-pq9uiebg.png"
                                    class="img-fluid"
                                />
                            </div>
                        </div>
                        <div class="employee-info px-3 py-0 flex-grow-1">
                            <div class="d-flex justify-content-between align-items-start mt-2">
                                <h5 class="card-title">{{ staff.hoTen }}</h5>
                                <span class="status-indicator"></span>
                            </div>
                            <p v-if="staff.maChucVu" class="card-subtitle">
                                {{ staff.tenChucVu }}
                            </p>
                            <p class="card-text"><i class="bi bi-envelope"></i> {{ staff.tenBoPhan }}</p>
                            <p v-if="staff.dienThoai" class="card-text">
                                <i class="bi bi-telephone"></i> {{ staff.dienThoai }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Phân Trang -->
        <div class="pagination d-flex justify-content-center align-items-center mt-3">
            <button
                class="btn btn-secondary rounded-0 mx-1"
                :disabled="currentPage === 1"
                @click="goToPage(currentPage - 1)"
            >
                <span class="material-symbols-outlined">keyboard_double_arrow_left</span>
            </button>
            <span>Trang {{ currentPage }} / {{ totalPages }}</span>
            <button
                class="btn btn-secondary rounded-0 mx-1"
                :disabled="currentPage === totalPages"
                @click="goToPage(currentPage + 1)"
            >
                <span class="material-symbols-outlined">keyboard_double_arrow_right</span>
            </button>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    listStaff: {
        type: Array,
        required: true,
    },
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
        default: 10,
    },
})

const filteredStaffs = computed(() => {
    if (!props.searchQuery) return props.listStaff
    return props.listStaff.filter((staff) => staff.hoTen.toLowerCase().includes(props.searchQuery.toLowerCase()))
})

const paginatedStaffs = computed(() => {
    const start = (props.currentPage - 1) * props.pageSize
    const end = start + props.pageSize
    return filteredStaffs.value.slice(start, end)
})

const totalPages = computed(() => {
    return Math.ceil(filteredStaffs.value.length / props.pageSize)
})

const emit = defineEmits(['updatePage'])
const goToPage = (page) => {
    emit('updatePage', page)
}
</script>

<style scoped>
.card {
    border: 1px solid #e0e0e0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    max-height: 100px;
}

.employee-avatar {
    width: 100px;
    height: 100px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
}

.employee-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.letter-avatar {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    font-weight: bold;
    color: white;
}

.employee-info {
    min-width: 0;
}

.card-title {
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 0.25rem;
}

.card-subtitle {
    font-size: 0.875rem;
    color: #6c757d;
}

.card-text {
    font-size: 0.875rem;
    margin-bottom: 0.25rem;
}

.status-indicator {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: inline-block;
}

.status-indicator.active {
    background-color: #ffc107;
}

.status-indicator.inactive {
    background-color: #6c757d;
}

.badge {
    font-weight: normal;
    font-size: 0.75rem;
    padding: 0.25em 0.5em;
    border-radius: 1rem;
}
</style>
