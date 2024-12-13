<template>
    <div class="">
        <!-- Header Section -->
        <div class="mb-3 border-bottom text-center d-flex align-items-center justify-content-between px-2 fs-4 pb-3">
            <h4 class="float-start fw-medium">
                {{ $t('leave.title') }}
            </h4>
            <router-link :to="{ path: '/user/timeoff/newrequest' }">
                <div class="btn btn-add float-end">
                    {{ $t('leave.buttons.create') }}
                    <i class="fa-solid fa-plus"></i>
                </div>
            </router-link>
        </div>
        <!-- Main Content Section -->
        <div class="card-body">
            <div class="col-sm-12 row m-0">
                <div class="col-sm-3 px-2">
                    <label class="p-2 text-bg-secondary rounded-2 fw-bolder">{{ $t('leave.table.not_submitted')
                        }}</label>
                    <!-- Card Item with Modal Trigger -->
                    <div v-for="item in listChuaGui" :key="item.maDon" class="card p-2 my-2">
                        <div class="d-flex m-0 justify-content-between text-header" data-bs-toggle="modal"
                            data-bs-target="#timeOffModal" @click="openModal(item)">
                            <div class="fw-medium text-start">
                                <b>{{ $t('leave.table.request_id') }}: </b>
                                {{ item.maDon }}
                            </div>
                            <div class="fw-medium text-end text-secondary"> <i class="fa-solid fa-circle-dot"></i></div>
                        </div>
                        <div class="content my-2" data-bs-toggle="modal" data-bs-target="#timeOffModal"
                            @click="openModal(item)">
                            <label class="w-100">
                                <b>{{ $t('leave.table.reason') }}: </b>
                                {{ item.loaiDon }}
                            </label>
                            <div class="time_off col-sm-12 row m-0 my-2 gap-1 align-items-center">
                                <div class="col-sm-5 text-start p-0">
                                    {{ formatDate(item.ngayBatDau) }}
                                </div>
                                <i class="fa-solid fa-arrow-right col-sm-1"></i>
                                <div class="col-sm-5 text-end p-0">
                                    {{ formatDate(item.ngayKetThuc) }}
                                </div>
                            </div>
                        </div>
                        <!-- Modal Trigger Button -->
                        <div class="row col-sm-12 gap-2 m-0 justify-content-center">
                            <button type="button" class="btn btn-success col-sm-3" data-bs-toggle="modal"
                                data-bs-target="#timeOffModalDuyet" @click="openModal(item)">
                                <i class="fa-solid fa-paper-plane"></i>
                                {{ $t('leave.buttons.send') }}
                            </button>
                            <button type="button" class="btn btn-warning col-sm-3" data-bs-toggle="modal"
                                data-bs-target="#changeTimeOffModal" @click="openModal(item)">
                                <i class="fa-solid fa-pen-to-square"></i>
                                {{ $t('leave.buttons.edit') }}
                            </button>
                            <button type=" button" class="btn btn-danger col-sm-4"
                                @click="btnDeleteDonYeuCau_click(item.maDon)">
                                <i class="fa-solid fa-trash-can"></i>
                                {{ $t('leave.buttons.delete') }}
                            </button>
                        </div>
                    </div>
                </div>
                <div class="col-sm-3 px-2">
                    <label class="p-2 text-bg-primary  rounded-2 fw-bolder">{{ $t('leave.table.pending_approval')
                        }}</label>
                    <!-- Card Item with Modal Trigger -->
                    <div v-for="item in listChoDuyet" :key="item.maDon" class="card p-2 my-2">
                        <div class="d-flex m-0 justify-content-between text-header">
                            <div class="fw-medium text-start">
                                <b>{{ $t('leave.table.request_id') }}: </b>
                                {{ item.maDon }}
                            </div>
                            <div class="fw-medium text-end text-primary"> <i class="fa-solid fa-circle-dot"></i></div>
                        </div>
                        <div class="content my-2">
                            <label class="w-100">
                                <b>{{ $t('leave.table.reason') }}: </b>
                                {{ item.loaiDon }}
                            </label>
                            <div class="time_off col-sm-12 row m-0 my-2 gap-1 align-items-center">
                                <div class="col-sm-5 text-start p-0">
                                    {{ formatDate(item.ngayBatDau) }}
                                </div>
                                <i class="fa-solid fa-arrow-right col-sm-1"></i>
                                <div class="col-sm-5 text-end p-0">
                                    {{ formatDate(item.ngayKetThuc) }}
                                </div>
                            </div>
                        </div>
                        <!-- Modal Trigger Button -->
                        <div class="row col-sm-12 m-0 gap-2 justify-content-center">
                            <button type="button" class="btn btn-info col-sm-4" data-bs-toggle="modal"
                                data-bs-target="#timeOffModal" @click="openModal(item)">
                                <i class="fa-solid fa-eye"></i>
                                {{ $t('leave.buttons.view') }}
                            </button>
                            <button type="button" class="btn btn-danger col-sm-4"
                                @click="btnDeleteDonYeuCau_click(item.maDon)">
                                <i class="fa-solid fa-trash-can"></i>
                                {{ $t('leave.buttons.delete') }}
                            </button>
                        </div>
                    </div>
                </div>
                <div class="col-sm-3 px-2">
                    <label class="p-2 text-bg-success text-white rounded-2 fw-bolder">{{ $t('leave.table.approved')
                        }}</label>
                    <!-- Card Item with Modal Trigger -->
                    <div v-for="item in listDaDuyet" :key="item.maDon" class="card p-2 my-2">
                        <div class="d-flex m-0 justify-content-between text-header">
                            <div class="fw-medium text-start">
                                <b>{{ $t('leave.table.request_id') }}: </b>
                                {{ item.maDon }}
                            </div>
                            <div class="fw-medium text-end text-success"> <i class="fa-solid fa-circle-dot"></i></div>
                        </div>
                        <div class="content my-2">
                            <label class="w-100">
                                <b>{{ $t('leave.table.reason') }}: </b>
                                {{ item.loaiDon }}
                            </label>
                            <div class="time_off col-sm-12 row m-0 my-2 gap-1 align-items-center">
                                <div class="col-sm-5 text-start p-0">
                                    {{ formatDate(item.ngayBatDau) }}
                                </div>
                                <i class="fa-solid fa-arrow-right col-sm-1"></i>
                                <div class="col-sm-5 text-end p-0">
                                    {{ formatDate(item.ngayKetThuc) }}
                                </div>
                            </div>
                        </div>
                        <!-- Modal Trigger Button -->
                        <div class="row col-sm-12 m-0 gap-2 justify-content-center">
                            <button type="button" class="btn btn-info col-sm-4" data-bs-toggle="modal"
                                data-bs-target="#timeOffModal" @click="openModal(item)">
                                <i class="fa-solid fa-eye"></i>
                                {{ $t('leave.buttons.view') }}
                            </button>
                            <button type="button" class="btn btn-danger col-sm-4"
                                @click="btnDeleteDonYeuCau_click(item.maDon)">
                                <i class="fa-solid fa-trash-can"></i>
                                {{ $t('leave.buttons.delete') }}
                            </button>
                        </div>
                    </div>
                </div>
                <div class="col-sm-3 px-2">
                    <label class="p-2 text-bg-danger rounded-2 fw-bolder">{{ $t('leave.table.rejected') }}</label>
                    <!-- Card Item with Modal Trigger -->
                    <div v-for="item in listTuChoi" :key="item.maDon" class="card p-2 my-2">
                        <div class="d-flex m-0 justify-content-between text-header">
                            <div class="fw-medium text-start">
                                <b>{{ $t('leave.table.request_id') }}: </b>
                                {{ item.maDon }}
                            </div>
                            <div class="fw-medium text-end text-danger"> <i class="fa-solid fa-circle-dot"></i></div>
                        </div>
                        <div class="content my-2">
                            <label class="w-100">
                                <b>{{ $t('leave.table.reason') }}: </b>
                                {{ item.loaiDon }}
                            </label>
                            <div class="time_off col-sm-12 row m-0 my-2 gap-1 align-items-center">
                                <div class="col-sm-5 text-start p-0">
                                    {{ formatDate(item.ngayBatDau) }}
                                </div>
                                <i class="fa-solid fa-arrow-right col-sm-1"></i>
                                <div class="col-sm-5 text-end p-0">
                                    {{ formatDate(item.ngayKetThuc) }}
                                </div>
                            </div>
                        </div>
                        <!-- Modal Trigger Button -->
                        <div class="row col-sm-12 m-0 gap-2 justify-content-center">
                            <button type="button" class="btn btn-info col-sm-4" data-bs-toggle="modal"
                                data-bs-target="#timeOffModal" @click="openModal(item)">
                                <i class="fa-solid fa-eye"></i>
                                {{ $t('leave.buttons.view') }}
                            </button>
                            <button type="button" class="btn btn-danger col-sm-4"
                                @click="btnDeleteDonYeuCau_click(item.maDon)">
                                <i class="fa-solid fa-trash-can"></i>
                                {{ $t('leave.buttons.delete') }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Bootstrap Modal for Detailed Information -->
        <div class="modal fade" id="timeOffModal" tabindex="-1" aria-labelledby="timeOffModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content modal-fullscreen-md-down">
                    <div class="modal-header">
                        <h5 class="modal-title" id="timeOffModalLabel">{{ $t('create_onleave.modal_view') }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body m-0 row">
                        <!-- Reusable Card Structure Inside Modal -->
                        <div class="py-2 card card-body">
                            <div class="row py-2">
                                <div class="col-md-6">
                                    <label for="maNhanVien" class="form-label disabled">{{
                                        $t('create_onleave.items.employee_id') }}:</label>
                                    <input type="text" id="maNhanVien" class="bg-active form-control"
                                        :value="userInfo.maNhanVien" disabled>
                                </div>
                                <div class="col-md-6 pt-md-0 pt-3">
                                    <label for="hoTen" class="form-label">{{ $t('create_onleave.items.full_name')
                                        }}:</label>
                                    <input type="text" id="hoTen" class="bg-active form-control" :value="userInfo.hoTen"
                                        disabled>
                                </div>
                            </div>
                            <div class="row py-2">
                                <div class="col-md-6">
                                    <label for="chucVu" class="form-label">{{ $t('create_onleave.items.position')
                                        }}:</label>
                                    <input type="text" id="chucVu" class="bg-active form-control"
                                        :value="userInfo.tenChucVu" disabled>
                                </div>
                                <div class="col-md-6">
                                    <label for="phongBan" class="form-label disabled">{{
                                        $t('create_onleave.items.department') }}:</label>
                                    <input type="text" id="phongBan" class="bg-active form-control"
                                        :value="userInfo.tenPhongBan" disabled>
                                </div>
                            </div>
                            <div class="col-md-12 mb-2">
                                <label for="truongPhong" class="form-label">{{ $t('create_onleave.items.approver')
                                    }}:</label>
                                <input type="text" id="truongPhong" class="bg-active form-control" value="Phạm Hoàng Hà"
                                    disabled>
                            </div>
                            <div class="col-md-12 mb-2">
                                <label for="lydo" class="form-label">{{ $t('create_onleave.items.reason') }}:</label>
                                <input type="text" id="lydo" class="bg-active form-control"
                                    :value="selectedItem.loaiDon" disabled>
                            </div>
                            <div class="row py-2">
                                <div class="col-md-6">
                                    <label for="batdau" class="form-label">{{ $t('create_onleave.items.from_day')
                                        }}:</label>
                                    <input type="text" id="batdau" class="bg-active form-control"
                                        :value="formatDate(selectedItem.ngayBatDau)" disabled>
                                </div>
                                <div class="col-md-6 pt-md-0 pt-3">
                                    <label for="ketthuc" class="form-label">{{ $t('create_onleave.items.to_day')
                                        }}:</label>
                                    <input type="text" id="ketthuc" class="bg-active form-control"
                                        :value="formatDate(selectedItem.ngayKetThuc)" disabled>
                                </div>
                            </div>
                            <div class="row py-2">
                                <div class="col-md-12">
                                    <label for="ghichu" class="form-label">{{ $t('create_onleave.items.note') }}</label>
                                    <textarea type="text" id="ghichu" rows="5" class="bg-active form-control"
                                        :value="selectedItem.moTa" disabled></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{
                            $t('create_onleave.buttons.close') }}</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Sửa thông đơn -->
        <div class="modal fade" id="changeTimeOffModal" tabindex="-1" aria-labelledby="timeOffModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content modal-fullscreen-md-down">
                    <div class="modal-header">
                        <h5 class="modal-title" id="timeOffModalLabel">{{ $t('create_onleave.modal_edit') }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body m-0 row">
                        <!-- Reusable Card Structure Inside Modal -->
                        <div class="py-2 card card-body">
                            <div class="row py-2">
                                <div class="col-md-6">
                                    <label for="maNhanVien" class="form-label disabled">{{
                                        $t('create_onleave.items.employee_id') }}:</label>
                                    <input type="text" id="maNhanVien" class="bg-active form-control"
                                        :value="userInfo.maNhanVien" disabled>
                                </div>
                                <div class="col-md-6 pt-md-0 pt-3">
                                    <label for="hoTen" class="form-label">{{ $t('create_onleave.items.full_name')
                                        }}:</label>
                                    <input type="text" id="hoTen" class="bg-active form-control" :value="userInfo.hoTen"
                                        disabled>
                                </div>
                            </div>
                            <div class="col-md-12 mb-2">
                                <label for="lydo" class="form-label">{{ $t('create_onleave.items.reason') }}:</label>
                                <select class="form-select" id="lydo" v-model="selectedItem.loaiDon"
                                    :class="{ 'is-invalid': errorChange.loaiDon }">
                                    <option selected disabled>Chọn loại nghỉ phép</option>
                                    <option v-if="nghiPhepNam">Nghỉ phép năm</option>
                                    <option>Nghỉ ốm</option>
                                    <option>Nghỉ thai sản</option>
                                    <option>Nghỉ không lương</option>
                                    <option>Khác</option>
                                </select>
                            </div>
                            <div class="row py-2">
                                <div class="col-md-6">
                                    <label for="batdau" class="form-label">{{ $t('create_onleave.items.from_day')
                                        }}</label>
                                    <input type="date" v-model="selectedItem.ngayBatDau" id="batdau"
                                        class="form-control" :class="{ 'is-invalid': errorChange.ngayBatDau }">
                                    <div class="invalid-feedback">
                                        {{ $t('create_onleave.validate.from_day') }}
                                    </div>
                                </div>
                                <div class="col-md-6 pt-md-0 pt-3">
                                    <label for="ketthuc" class="form-label">{{ $t('create_onleave.items.to_day')
                                        }}</label>
                                    <input type="date" v-model="selectedItem.ngayKetThuc" id="ketthuc"
                                        class="form-control" :class="{ 'is-invalid': errorChange.ngayKetThuc }">
                                    <div class="invalid-feedback">
                                        {{ $t('create_onleave.validate.to_day') }}
                                    </div>
                                </div>
                            </div>
                            <div class="row py-2">
                                <div class="col-md-12">
                                    <label for="ghichu" class="form-label">{{ $t('create_onleave.items.note') }}</label>
                                    <textarea type="text" id="ghichu" rows="5" class="bg-active form-control"
                                        :value="selectedItem.moTa"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-warning" @click="btnChangeYeuCau_click(selectedItem)">
                            {{ $t('create_onleave.buttons.save') }}
                        </button>
                        <button type="button text-end" class="btn btn-secondary" data-bs-dismiss="modal">{{
                            $t('create_onleave.buttons.close') }}</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal gửi người duyệt -->
        <div class="modal fade" id="timeOffModalDuyet" tabindex="-1" aria-labelledby="timeOffModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content modal-fullscreen-md-down">
                    <div class="modal-header">
                        <h5 class="modal-title" id="timeOffModalLabel">{{ $t('create_onleave.modal_send') }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body m-0 row">
                        <!-- Reusable Card Structure Inside Modal -->
                        <div class="py-2 card card-body">
                            <div class="col-md-12">
                                <label for="truongPhong" class="form-label">{{ $t('create_onleave.items.approver')
                                    }}</label>
                                <select id="nhanVienSelect" v-model="nhanVienSelect" singer class="slim-select"
                                    :class="{ 'is-invalid': error.nhanVienSelect }">
                                    <option v-for="staff in dataAllStaff" :key="staff.maNhanVien"
                                        :value="staff.maNhanVien">
                                        {{ staff.maNhanVien }} - {{ staff.hoTen }}
                                    </option>
                                </select>
                            </div>
                            <div class="row py-2">
                                <div class="col-md-12">
                                    <label for="ghichu" class="form-label">{{ $t('create_onleave.items.note') }}</label>
                                    <textarea type="text" id="ghichu" rows="5" class="bg-active form-control"
                                        v-model="ghiChu"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success" @click="guiDuyetYeuCau(selectedItem.maDon)">{{
                            $t('create_onleave.buttons.send') }}</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{
                            $t('create_onleave.buttons.close') }}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import { del, get, post, put } from '@/stores/https';
