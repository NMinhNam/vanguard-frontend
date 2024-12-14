<template>
    <div class="p-4 border-0 border-bottom border-secondary-subtle">
        <div class="head-menu col-12 d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center">
                <button
                    @click="saveUngVien()"
                    type="submit"
                    class="btn btn-success w-100 fw-bold me-2"
                    :disabled="loading"
                    :class="{ loading: loading }"
                >
                    <span
                        v-if="loading"
                        class="spinner-border me-2 spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                    ></span>
                    <span v-if="!loading"><i class="fa-solid fa-download me-2"></i></span>Save
                </button>
                <h5 class="mb-0 me-2">Candidate</h5>
            </div>
            <div class="tab-container ms-auto" v-if="ungVien.maUngVien">
                <button
                    class="tab-button"
                    :class="{ active: ungVien.trangThai === 1 }"
                    :disabled="ungVien.trangThai === 1"
                >
                    Chờ duyệt
                </button>
                <button
                    @click="saveUngVien(2)"
                    class="tab-button"
                    :class="{ active: ungVien.trangThai === 2 }"
                    :disabled="ungVien.trangThai === 2"
                >
                    Phỏng vấn lần 1
                </button>
                <button
                    @click="saveUngVien(3)"
                    class="tab-button"
                    :class="{ active: ungVien.trangThai === 3 }"
                    :disabled="ungVien.trangThai === 3"
                >
                    Phỏng vấn lần 2
                </button>
                <button
                    @click="saveUngVien(4)"
                    class="tab-button"
                    :class="{ active: ungVien.trangThai === 4 }"
                    :disabled="ungVien.trangThai === 4"
                >
                    Đạt yêu cầu
                </button>
                <button
                    @click="saveUngVien(5)"
                    class="tab-button"
                    :class="{ active: ungVien.trangThai === 5 }"
                    :disabled="ungVien.trangThai === 5"
                >
                    Từ chối
                </button>
            </div>
        </div>
    </div>

    <div class="card custom-card border-0 p-4">
        <!-- Row chung: Họ và tên + Vị trí tuyển dụng -->
        <div class="row mb-3">
            <!-- Cột: Họ và tên -->
            <div class="col-md-6">
                <label for="hoTen" class="form-label">Họ và tên</label>
                <input type="text" id="hoTen" v-model="ungVien.hoTen" class="form-control" />
                <span class="text-danger" v-if="error.hoTen">{{ error.hoTen }}</span>
            </div>

            <!-- Cột: Vị trí tuyển dụng -->
            <div class="col-md-6">
                <label for="position" class="form-label">Vị trí tuyển dụng</label>
                <select id="position" class="form-select" v-model="ungVien.maViTriTuyenDung">
                    <option value="">Chọn vị trí tuyển dụng</option>
                    <option
                        v-for="viTri in listTuyenDung"
                        :key="viTri.maViTriTuyenDung"
                        :value="viTri.maViTriTuyenDung"
                    >
                        {{ viTri.tenViTri }}
                    </option>
                </select>
                <span class="text-danger" v-if="error.maViTriTuyenDung">{{ error.maViTriTuyenDung }}</span>
            </div>
        </div>
    </div>

    <div class="row mt-4">
        <div class="col-md-6">
            <h5 class="section-title">Thông tin cá nhân</h5>
            <div class="row mb-3">
                <label for="phone" class="col-sm-4 col-form-label">Số điện thoại</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" id="phone" v-model="ungVien.dienThoai" />
                    <span class="text-danger" v-if="error.dienThoai">{{ error.dienThoai }}</span>
                </div>
            </div>

            <div class="row mb-3">
                <label for="email" class="col-sm-4 col-form-label">Email</label>
                <div class="col-sm-8">
                    <input type="email" class="form-control" id="email" v-model="ungVien.email" />
                    <span class="text-danger" v-if="error.email">{{ error.email }}</span>
                </div>
            </div>

            <div class="row mb-3">
                <label for="cccd" class="col-sm-4 col-form-label">CCCD</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" id="cccd" v-model="ungVien.cccd" />
                    <span class="text-danger" v-if="error.cccd">{{ error.cccd }}</span>
                </div>
            </div>
        </div>

        <div class="col-md-6">
            <h5 class="section-title">Thông tin bổ sung</h5>
            <div class="row mb-3">
                <label for="address" class="col-sm-4 col-form-label">Địa chỉ</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" id="address" v-model="ungVien.diaChi" />
                </div>
            </div>

            <div class="row mb-3">
                <label for="dob" class="col-sm-4 col-form-label">Ngày sinh</label>
                <div class="col-sm-8">
                    <input type="date" class="form-control" id="dob" v-model="ungVien.ngaySinh" />
                </div>
            </div>

            <div class="row mb-3">
                <label for="gioiTinh" class="col-sm-4 col-form-label">Giới tính</label>
                <div class="col-sm-8">
                    <div class="form-check form-check-inline">
                        <input
                            class="form-check-input"
                            v-model="ungVien.gioiTinh"
                            type="radio"
                            name="gioiTinh"
                            id="nam"
                            :value="true"
                        />
                        <label class="form-check-label" for="nam">Nam</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="gioiTinh" id="nu" :value="false" />
                        <label class="form-check-label" for="nu">Nữ</label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import router from '@/router'
