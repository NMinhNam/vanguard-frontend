<template>
    <div class="card custom-card border-0">
        <div class="row">
            <div class="col-md-6">
                <label for="tenNhanVien" class="col-sm-4 col-form-label">Họ và tên</label>
                <input
                    type="text"
                    id="tenNhanVien"
                    class="form-control"
                    :value="getTenNhanVien(Contract.maNhanVien)"
                    readonly
                />
            </div>
        </div>
    </div>

    <div class="row mt-4">
        <div class="col-md-6">
            <h5 class="section-title">Thông tin hợp đồng</h5>
            <div class="row mb-3">
                <label for="noiDung" class="col-sm-4 col-form-label">Nội dung</label>
                <div class="col-sm-8">
                    <textarea
                        id="noiDung"
                        class="form-control"
                        v-model="Contract.noiDung"
                        placeholder="Nhập nội dung hợp đồng"
                        
                    ></textarea>
                </div>
            </div>

            <div class="row mb-3">
                <label for="ngayBatDau" class="col-sm-4 col-form-label">Ngày bắt đầu</label>
                <div class="col-sm-8">
                    <input type="date" id="ngayBatDau" class="form-control" v-model="Contract.ngayBatDau"  />
                </div>
            </div>

            <div class="row mb-3">
                <label for="ngayKetThuc" class="col-sm-4 col-form-label">Ngày kết thúc</label>
                <div class="col-sm-8">
                    <input type="date" id="ngayKetThuc" class="form-control" v-model="Contract.ngayKetThuc"  />
                </div>
            </div>
            <div class="row mb-3">
                <label for="luongCoBan" class="col-sm-4 col-form-label">Lương cơ bản</label>
                <div class="col-sm-8">
                    <input type="text" id="luongCoBan" class="form-control" v-model="Contract.luongCoBan"  />
                </div>
            </div>
        </div>

        <div class="col-md-6">
            <h5 class="section-title">Thông tin bổ sung</h5>
            <div class="row mb-3">
                <label for="ngayKy" class="col-sm-4 col-form-label">Ngày ký</label>
                <div class="col-sm-8">
                    <input type="date" id="ngayKy" class="form-control" v-model="Contract.ngayKy"  />
                </div>
            </div>
            <div class="row mb-3">
                <label for="thoiHan" class="col-sm-4 col-form-label">Thời hạn</label>
                <div class="col-sm-8 d-flex align-items-center">
                    <input type="text" id="thoiHan" class="form-control me-2" v-model="Contract.thoiHan"  />
                    <span class="input-group-text">Năm</span>
                </div>
            </div>
            <div class="row mb-3">
                <label for="heSoLuong" class="col-sm-4 col-form-label">Hệ số lương</label>
                <div class="col-sm-8">
                    <input type="text" id="heSoLuong" class="form-control" v-model="Contract.heSoLuong"  />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { get } from '@/stores/https'

const props = defineProps({
    Contract: Object,
})
const listNhanVien = ref([])
const nhanVien = ref({})

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
    const cccd = sessionStorage.getItem('cccdStaff')
    if (cccd) {
        const response = await get(`/api/v1/employees/cccd/${cccd}`)
        nhanVien.value = response.data
        props.Contract.maNhanVien = nhanVien.value.maNhanVien
    }
    console.log(nhanVien.value)
})

onUnmounted(() => {
    sessionStorage.removeItem('cccdStaff')
})

const getTenNhanVien = (maNhanVien) => {
    const nhanVien = listNhanVien.value.find((nv) => nv.maNhanVien === maNhanVien)
    return nhanVien ? nhanVien.hoTen : 'Không xác định' // Trả về tên hoặc giá trị mặc định
}
</script>

<style scoped>
/* Tab */
.tab-container {
    background-color: #f4f4f5 !important;
    border-radius: 0.75rem !important;
    padding: 4px !important;
    min-width: fit-content !important;
}

.tab-button {
    padding: 4px 10px !important;
    border: none !important;
    background-color: transparent !important;
    color: #52525b !important;
    cursor: pointer !important;
    transition: all 0.2s ease !important;
    border-radius: calc(0.75rem - 2px) !important;
    font-size: 0.875rem !important;
}

.tab-button.active {
    background-color: #fff !important;
    color: #000 !important;
    --tw-ring-offset-shadow: 0 0 #0000;
    --tw-ring-shadow: 0 0 #0000;
    --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow) !important;
}
</style>