import { onMounted, ref, reactive } from 'vue'
import { useValidation } from '@/stores/mixin/validate_form'
import SlimSelect from 'slim-select'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const listYeuCau = ref([])
const listChuaGui = ref([])
const listChoDuyet = ref([])
const listDaDuyet = ref([])
const listTuChoi = ref([])

const userInfo = ref({})
const selectedItem = ref({})

const dataAllStaff = ref([])
const slimSelectInstance = ref('')
const nhanVienSelect = ref([])

const ghiChu = ref('')

//Lấy tất cả nhân viên
const getAllStaff = async () => {
    const response = await get('/api/v1/employees')
    dataAllStaff.value = response.data
}

const { validateForm } = useValidation()

const error = reactive({
    nhanVienSelect: ''
})

const guiDuyetYeuCau = async (maDon) => {
    try {
        const formData = ref({
            maDon: maDon,
            maNhanVien: nhanVienSelect.value,
            ghiChu: ghiChu.value
        })
        const response = await post('/api/v1/approvals', formData.value)
        if (response.success) {
            Swal.fire({
                title: t('create_onleave.send_request.success.title'),
                text: t('create_onleave.send_request.success.text'),
                icon: 'success',
                timer: 1500,
            })
        } else {
            Swal.fire({
                title: t('create_onleave.send_request.fail.title'),
                text: t('create_onleave.send_request.fail.text'),
                icon: 'error',
                timer: 1500,
            })
        }
    } catch (error) {
        Swal.fire({
            title: t('create_onleave.error.title'),
            text: t('create_onleave.error.text'),
            icon: 'error',
            timer: 1500,
        })
        console.log(error)
    }
}

