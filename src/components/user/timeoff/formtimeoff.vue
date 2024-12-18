<template>
    <div class="wrapper card">
        <div class="border-bottom border-2">
            <h4>{{ $t('create_onleave.title') }}</h4>
        </div>
        <div class="py-2">
            <div class="row py-2">
                <div class="col-md-6">
                    <label for="hoTen" class="form-label">{{ $t('create_onleave.items.full_name') }}</label>
                    <input
                        type="text"
                        id="hoTen"
                        class="bg-light form-control disabled"
                        v-model="data.hoTen"
                        disabled
                    />
                </div>
                <div class="col-md-6 pt-md-0 pt-3">
                    <label for="maNhanVien" class="form-label disabled">{{
                        $t('create_onleave.items.employee_id')
                    }}</label>
                    <input
                        type="text"
                        id="maNhanVien"
                        class="bg-light form-control"
                        v-model="formData.maNhanVien"
                        disabled
                    />
                </div>
            </div>
            <div class="row py-2">
                <div class="col-md-6">
                    <label for="chucVu" class="form-label">{{ $t('create_onleave.items.position') }}</label>
                    <input
                        type="text"
                        id="chucVu"
                        class="bg-light form-control disabled"
                        v-model="data.tenChucVu"
                        disabled
                    />
                </div>
                <div class="col-md-6 pt-md-0 pt-3">
                    <label for="phongBan" class="form-label disabled">{{
                        $t('create_onleave.items.department')
                    }}</label>
                    <input
                        type="text"
                        id="phongBan"
                        class="bg-light form-control"
                        v-model="data.tenPhongBan"
                        disabled
                    />
                </div>
            </div>
            <div class="row py-2">
                <div class="col-md-6">
                    <label for="lydo" class="form-label">{{ $t('create_onleave.items.reason') }}</label>
                    <select
                        class="form-select"
                        id="lydo"
                        v-model="formData.loaiDon"
                        :class="{ 'is-invalid': error.loaiDon }"
                    >
                        <option selected disabled>Chọn loại nghỉ phép</option>
                        <option v-if="nghiPhepNam > 0">Nghỉ phép năm</option>
                        <option>Nghỉ ốm</option>
                        <option>Nghỉ thai sản</option>
                        <option>Nghỉ không lương</option>
                        <option>Khác</option>
                    </select>
                    <div class="invalid-feedback">
                        {{ $t('create_onleave.validate.reason') }}
                    </div>
                </div>
                <div class="col-md-6 d-flex align-items-end">
                    <span class="p-2">Số ngày nghỉ phép năm còn: {{ nghiPhepNam }} ngày</span>
                </div>
            </div>
            <div class="row py-2">
                <div class="col-md-6">
                    <label for="batdau" class="form-label">{{ $t('create_onleave.items.from_day') }}</label>
                    <input
                        type="date"
                        v-model="formData.ngayBatDau"
                        id="batdau"
                        class="bg-active form-control"
                        :class="{ 'is-invalid': error.ngayBatDau }"
                    />
                    <div class="invalid-feedback">
                        {{ $t('create_onleave.validate.from_day') }}
                    </div>
                </div>
                <div class="col-md-6 pt-md-0 pt-3">
                    <label for="ketthuc" class="form-label">{{ $t('create_onleave.items.to_day') }}</label>
                    <input
                        type="date"
                        v-model="formData.ngayKetThuc"
                        id="ketthuc"
                        class="bg-active form-control"
                        :class="{ 'is-invalid': error.ngayKetThuc }"
                    />
                    <div class="invalid-feedback">
                        {{ $t('create_onleave.validate.to_day') }}
                    </div>
                </div>
            </div>
            <div class="row py-2">
                <div class="col-md-12">
                    <label for="ghichu" class="form-label">{{ $t('create_onleave.items.note') }}</label>
                    <textarea
                        type="text"
                        id="phone"
                        rows="5"
                        class="bg-active form-control"
                        v-model="formData.moTa"
                    ></textarea>
                </div>
            </div>
            <div class="py-3 pb-4 border-bottom text-center">
                <button class="btn btn-primary me-3" @click.prevent="btnCreateDonYeuCau_click">
                    {{ $t('create_onleave.buttons.send') }}
                </button>
                <router-link :to="{ path: `/${role}/timeoff` }">
                    <button class="btn btn-outline-secondary">{{ $t('create_onleave.buttons.back') }}</button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<style scoped>
