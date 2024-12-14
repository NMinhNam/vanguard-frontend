<template>
    <div class="card">
        <!-- Header Section -->
        <div class="card-header border-bottom text-center d-flex align-items-center justify-content-between px-4 fs-4">
            <div class="float-start mt-2">
                Đơn nghỉ phép của tôi
            </div>
            <router-link :to="{ path: '/user/timeoff/newrequest' }">
                <div class="btn btn-add float-end">
                    Tạo đơn nghỉ phép
                    <i class="fa-solid fa-plus"></i>
                </div>
            </router-link>
        </div>
        <!-- Main Content Section -->
        <div class="card-body">
            <div class="col-sm-12 row m-0">
                <div class="col-sm-3 px-2">
                    <label class="p-2 text-bg-secondary rounded-2 fw-bolder">Chưa gửi</label>
                    <!-- Card Item with Modal Trigger -->
                    <div v-for="item in listChuaGui" :key="item.maDon" class="card p-2 my-2" 
                    data-bs-toggle="modal" data-bs-target="#timeOffModal" @click="openModal(item)">
                        <div class="d-flex m-0 justify-content-between text-header">
                            <div class="fw-medium text-start">
                                <b>Mã đơn: </b>
                                {{ item.maDon }}
                            </div>
                            <div class="fw-medium text-end text-secondary"> <i class="fa-solid fa-circle-dot"></i></div>
                        </div>
                        <div class="content my-2">
                            <label class="w-100">
                                <b>Lý do: </b>
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
                            <button type="button" class="btn btn-success col-sm-2" data-bs-toggle="modal"
                                data-bs-target="#timeOffModalDuyet" @click="openModal(item)">
                                Gửi
                            </button>
                            <button type="button" class="btn btn-info col-sm-3" data-bs-toggle="modal"
                                data-bs-target="#timeOffModal" @click="openModal(item)">
                                Xem
                            </button>
                            <button type="button" class="btn btn-warning col-sm-2" data-bs-toggle="modal"
                                data-bs-target="#changeTimeOffModal" @click="openModal(item)">
                                Sửa
                            </button>
                            <button type=" button" class="btn btn-danger col-sm-3" data-bs-toggle="modal"
                                data-bs-target="#timeOffModal" @click="openModal(item)">
                                Xóa
                            </button>
                        </div>
                    </div>
                </div>
                <div class="col-sm-3 px-2">
                    <label class="p-2 text-bg-primary  rounded-2 fw-bolder">Chờ phê duyệt</label>
                    <!-- Card Item with Modal Trigger -->
                    <div v-for="item in listChoDuyet" :key="item.maDon" class="card p-2 my-2">
                        <div class="d-flex m-0 justify-content-between text-header">
                            <div class="fw-medium text-start">
                                <b>Mã đơn: </b>
                                {{ item.maDon }}
                            </div>
                            <div class="fw-medium text-end text-primary"> <i class="fa-solid fa-circle-dot"></i></div>
                        </div>
                        <div class="content my-2">
                            <label class="w-100">
                                <b>Lý do: </b>
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
                                Xem
                            </button>
                            <button type="button" class="btn btn-danger col-sm-3"
                                @click="btnDeleteDonYeuCau_click(item.maDon)">
                                Xóa
                            </button>
                        </div>
                    </div>
                </div>
                <div class="col-sm-3 px-2">
                    <label class="p-2 text-bg-success text-white rounded-2 fw-bolder">Đã phê duyệt</label>
                    <!-- Card Item with Modal Trigger -->
                    <div v-for="item in listDaDuyet" :key="item.maDon" class="card p-2 my-2">
                        <div class="d-flex m-0 justify-content-between text-header">
                            <div class="fw-medium text-start">
                                <b>Mã đơn: </b>
                                {{ item.maDon }}
                            </div>
                            <div class="fw-medium text-end text-success"> <i class="fa-solid fa-circle-dot"></i></div>
                        </div>
                        <div class="content my-2">
                            <label class="w-100">
                                <b>Lý do: </b>
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
                                Xem
                            </button>
                            <button type="button" class="btn btn-danger col-sm-3"
                                @click="btnDeleteDonYeuCau_click(item.maDon)">
                                Xóa
                            </button>
                        </div>
                    </div>
                </div>
                <div class="col-sm-3 px-2">
                    <label class="p-2 text-bg-danger rounded-2 fw-bolder">Đã từ chối</label>
                    <!-- Card Item with Modal Trigger -->
                    <div v-for="item in listTuChoi" :key="item.maDon" class="card p-2 my-2">
                        <div class="d-flex m-0 justify-content-between text-header">
                            <div class="fw-medium text-start">
                                <b>Mã đơn: </b>
                                {{ item.maDon }}
                            </div>
                            <div class="fw-medium text-end text-danger"> <i class="fa-solid fa-circle-dot"></i></div>
                        </div>
                        <div class="content my-2">
                            <label class="w-100">
                                <b>Lý do: </b>
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
                                Xem
                            </button>
                            <button type="button" class="btn btn-danger col-sm-3"
                                @click="btnDeleteDonYeuCau_click(item.maDon)">
                                Xóa
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
                        <h5 class="modal-title" id="timeOffModalLabel">Chi tiết nghỉ phép</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body m-0 row">
                        <!-- Reusable Card Structure Inside Modal -->
                        <div class="py-2 card card-body">
                            <div class="row py-2">
                                <div class="col-md-6">
                                    <label for="maNhanVien" class="form-label disabled">Mã nhân viên:</label>
                                    <input type="text" id="maNhanVien" class="bg-active form-control"
                                        :value="userInfo.maNhanVien" disabled>
                                </div>
                                <div class="col-md-6 pt-md-0 pt-3">
                                    <label for="hoTen" class="form-label">Họ và tên:</label>
                                    <input type="text" id="hoTen" class="bg-active form-control" :value="userInfo.hoTen"
                                        disabled>
                                </div>
                            </div>
                            <div class="row py-2">
                                <div class="col-md-4">
                                    <label for="chucVu" class="form-label">Chức vụ:</label>
                                    <input type="text" id="chucVu" class="bg-active form-control"
                                        :value="userInfo.tenChucVu" disabled>
                                </div>
                                <div class="col-md-4">
                                    <label for="phongBan" class="form-label disabled">Bộ phận:</label>
                                    <input type="text" id="phongBan" class="bg-active form-control"
                                        :value="userInfo.tenBoPhan" disabled>
                                </div>
                                <div class="col-md-4">
                                    <label for="phongBan" class="form-label disabled">Phòng Ban:</label>
                                    <input type="text" id="phongBan" class="bg-active form-control"
                                        :value="userInfo.tenPhongBan" disabled>
                                </div>
                            </div>
                            <div class="col-md-12 mb-2">
                                <label for="truongPhong" class="form-label">Người duyệt:</label>
                                <input type="text" id="truongPhong" class="bg-active form-control" value="Phạm Hoàng Hà"
                                    disabled>
                            </div>
                            <div class="col-md-12 mb-2">
                                <label for="lydo" class="form-label">Lý do nghỉ:</label>
                                <input type="text" id="lydo" class="bg-active form-control"
                                    :value="selectedItem.loaiDon" disabled>
                            </div>
                            <div class="row py-2">
                                <div class="col-md-6">
                                    <label for="batdau" class="form-label">Từ ngày:</label>
                                    <input type="text" id="batdau" class="bg-active form-control"
                                        :value="formatDate(selectedItem.ngayBatDau)" disabled>
                                </div>
                                <div class="col-md-6 pt-md-0 pt-3">
                                    <label for="ketthuc" class="form-label">Đến ngày:</label>
                                    <input type="text" id="ketthuc" class="bg-active form-control"
                                        :value="formatDate(selectedItem.ngayKetThuc)" disabled>
                                </div>
                            </div>
                            <div class="row py-2">
                                <div class="col-md-12">
                                    <label for="ghichu" class="form-label">Ghi chú</label>
                                    <textarea type="text" id="ghichu" rows="5" class="bg-active form-control"
                                        :value="selectedItem.moTa" disabled></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
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
                        <h5 class="modal-title" id="timeOffModalLabel">Thay đổi đơn nghỉ phép</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body m-0 row">
                        <!-- Reusable Card Structure Inside Modal -->
                        <div class="py-2 card card-body">
                            <div class="row py-2">
                                <div class="col-md-6">
                                    <label for="maNhanVien" class="form-label disabled">Mã nhân viên:</label>
                                    <input type="text" id="maNhanVien" class="bg-active form-control"
                                        :value="userInfo.maNhanVien" disabled>
                                </div>
                                <div class="col-md-6 pt-md-0 pt-3">
                                    <label for="hoTen" class="form-label">Họ và tên:</label>
                                    <input type="text" id="hoTen" class="bg-active form-control" :value="userInfo.hoTen"
                                        disabled>
                                </div>
                            </div>
                            <div class="col-md-12 mb-2">
                                <label for="lydo" class="form-label">Lý do nghỉ:</label>
                                <select class="form-select" id="lydo" v-model="selectedItem.loaiDon"
                                    :class="{ 'is-invalid': errorChange.loaiDon }">
                                    <option selected disabled>Chọn loại nghỉ phép</option>
                                    <option>Nghỉ phép năm</option>
                                    <option>Nghỉ ốm</option>
                                    <option>Nghỉ thai sản</option>
                                    <option>Nghỉ không lương</option>
                                    <option>Khác</option>
                                </select>
                                <div class="invalid-feedback">
                                    Chưa chọn lý do
                                </div>
                            </div>
                            <div class="row py-2">
                                <div class="col-md-6">
                                    <label for="batdau" class="form-label">Từ ngày</label>
                                    <input type="date" v-model="selectedItem.ngayBatDau" id="batdau"
                                        class="form-control" :class="{ 'is-invalid': errorChange.ngayBatDau }">
                                    <div class="invalid-feedback">
                                        Ngày không phù hợp
                                    </div>
                                </div>
                                <div class="col-md-6 pt-md-0 pt-3">
                                    <label for="ketthuc" class="form-label">Đến ngày</label>
                                    <input type="date" v-model="selectedItem.ngayKetThuc" id="ketthuc"
                                        class="form-control" :class="{ 'is-invalid': errorChange.ngayKetThuc }">
                                    <div class="invalid-feedback">
                                        Ngày không phù hợp
                                    </div>
                                </div>
                            </div>
                            <div class="row py-2">
                                <div class="col-md-12">
                                    <label for="ghichu" class="form-label">Ghi chú</label>
                                    <textarea type="text" id="ghichu" rows="5" class="bg-active form-control"
                                        :value="selectedItem.moTa"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-warning" @click="btnChangeYeuCau_click(selectedItem)">Lưu
                            thay đổi</button>
                        <button type="button text-end" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
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
                        <h5 class="modal-title" id="timeOffModalLabel">Xác nhận người duyệt</h5>
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
                                <div class="invalid-feedback">
                                    Chưa chọn người duyệt
                                </div>
                            </div>
                            <div class="row py-2">
                                <div class="col-md-12">
                                    <label for="ghichu" class="form-label">Ghi chú</label>
                                    <textarea type="text" id="ghichu" rows="5" class="bg-active form-control"
                                        v-model="ghiChu"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success"
                            @click="guiDuyetYeuCau(selectedItem.maDon)">Gửi</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
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