const createSlimSelect = () => {
    slimSelectInstance.value = new SlimSelect({
        select: '#nhanVienSelect',
        closeOnSelect: false,
    });
}

//Định dạng ngày theo dạng dd-mm-yyyy
const formatDate = (dateString) => {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
}

//Lấy tất cả yêu cầu của user
const loadYeuCau = async () => {
    try {
        const response = await get('/api/v1/don-yeu-cau', { maNhanVien: sessionStorage.getItem('maNhanVien') })
        listYeuCau.value = response.data

        listChuaGui.value = []
        listChoDuyet.value = []
        listDaDuyet.value = []
        listTuChoi.value = []

        //Phân các list theo các trạng thái tương ứng: 1-chờ duyệt, 2-đã duyệt, 3-từ chối
        listYeuCau.value.forEach(item => {
            if (item.trangThai === 0) {
                listChuaGui.value.push(item)
            }
            else if (item.trangThai === 1) {
                listChoDuyet.value.push(item)
            } else if (item.trangThai === 2) {
                listDaDuyet.value.push(item)
            } else {
                listTuChoi.value.push(item)
            }
        })

        listChoDuyet.value.sort((a, b) => new Date(b.ngayTao) - new Date(a.ngayTao));
        listDaDuyet.value.sort((a, b) => new Date(b.ngayTao) - new Date(a.ngayTao));
        listTuChoi.value.sort((a, b) => new Date(b.ngayTao) - new Date(a.ngayTao));

    } catch (error) {
        Swal.fire({
            title: t('create_onleave.error.title'),
            text: t('create_onleave.error.text'),
            icon: 'error',
            timer: 1500,
        })
        console.error('Error during get info:', error)
    }
}