.wrapper {
    padding: 30px 50px;
    border: 1px solid #ddd;
    border-radius: 15px;
    margin: 10px auto;
    max-width: 900px;
}

textarea {
    height: 100px;
}
</style>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { post, get } from '@/stores/https'
import { useValidation } from '@/stores/mixin/validate_form'
import { useI18n } from 'vue-i18n'
const role = sessionStorage.getItem('role').toLowerCase()

const { t, locale } = useI18n()

const data = ref({})
const nghiPhepNam = ref('')

const getNghiPhepNam = async () => {
    const response = await get(`/api/v1/annual-leave/employee/${sessionStorage.getItem('maNhanVien')}`)
    nghiPhepNam.value = response.data.tongSoNgayPhepCon
    console.log(nghiPhepNam.value)
}

const formData = reactive({
    maNhanVien: '',
    loaiDon: '',
    ngayBatDau: '',
    ngayKetThuc: '',
    moTa: '',
})

//Lấy thông tin nhân viên
const loadInfoUser = async () => {
    try {
        const response = await get(`/api/v1/employees/${sessionStorage.getItem('maNhanVien')}`)
        data.value = {
            hoTen: response.data.hoTen,
            maNhanVien: response.data.maNhanVien,
            tenChucVu: response.data.tenChucVu,
            tenBoPhan: response.data.tenBoPhan,
            tenPhongBan: response.data.tenPhongBan,
        }
        formData.maNhanVien = data.value.maNhanVien
    } catch (error) {
        await Swal.fire({
            title: t('create_onleave.error.title'),
            text: t('create_onleave.error.text'),
            icon: 'error',
            timer: 1500,
        })
        console.log(error)
    }
}

//Tạo đơn yêu cầu
const btnCreateDonYeuCau_click = async () => {
    if (!validate()) {
        await Swal.fire({
            title: t('create_onleave.validate.error'),
            text: 'Error',
            icon: 'error',
            timer: 1500,
        })
        return
    }

    try {
        const response = await post('/api/v1/don-yeu-cau', formData)

        if (response.success) {
            await Swal.fire({
                title: t('create_onleave.create_request.success.title'),
                text: t('create_onleave.create_request.success.text'),
                icon: 'success',
                timer: 1500,
            })
        } else {
            await Swal.fire({
                title: t('create_onleave.create_request.fail.title'),
                text: t('create_onleave.create_request.fail.text'),
                icon: 'error',
                timer: 1500,
            })
        }
    } catch (error) {
        await Swal.fire({
            title: t('create_onleave.error.title'),
            text: t('create_onleave.error.text'),
            icon: 'error',
            timer: 1500,
        })
    }
}

const { validateForm } = useValidation()

const error = reactive({
    loaiDon: '',
    ngayBatDau: '',
    ngayKetThuc: '',
})

const validate = () => {
    const formRule = {
        loaiDon: {
            required: true,
        },
        ngayBatDau: {
            required: true,
            compareDate: `>= ${new Date().toISOString().split('T')[0]}`,
        },
        ngayKetThuc: {
            required: true,
            compareDate: `>= ${formData.ngayBatDau}`,
        },
    }
    const validationData = {
        loaiDon: formData.loaiDon,
        ngayBatDau: formData.ngayBatDau,
        ngayKetThuc: formData.ngayKetThuc,
    }
    Object.assign(error, validateForm(formRule, validationData))
    for (let key in error) {
        if (error[key] !== false) return false
    }
    return true
}

onMounted(async () => {
    await loadInfoUser()
    await getNghiPhepNam()
})
</script>
