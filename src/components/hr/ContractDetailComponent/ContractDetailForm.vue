<template>
    <div class="card custom-card border-0">
        <div class="row">
            <div class="col-md-6">
                <label for="tenNhanVien" class="col-sm-4 col-form-label">{{ t('contract.detail.fullname') }}</label>
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
            <h5 class="section-title">{{ t('contract.detail.contract_information') }}</h5>
            <div class="row mb-3">
                <label for="noiDung" class="col-sm-4 col-form-label">{{ t('contract.detail.content') }}</label>
                <div class="col-sm-8">
                    <textarea
                        :class="{ 'is-invalid': error.noiDung }"
                        id="noiDung"
                        class="form-control"
                        v-model="Contract.noiDung"
                        placeholder="Nhập nội dung hợp đồng"
                    ></textarea>
                    <div class="invalid-feedback" v-if="error.noiDung">Nội dung không được để trống</div>
                </div>
            </div>

            <div class="row mb-3">
                <label for="ngayBatDau" class="col-sm-4 col-form-label">{{ t('contract.table.start_day') }}</label>
                <div class="col-sm-8">
                    <input
                        :class="{ 'is-invalid': error.ngayBatDau }"
                        type="date"
                        id="ngayBatDau"
                        class="form-control"
                        v-model="Contract.ngayBatDau"
                    />
                    <div class="invalid-feedback" v-if="error.ngayBatDau">Ngày bắt đầu không được để trống</div>
                    <input type="date" id="ngayBatDau" class="form-control" v-model="Contract.ngayBatDau" />
                </div>
            </div>

            <div class="row mb-3">
                <label for="ngayKetThuc" class="col-sm-4 col-form-label">{{ t('contract.table.end_day') }}</label>
                <div class="col-sm-8">
                    <input type="date" id="ngayKetThuc" class="form-control" v-model="Contract.ngayKetThuc" />
                </div>
            </div>
            <div class="row mb-3">
                <label for="thoiHan" class="col-sm-4 col-form-label">Thời hạn</label>
                <div class="col-sm-8 d-flex align-items-center">
                    <input
                        :class="{ 'is-invalid': error.thoiHan }"
                        type="text"
                        id="thoiHan"
                        class="form-control me-2"
                        v-model="Contract.thoiHan"
                    />
                    <div class="invalid-feedback" v-if="error.thoiHan">
                        Thời hạn phải được nhập và phải là số nguyên
                    </div>
                    <span class="input-group-text">Năm</span>
                    <label for="luongCoBan" class="col-sm-4 col-form-label">{{ t('contract.table.salary') }}</label>
                    <div class="col-sm-8">
                        <input type="text" id="luongCoBan" class="form-control" v-model="Contract.luongCoBan" />
                    </div>
                </div>
            </div>

            <div class="col-md-6">
                <h5 class="section-title">{{ t('contract.detail.additional_information') }}</h5>
                <div class="row mb-3">
                    <label for="ngayKy" class="col-sm-4 col-form-label">{{ t('contract.detail.date_signed') }}</label>
                    <div class="col-sm-8">
                        <input
                            :class="{ 'is-invalid': error.ngayKy }"
                            type="date"
                            id="ngayKy"
                            class="form-control"
                            v-model="Contract.ngayKy"
                        />
                        <div class="invalid-feedback" v-if="error.ngayKy">Ngày ký không được để trống</div>
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="ngayKetThuc" class="col-sm-4 col-form-label">Ngày kết thúc</label>
                    <div class="col-sm-8">
                        <input
                            :class="{ 'is-invalid': error.ngayKetThuc }"
                            type="date"
                            id="ngayKetThuc"
                            class="form-control"
                            v-model="Contract.ngayKetThuc"
                        />
                        <div class="invalid-feedback" v-if="error.ngayKetThuc">Ngày kết thúc không được để trống</div>
                        <label for="thoiHan" class="col-sm-4 col-form-label">{{
                            t('contract.detail.contract_term')
                        }}</label>
                        <div class="col-sm-8 d-flex align-items-center">
                            <input type="text" id="thoiHan" class="form-control me-2" v-model="Contract.thoiHan" />
                            <span class="input-group-text">{{ t('contract.detail.year') }}</span>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="luongCoBan" class="col-sm-4 col-form-label">Lương cơ bản</label>
                        <label for="heSoLuong" class="col-sm-4 col-form-label">{{
                            t('contract.detail.salary_coefficient')
                        }}</label>
                        <div class="col-sm-8">
                            <input
                                :class="{ 'is-invalid': error.luongCoBan }"
                                type="text"
                                id="luongCoBan"
                                class="form-control"
                                v-model="Contract.luongCoBan"
                            />
                            <div class="invalid-feedback" v-if="error.luongCoBan">
                                Lương cơ bản không được để trống và phải là số
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { get } from '@/stores/https'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const props = defineProps({
    Contract: Object,
    error: Object,
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