//Lấy thông tin user
const loadInfoUser = async () => {
    try {
        const response = await get(`/api/v1/employees/${sessionStorage.getItem('maNhanVien')}`)
        userInfo.value = {
            hoTen: response.data.hoTen,
            maNhanVien: response.data.maNhanVien,
            tenChucVu: response.data.tenChucVu,
            tenBoPhan: response.data.tenBoPhan,
            tenPhongBan: response.data.tenPhongBan,
            hinhAnh: response.data.hinhAnh
        }
    } catch (error) {
        Swal.fire({
            title: t('create_onleave.error.title'),
            text: t('create_onleave.error.text'),
            icon: 'error',
            timer: 1500,
        })
    }
}

const errorChange = reactive({
    loaiDon: '',
    ngayBatDau: '',
    ngayKetThuc: ''
})

const validateChange = (item) => {
    const formRule = {
        loaiDon: {
            required: true
        },
        ngayBatDau: {
            required: true,
            compareDate: `>= ${new Date().toISOString().split('T')[0]}`
        },
        ngayKetThuc: {
            required: true,
            compareDate: `>= ${item.ngayBatDau}`
        }
    }
    const validationData = {
        loaiDon: item.loaiDon,
        ngayBatDau: item.ngayBatDau,
        ngayKetThuc: item.ngayKetThuc
    }
    Object.assign(errorChange, validateForm(formRule, validationData))
    for (let key in errorChange) {
        if (errorChange[key] !== false) return false
    }
    return true
}