const validate = () => {
    const formRule = {
        nhanVienSelect: {
            required: true
        }
    }
    const validationData = {
        nhanVienSelect: nhanVienSelect.value.length
    }
    Object.assign(error, validateForm(formRule, validationData))
    for (let key in error) {
        if (error[key] !== false) return false
    }
    return true
}

const guiDuyetYeuCau = async (maDon) => {
    if (!validate()) {
        await Swal.fire({
            title: 'Có lỗi xảy',
            text: 'Error',
            icon: 'error',
            timer: 1500,
        })
        return
    }
    try {
        const formData = ref({
            maDon: maDon,
            maNhanVien: nhanVienSelect.value,
            ghiChu: ghiChu.value
        })

        console.log(formData.value)

        const response = await post('/api/v1/approvals', formData.value)
        if (response.success) {
            Swal.fire({
                title: 'Gửi yêu cầu thành công',
                text: 'Đã gửi',
                icon: 'success',
                timer: 1500,
            })
        } else {
            Swal.fire({
                title: 'Gửi yêu cầu thất bại',
                text: 'Không thành công',
                icon: 'error',
                timer: 1500,
            })
        }
    } catch (error) {
        Swal.fire({
            title: 'Có lỗi',
            text: 'Lỗi',
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
            title: 'Lỗi',
            text: 'Lỗi',
            icon: 'error',
            timer: 1500,
        })
        console.error('Error during update info:', error)
    }
}

