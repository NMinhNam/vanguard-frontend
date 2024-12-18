<template>
    <div class="d-flex">
        <!-- Main Content -->
        <div class="container py-4 flex-grow-1">
            <!-- Header -->
            <div class="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <input
                        type="text"
                        class="form-control fs-5 border-0"
                        v-model="ungVien.hoTen"
                        placeholder="Tên ứng viên"
                        :class="{ 'is-invalid': error.hoTen }"
                    />
                    <div v-if="error.hoTen" class="invalid-feedback">Vui lòng nhập họ tên ứng viên!</div>
                </div>

                <div class="d-flex align-items-center gap-4">
                    <div class="d-flex align-items-center">
                        <img
                            src="https://photo.znews.vn/w660/Uploaded/mdf_eioxrd/2021_07_06/2.jpg"
                            alt="Profile"
                            style="width: 200px"
                        />
                    </div>
                </div>
            </div>

            <!-- Contract Time -->
            <div class="card mb-4">
                <div class="card-body">
                    <h4 class="card-title mb-4">Thông tin ứng viên</h4>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label class="form-label">Giới tính</label>
                                <br />
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
                                    <input
                                        v-model="ungVien.gioiTinh"
                                        class="form-check-input"
                                        type="radio"
                                        name="gioiTinh"
                                        id="nu"
                                        :value="false"
                                    />
                                    <label class="form-check-label" for="nu">Nữ</label>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label class="form-label">Ngày sinh</label>
                                <input
                                    type="date"
                                    class="form-control"
                                    v-model="ungVien.ngaySinh"
                                    :class="{ 'is-invalid': error.ngaySinh }"
                                />
                                <div v-if="error.ngaySinh" class="invalid-feedback">Vui lòng nhập ngày sinh</div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label class="form-label">Điện thoại</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    v-model="ungVien.dienThoai"
                                    :class="{ 'is-invalid': error.dienThoai }"
                                />
                                <div v-if="error.dienThoai" class="invalid-feedback">Số điện thoại sai định dạng!</div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label class="form-label">Email</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    v-model="ungVien.email"
                                    :class="{ 'is-invalid': error.email }"
                                />
                                <div v-if="error.email" class="invalid-feedback">Email sai định dạng</div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label class="form-label">Căn cước</label>
                                <input type="text" class="form-control" v-model="ungVien.cccd" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label class="form-label">Vị trí tuyển dụng</label>
                                <select
                                    id="viTriSelect"
                                    class="form-select"
                                    v-model="ungVien.maViTriTuyenDung"
                                    :class="{ 'is-invalid': error.maViTriTuyenDung }"
                                >
                                    <option value="">Chọn vị trí</option>
                                    <option
                                        v-for="viTriTuyenDung in listViTriTuyenDung"
                                        :key="viTriTuyenDung.maViTriTuyenDung"
                                        :value="viTriTuyenDung.maViTriTuyenDung"
                                    >
                                        {{ viTriTuyenDung.tenViTri }}
                                    </option>
                                </select>
                                <div v-if="error.maViTriTuyenDung" class="invalid-feedback">
                                    Vui lòng chọn vị trí ứng tuyển!
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="mb-3">
                                <label class="form-label" for="diaChi">Địa chỉ</label>
                                <br />
                                <textarea
                                    v-model="ungVien.diaChi"
                                    name="diaChi"
                                    class="form-control"
                                    id="diaChi"
                                    cols="120"
                                    rows="5"
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="sidebar bg-white border-start p-4" style="width: 400px">
            <div class="d-grid gap-2">
                <div class="d-flex flex-column gap-2 mt-2">
                    <button class="btn btn-outline-danger d-flex align-items-center gap-2">
                        <span class="material-symbols-outlined"> download </span> Download
                    </button>
                    <button class="btn btn-outline-secondary d-flex align-items-center gap-2" @click="clearForm()">
                        <span class="material-symbols-outlined"> mop </span> Clear
                    </button>
                    <button class="btn btn-outline-success d-flex align-items-center gap-2" @click="saveUngVien()">
                        <span class="material-symbols-outlined"> download_done </span>Ứng tuyển
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { get, post } from '@/stores/https'
import { useValidation } from '@/stores/mixin/validate_form'

const { validateForm } = useValidation()
const listViTriTuyenDung = ref([])

onMounted(async () => {
    await getAllViTri()
})

const ungVien = reactive({
    hoTen: '',
    gioiTinh: true,
    ngaySinh: '',
    dienThoai: '',
    cccd: '',
    diaChi: '',
    hinhAnh: '',
    email: '',
    maViTriTuyenDung: '',
})

const error = reactive({
    hoTen: '',
    dienThoai: '',
    email: '',
    maViTriTuyenDung: '',
    ngaySinh: '',
})

const validate = () => {
    const formRule = {
        hoTen: { required: true },
        dienThoai: { pattern: /^[0-9]{10}$/ },
        email: { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ },
        maViTriTuyenDung: { required: true },
        ngaySinh: { required: true },
    }

    Object.assign(error, validateForm(formRule, ungVien))
    for (let key in error) {
        if (error[key] !== false) return false
    }
    return true
}

const clearForm = () => {
    ungVien.hoTen = ''
    ungVien.gioiTinh = true
    ungVien.ngaySinh = ''
    ungVien.dienThoai = ''
    ungVien.cccd = ''
    ungVien.diaChi = ''
    ungVien.hinhAnh = ''
    ungVien.email = ''
    ungVien.maViTriTuyenDung = ''
}

const getAllViTri = async () => {
    const response = await get('/api/v1/recruitment-positions')
    listViTriTuyenDung.value = response.data
}

const saveUngVien = async () => {
    if (!validate()) {
        Swal.fire({
            title: 'Sai định dạng',
            text: 'Thông tin sai định dạng',
            icon: 'error',
            timer: 1500,
        })
        return
    }
    try {
        const response = await post('/api/v1/ung-candidates', ungVien)
        if (response.success) {
            Swal.fire({
                title: 'Ứng tuyển',
                text: 'Ứng tuyển thành công',
                icon: 'success',
                timer: 1500,
            })
        }
    } catch (error) {
        Swal.fire({
            title: 'Ứng tuyển',
            text: 'Ứng tuyển thất bại',
            icon: 'error',
            timer: 1500,
        })
        // console.error(error)
    }
}
</script>

<style scoped>
.card {
    border-radius: 8px;
    border: none;
}

.form-control {
    border-radius: 6px;
}

.badge {
    padding: 8px 12px;
    border-radius: 6px;
}

.sidebar {
    position: sticky;
    top: 0;
    height: 100vh;
    overflow-y: auto;
}

.btn {
    padding: 0.5rem 1rem;
    border-radius: 6px;
}

.btn-success {
    background-color: #0c8b5c;
    border-color: #0c8b5c;
}

.btn-success:hover {
    background-color: #0a7a4e;
    border-color: #0a7a4e;
}
</style>