const btnChangeYeuCau_click = async (item) => {
    if (!validateChange(item)) {
        await Swal.fire({
            title: t('create_onleave.validate.error'),
            text: 'Error',
            icon: 'error',
            timer: 1500,
        })
        return
    }

    try {
        const response = await put('/api/v1/don-yeu-cau', item)

        if (response.success) {
            await Swal.fire({
                title: t('create_onleave.update_request.success.title'),
                text: t('create_onleave.update_request.success.text'),
                icon: 'success',
                timer: 1500,
            })
        } else {
            await Swal.fire({
                title: t('create_onleave.update_request.fail.title'),
                text: t('create_onleave.update_request.fail.text'),
                icon: 'error',
                timer: 1500,
            })
        }
    } catch (error) {
        Swal.fire({
            title: t('create_onleave.error.title'),
            text: t('create_onleave.error.text'),
            icon: 'error',
            timer: 1500,
        })
    }
}

const btnDeleteDonYeuCau_click = async (maDon) => {
    try {
        Swal.fire({
            title: t('create_onleave.delete_request.question.title'),
            text: t('create_onleave.delete_request.question.text'),
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: t('create_onleave.delete_request.button.delete'),
            cancelButtonText: t('create_onleave.delete_request.button.cancel'),
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await del(`/api/v1/don-yeu-cau/${maDon}`)
                if (response.success) {
                    // Xóa item khỏi listYeuCau
                    listYeuCau.value = listYeuCau.value.filter(item => item.maDon !== maDon)

                    // Xóa item khỏi các danh sách phân loại
                    listChoDuyet.value = listChoDuyet.value.filter(item => item.maDon !== maDon)
                    listDaDuyet.value = listDaDuyet.value.filter(item => item.maDon !== maDon)
                    listTuChoi.value = listTuChoi.value.filter(item => item.maDon !== maDon)
                    Swal.fire({
                        title: t('create_onleave.delete_request.success.title'),
                        text: t('create_onleave.delete_request.success.text'),
                        icon: 'success',
                        timer: 1500,
                    }).then(() => {
                        location.reload();
                    })
                } else {
                    Swal.fire({
                        title: t('create_onleave.delete_request.fail.title'),
                        text: t('create_onleave.delete_request.fail.text'),
                        icon: 'error',
                        timer: 1500,
                    })
                }
            }
        });
    } catch (error) {
        Swal.fire({
            title: t('create_onleave.error.title'),
            text: t('create_onleave.error.text'),
            icon: 'error',
            timer: 1500,
        })
    }
}