//Lấy thông tin user
const loadInfoUser = async () => {
    try {
        const response = await get(`/api/v1/employees/${sessionStorage.getItem('maNhanVien')}`)
        if (response.success) {
            userInfo.value = {
                hoTen: response.data.hoTen,
                maNhanVien: response.data.maNhanVien,
                tenChucVu: response.data.tenChucVu,
                tenBoPhan: response.data.tenBoPhan,
                tenPhongBan: response.data.tenPhongBan,
                hinhAnh: response.data.hinhAnh
            }
        } else {
            Swal.fire({
                title: 'Lỗi',
                text: 'Lấy thông tin thất bại',
                icon: 'error',
                timer: 1500,
            })
        }
    } catch (error) {
        Swal.fire({
            title: 'Error',
            text: error.message,
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
            title: 'Có lỗi xảy',
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
                title: 'Thay đổi đơn yêu cầu thành công',
                text: 'Đã lưu thay đổi',
                icon: 'success',
                timer: 1500,
            })
        } else {
            await Swal.fire({
                title: 'Thay đổi thông tin yêu cầu thất bại',
                text: 'Lưu thay đổi thất bại',
                icon: 'error',
                timer: 1500,
            })
        }
    } catch (error) {
        await Swal.fire({
                title: 'Lỗi hệ thống',
                text: 'Lỗi',
                icon: 'error',
                timer: 1500,
            })
    }
}

