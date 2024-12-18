<template>
    <div class="p-0">
        <div class="row row-cols-1 row-cols-md-3 g-4 p-0">
            <div
                v-for="(Contract, index) in listContract"
                :key="Contract.soHopDong || index"
                @click="$router.push(`/admin/contract/${Contract.soHopDong}`)"
                style="cursor: pointer"
            >
                <div class="card h-100 p-0">
                    <div class="card-body d-flex p-0">
                        <div class="recruitment-avatar">
                            <img
                                v-if="Contract.logo"
                                :src="Contract.logo"
                                :alt="Contract.soHopDong"
                                class="img-fluid"
                            />
                            <div v-else>
                                <img
                                    src="https://static-00.iconduck.com/assets.00/avatar-default-symbolic-icon-2048x1949-pq9uiebg.png"
                                    class="img-fluid"
                                />
                            </div>
                        </div>
                        <div class="recruitment-info px-3 py-0 flex-grow-1">
                            <div class="d-flex justify-content-between align-items-start mt-2">
                                <h5 class="card-title">{{ getTenNhanVien(Contract.maNhanVien) }}</h5>
                            </div>
                            <p class="card-text">
                                <i class="bi bi-people"></i> {{ t('contract.table.salary') }}: {{ Contract.luongCoBan }}
                            </p>
                            <p class="card-text">
                                <i class="bi bi-people"></i> {{ t('contract.table.start_day') }}:
                                {{ Contract.ngayBatDau }}
                            </p>
                            <p class="card-text">
                                <i class="bi bi-people"></i> {{ t('contract.table.end_day') }}:
                                {{ Contract.ngayKetThuc }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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

const getStatusClass = (status) => {
    switch (status) {
        case 'active':
            return 'active'
        case 'inactive':
            return 'inactive'
        default:
            return ''
    }
}
const getNhanVien = async () => {
    try {
        const response = await get('/api/v1/employees') // URL API danh sách nhân viên
        listNhanVien.value = response.data
    } catch (error) {
        console.error('Lỗi khi fetch danh sách nhân viên:', error)
    }
}

onMounted(() => {
    getNhanVien() // Lấy dữ liệu ngay khi component được mount
})
const getTenNhanVien = (maNhanVien) => {
    const nhanVien = listNhanVien.value.find((nv) => nv.maNhanVien === maNhanVien)
    return nhanVien ? nhanVien.hoTen : 'Không xác định' // Trả về tên hoặc giá trị mặc định
}
</script>

<style scoped>
.card {
    border: 1px solid #e0e0e0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    max-height: 200px;
}

.recruitment-avatar {
    width: 100px;
    height: 100px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
}

.recruitment-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.recruitment-info {
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