//Truyền item vào modal, hiển thị thông tin tổng thể của yêu cầu
const openModal = (item) => {
    selectedItem.value = item
}

const nghiPhepNam = ref('')

const getNghiPhepNam = async() => {
    const response = await get(`/api/v1/annual-leave/employee/${sessionStorage.getItem('maNhanVien')}`)
    nghiPhepNam.value = response.data.tongSoNgayPhepCon
    console.log(nghiPhepNam.value)
}

onMounted(async () => {
    await loadYeuCau()
    await loadInfoUser()
    await getAllStaff()
    await getNghiPhepNam()
    createSlimSelect()
})
</script>

<style scoped>
@import url('https://cdn.jsdelivr.net/npm/slim-select@latest/dist/slimselect.min.css');

.card-header {
    font-weight: bold;
}

.btn-add {
    border: 0.8px lightskyblue solid;
    background-color: aliceblue;
    color: gray;
}

.btn-add:hover {
    border: 1px rgb(106, 176, 219) solid;
    background-color: rgb(106, 176, 219);
    color: black;
}

.ms-n5 {
    margin-left: -40px;
}

.search_input {
    width: 500px;
}

.content {
    font-size: 14px;
}

.fa-clock {
    font-size: 20px;
}

img {
    width: 20px;
    height: 20px;
}

.btn-edit {
    border-radius: 5px;
    background: rgb(62, 202, 62);
    color: white;
}

.btn-cancel {
    border-radius: 5px;
    background: rgb(225, 104, 104);
    color: white;
}

hr {
    margin-top: 0;
    margin-bottom: 24px;
}

.text-header {
    font-size: 15px;
}

.btn {
    padding: 3px 6px;
    font-size: 14px;
}

textarea {
    height: 100px;
}
</style>
