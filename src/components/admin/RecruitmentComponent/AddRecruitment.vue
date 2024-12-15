<template>
    <div class="container-fluid">
        <div class="d-flex align-items-center mb-2">
            <label for="viTriTuyenDUng" class="form-label me-2 text-nowrap label-width">Vị trí tuyển dụng</label>
            <input
                v-model="info.tenViTri"
                type="text"
                class="form-control"
                id="viTriTuyenDUng"
                placeholder="Vị trí tuyển dụng"
            />
        </div>

        <div class="row">
            <div class="d-flex align-items-center mb-2">
                <label for="phongBanSelect" class="form-label me-2 text-nowrap label-width">Tên phòng ban</label>
                <div class="w-100">
                    <select id="phongBanSelect" class="form-select" v-model="info.maPhongBan">
                        <option value="">Chọn phòng ban</option>
                        <option
                            v-for="phongBan in listPhongBan"
                            :key="phongBan.maPhongBan"
                            :value="phongBan.maPhongBan"
                        >
                            {{ phongBan.tenPhongBan }}
                        </option>
                    </select>
                </div>
            </div>

            <div class="row mb-3">
                <div class="d-flex align-items-center">
                    <label class="form-label me-2 text-nowrap label-width">Số lượng tuyển</label>
                    <input
                        v-model="info.soLuongTuyen"
                        type="text"
                        class="form-control"
                        id="soLuongTuyen"
                        placeholder="Số lượng tuyển"
                    />
                </div>
            </div>

            <div class="row mb-3">
                <div class="d-flex align-items-center">
                    <label class="form-label me-2 text-nowrap label-width">Mô tả</label>
                    <input v-model="info.moTa" type="text" class="form-control" id="moTa" placeholder="Mô tả" />
                </div>
            </div>

            <div class="row mb-3">
                <div class="d-flex align-items-center">
                    <label class="form-label me-2 text-nowrap label-width">Yêu cầu</label>
                    <input v-model="info.yeuCau" type="text" class="form-control" id="yeuCau" placeholder="Yêu cầu" />
                </div>
            </div>

            <div class="d-flex justify-content-end">
                <button class="btn btn-success" @click="saveRecruitment()">Save</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue'
import { get, post } from '@/stores/https'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const listPhongBan = ref([])

const info = reactive({
    tenViTri: '',
    soLuongTuyen: '',
    maPhongBan: '',
    trangThai: true,
    moTa: '',
    yeuCau: '',
})

onMounted(async () => {
    await getAllPhongBan()
})

const getAllPhongBan = async () => {
    const response = await get('/api/v1/departments')
    listPhongBan.value = response.data
}

const saveRecruitment = async () => {
    try {
        const response = await post('/api/v1/recruitment-positions', info)
        if (response) {
            Swal.fire({
                title: 'Thành công',
                text: 'Thêm vị trí tuyển dụng thành công',
                icon: 'success',
                timer: 1500,
            })
        }
    } catch (error) {
        Swal.fire({
            title: 'Thất bại',
            text: 'Thêm vị trí tuyển dụng thất bại',
            icon: 'error',
            timer: 1500,
        })
        console.error(error)
    }
}
</script>

<style>
.container-fluid {
    padding: 20px;
}

.label-width {
    width: 12rem;
}

.row {
    margin-top: 1rem;
}

.form-label {
    font-weight: 600;
    font-size: 0.95rem;
}

.form-control,
.form-select {
    border-radius: 0.375rem;
    height: 2.5rem;
    font-size: 0.875rem;
    padding-left: 1rem;
}

button.btn {
    padding: 0.75rem 2rem;
    font-size: 1rem;
    font-weight: bold;
}

button.btn-success {
    background-color: #28a745;
    border: none;
    color: white;
}

button.btn-success:hover {
    background-color: cornflowerblue;
}

button.btn-success:disabled {
    background-color: #6c757d;
}
</style>