const btnDeleteDonYeuCau_click = async (maDon) => {
    try {
        const response = await del(`/api/v1/don-yeu-cau/${maDon}`)
        if (response.success) {
            // Xóa item khỏi listYeuCau
            listYeuCau.value = listYeuCau.value.filter(item => item.maDon !== maDon)

            // Xóa item khỏi các danh sách phân loại
            listChoDuyet.value = listChoDuyet.value.filter(item => item.maDon !== maDon)
            listDaDuyet.value = listDaDuyet.value.filter(item => item.maDon !== maDon)
            listTuChoi.value = listTuChoi.value.filter(item => item.maDon !== maDon)
            Swal.fire({
                title: 'Xóa đơn thành công',
                text: 'Đã xóa',
                icon: 'success',
                timer: 1500,
            })
        } else {
            Swal.fire({
                title: 'Xóa đơn thất bại',
                text: 'Lỗi xóa',
                icon: 'error',
                timer: 1500,
            })
        }
    } catch (error) {
        Swal.fire({
            title: 'Lỗi',
            text: 'error',
            icon: 'error',
            timer: 1500,
        })
    }
}

//Truyền item vào modal, hiển thị thông tin tổng thể của yêu cầu
const openModal = (item) => {
    selectedItem.value = item
}

onMounted(async () => {
    await loadYeuCau()
    await loadInfoUser()
    await getAllStaff()
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
</style>