import { ref, onMounted, reactive } from 'vue'
import { get, post } from '@/stores/https'
const loading = ref(false)
const ungVien = ref({})
const maUngVien = ref('')
const listTuyenDung = ref([])

const saveUngVien = async (trangThai) => {
    if (!validateUngVien()) return
    try {
        ungVien.value.trangThai = trangThai
        const response = await post('/api/v1/candidates', ungVien.value)
        if (response) {
            Swal.fire({
                title: 'Thành công',
                text: 'Cập nhật thông tin ứng viên thành công.',
                icon: 'success',
                timer: 1500,
            })
            if (ungVien.value.trangThai === 5) {
                router.go(-1)
            }
        }
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Cập nhật phê duyệt thất bại'
        Swal.fire({
            title: 'Thất bại',
            text: errorMessage,
            icon: 'error',
            timer: 1500,
        })
        console.error('Error in saveUngVien:', error)
    }
    await getInfoByMaUngVien(ungVien.maUngVien)
}

onMounted(async () => {
    maUngVien.value = router.currentRoute.value.params.id
    if (maUngVien.value) {
        ungVien.maUngVien = maUngVien.value
        await getInfoByMaUngVien(ungVien.maUngVien)
    }
})
const getInfoByMaUngVien = async (maUngVien) => {
    try {
        const response = await get('/api/v1/candidates/id', { maUngVien })
        if (response && response.data) {
            ungVien.value = response.data
            console.log(ungVien.value)
        }
    } catch (error) {
        Swal.fire({
            title: 'Thất bại',
            text: 'Không thể tải lên dữ liệu phê duyệt',
            icon: 'error',
            timer: 1500,
        })
        console.error(error)
    }
}
const getAllViTri = async () => {
    const response = await get('/api/v1/recruitment-positions')
    listTuyenDung.value = response.data
}

onMounted(async () => {
    await getAllViTri()
})
const error = reactive({
    hoTen: '',
    dienThoai: '',
    email: '',
    cccd: '',
    maViTriTuyenDung: '',
})

const validateUngVien = () => {
    const validationRules = {
        hoTen: { required: true, message: 'Họ và tên không được để trống.' },
        dienThoai: {
            pattern: /^[0-9]{10}$/,
            message: 'Số điện thoại phải gồm 10 chữ số.',
        },
        email: {
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: 'Email không đúng định dạng.',
        },
        cccd: {
            pattern: /^[0-9]{12}$/,
            message: 'CCCD phải đủ 12 số.',
        },
        maViTriTuyenDung: { required: true, message: 'Vui lòng chọn vị trí tuyển dụng.' },
    }

    let isValid = true
    Object.keys(validationRules).forEach((key) => {
        const rule = validationRules[key]
        const value = ungVien.value[key]
        if (rule.required && !value) {
            error[key] = rule.message
            isValid = false
        } else if (value && rule.pattern && !rule.pattern.test(value)) {
            error[key] = rule.message
            isValid = false
        } else {
            error[key] = ''
        }
    })
    return isValid
}
</script>

<style scoped>
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

.text-danger {
    color: red;
    font-size: 0.875rem;
}
</style>