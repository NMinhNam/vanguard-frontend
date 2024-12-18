<template>
    <div class="container-fluid m-0">
        <div class="row">
            <div class="col-12 col-md-4">
                <div class="card boder-left-1 shadow-sm">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                            <h5 class="card-title fw-bold">Tổng nhân viên</h5>
                        </div>
                        <div class="d-flex align-items-center mb-2 ms-2">
                            <h3 class="mb-0 fw-bold">{{ tongNhanVien }}</h3>
                        </div>
                        <div>
                            <p class="text-muted mb-0">Tháng trước: 0</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-12 col-md-4">
                <div class="card boder-left-2 shadow-sm">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                            <h5 class="card-title fw-bold">Tổng phòng ban</h5>
                        </div>
                        <div class="d-flex align-items-center mb-2 ms-2">
                            <h3 class="mb-0 fw-bold">{{ tongPhongBan }}</h3>
                        </div>
                        <div>
                            <p class="text-muted mb-0">Tháng trước: 0</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-12 col-md-4">
                <div class="card boder-left-3 shadow-sm">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                            <h5 class="card-title fw-bold">Nhân viên mới</h5>
                        </div>
                        <div class="d-flex align-items-center mb-2 ms-2">
                            <h3 class="mb-0 fw-bold">{{ nhanVienMoi }}</h3>
                        </div>
                        <div>
                            <p class="text-muted mb-0">Tháng trước: 0</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { get } from '@/stores/https'
import { ref, onMounted } from 'vue'

const tongNhanVien = ref(0)
const tongPhongBan = ref(0)
const nhanVienMoi = ref(0)

onMounted(async () => {
    await getTongNhanVien()
    await getTongPhongBan()
    await getNhanVienMoi()
})

const getTongNhanVien = async () => {
    const response = await get('/api/v1/statistic/employees')
    tongNhanVien.value = response.data
}
const getTongPhongBan = async () => {
    const response = await get('/api/v1/statistic/departments')
    tongPhongBan.value = response.data
}
const getNhanVienMoi = async () => {
    const response = await get('/api/v1/statistic/new-hires')
    nhanVienMoi.value = response.data.length
}
</script>

<style scoped>
.boder-left-1 {
    border-left: 5px solid #007bff;
}

.boder-left-2 {
    border-left: 5px solid #5db996;
}

.boder-left-3 {
    border-left: 5px solid #fcc737;
}
</style>
