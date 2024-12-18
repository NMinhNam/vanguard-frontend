<template>
    <div class="container-fluid">
        <h4 class="pb-4 border-bottom fw-medium">{{ $t('profile.title') }}</h4>
        <div class="row g-3 border-bottom pb-4 mt-2">
            <div class="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                <div class="card">
                    <div class="card-body px-2">
                        <div class="account-settings py-2">
                            <div class="user-profile text-center">
                                <img
                                    class="img rounded-circle border mb-2"
                                    :src="
                                        infoNV.hinhAnh ||
                                        'https://i.pinimg.com/736x/8f/1c/a2/8f1ca2029e2efceebd22fa05cca423d7.jpg'
                                    "
                                />
                                <h5 class="user-name my-3">{{ infoNV.maNhanVien }} - {{ infoNV.hoTen }}</h5>
                                <p class="fw-bold">{{ infoNV.tenChucVu }} - {{ infoNV.tenPhongBan }}</p>
                                <div class="d-flex align-items-center justify-content-center">
                                    <i class="fa-solid fa-envelope"></i>
                                    <span class="p-2">{{ infoNV.email }}</span>
                                </div>
                                <div class="d-flex align-items-center justify-content-center">
                                    <i class="fa-solid fa-phone"></i>
                                    <span class="p-2">{{ infoNV.dienThoai }}</span>
                                </div>
                                <div class="d-flex align-items-center justify-content-center">
                                    <div class="btn btn-success" @click="downloadPDF()">
                                        Xuất file PDF
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12">
                <div class="card h-100">
                    <!-- Nav tabs -->
                    <ul class="p-2 nav nav-tabs">
                        <li class="nav-item">
                            <a class="nav-link active" data-bs-toggle="tab" href="#home">{{
                                $t('profile.buttons.information')
                            }}</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-bs-toggle="tab" href="#menu1">{{
                                $t('profile.buttons.experience')
                            }}</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-bs-toggle="tab" href="#menu2">{{
                                $t('profile.buttons.education')
                            }}</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-bs-toggle="tab" href="#menu3">Hợp đồng</a>
                        </li>
                    </ul>

                    <!-- Tab panes -->
                    <div class="tab-content px-2">
                        <div class="tab-pane container active p-0" id="home">
                            <div class="p-3">
                                <div class="row align-items-center">
                                    <div class="col-sm-2">
                                        <h6 class="mb-0">CCCD:</h6>
                                    </div>
                                    <div class="col-sm-10 text-body-secondary">
                                        {{ infoNV.cccd }}
                                    </div>
                                </div>
                                <hr />
                                <div class="row align-items-center">
                                    <div class="col-sm-2">
                                        <h6 class="mb-0">{{ $t('profile.items_info.birthday') }}:</h6>
                                    </div>
                                    <div class="col-sm-10 text-body-secondary">
                                        {{ infoNV.ngaySinh }}
                                    </div>
                                </div>
                                <hr />
                                <div class="row align-items-center">
                                    <div class="col-sm-2">
                                        <h6 class="mb-0">{{ $t('profile.items_info.gender') }}:</h6>
                                    </div>
                                    <div class="col-sm-10 text-body-secondary">
                                        {{ infoNV.gioiTinh ? 'Nam' : 'Nữ' }}
                                    </div>
                                </div>
                                <hr />
                                <div class="row align-items-center">
                                    <div class="col-sm-2">
                                        <h6 class="mb-0">{{ $t('profile.items_info.address') }}:</h6>
                                    </div>
                                    <div class="col-sm-10 text-body-secondary">
                                        {{ infoNV.diaChi }}
                                    </div>
                                </div>
                                <hr />
                                <div class="row text-end">
                                    <div class="col-sm-12">
                                        <router-link :to="{ path: `/user/information/${infoNV.maNhanVien}` }">
                                            <button class="btn btn-info">{{ $t('profile.buttons.edit') }}</button>
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane container p-0" id="menu1">
                            <div class="p-3" v-for="item in listHistory_Works">
                                <div class="row align-items-center mb-3">
                                    <div class="p-0 ps-1">
                                        <b class="border border-2 rounded-2 p-2"
                                            >{{ $t('profile.items_work.from') }} {{ formatDate(item.thoiGianBatDau) }} -
                                            {{ $t('profile.items_work.to') }} {{ formatDate(item.thoiGianKetThuc) }}</b
                                        >
                                    </div>
                                </div>
                                <div class="row align-items-center">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">{{ $t('profile.items_work.company') }}:</h6>
                                    </div>
                                    <div class="col-sm-9 text-body-secondary">
                                        {{ item.tenCongTy }}
                                    </div>
                                </div>
                                <hr />
                                <div class="row align-items-center">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">{{ $t('profile.items_work.position') }}:</h6>
                                    </div>
                                    <div class="col-sm-9 text-body-secondary">
                                        {{ item.viTri }}
                                    </div>
                                </div>
                                <hr />
                                <div class="row align-items-center">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">{{ $t('profile.items_work.description') }}:</h6>
                                    </div>
                                    <div class="col-sm-9 text-body-secondary">
                                        {{ item.moTaCongViec }}
                                    </div>
                                </div>
                                <hr />
                                <hr />
                            </div>
                        </div>
                        <div class="tab-pane container p-0" id="menu2">
                            <div class="p-3" v-for="item in listEducations">
                                <div class="row align-items-center mb-3">
                                    <div class="p-0 ps-1">
                                        <b class="border border-2 rounded-2 p-2"
                                            >Năm tốt nghiệp: {{ item.namTotNghiep }}</b
                                        >
                                    </div>
                                </div>
                                <div class="row align-items-center">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">{{ $t('profile.items_edu.school_name') }}:</h6>
                                    </div>
                                    <div class="col-sm-9 text-body-secondary">
                                        {{ item.coSoGiaoDuc }}
                                    </div>
                                </div>
                                <hr />
                                <div class="row align-items-center">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">{{ $t('profile.items_edu.major') }}:</h6>
                                    </div>
                                    <div class="col-sm-9 text-body-secondary">
                                        {{ item.chuyenNganh }}
                                    </div>
                                </div>
                                <hr />
                                <div class="row align-items-center">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">{{ $t('profile.items_edu.education_level') }}:</h6>
                                    </div>
                                    <div class="col-sm-9 text-body-secondary">
                                        {{ item.tenTrinhDo }}
                                    </div>
                                </div>
                                <hr />
                                <hr />
                            </div>
                        </div>
                        <div class="tab-pane container p-0" id="menu3">
                            <div class="p-3" v-for="item in listHopDong">
                                <div class="row align-items-center">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Số hợp đồng:</h6>
                                    </div>
                                    <div class="col-sm-9 text-body-secondary">
                                        {{ item.soHopDong }}
                                    </div>
                                </div>
                                <hr />
                                <div class="row align-items-center">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Ngày bắt đầu:</h6>
                                    </div>
                                    <div class="col-sm-9 text-body-secondary">
                                        {{ formatDate(item.ngayBatDau) }}
                                    </div>
                                </div>
                                <hr />
                                <div class="row align-items-center">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Ngày kết thúc:</h6>
                                    </div>
                                    <div class="col-sm-9 text-body-secondary">
                                        {{ formatDate(item.ngayKetThuc) }}
                                    </div>
                                </div>
                                <hr />
                                <div class="row align-items-center">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Ngày ký:</h6>
                                    </div>
                                    <div class="col-sm-9 text-body-secondary">
                                        {{ formatDate(item.ngayKy) }}
                                    </div>
                                </div>
                                <hr />
                                <div class="row align-items-center">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Thời hạn:</h6>
                                    </div>
                                    <div class="col-sm-9 text-body-secondary">{{ item.thoiHan }} Năm</div>
                                </div>
                                <hr />
                                <div class="row align-items-center">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Nội dung:</h6>
                                    </div>
                                    <div class="col-sm-9 text-body-secondary">
                                        {{ item.noiDung }}
                                    </div>
                                </div>
                                <hr />
                                <hr />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { get, getPDF } from '@/stores/https'

const infoNV = ref({})
const listHistory_Works = ref([])
const listEducations = ref([])
const listHopDong = ref([])

//Lấy thông tin user
const loadInfoUser = async () => {
    try {
        const userName = sessionStorage.getItem('user')
        const response = await get('/api/v1/employees/me', { username: userName })
        const maNV = response.data.maNhanVien
        const maNVSession = sessionStorage.setItem('maNhanVien', maNV)
        const responseInfo = await get(`/api/v1/employees/${maNV}`)
        if (response.success) {
            infoNV.value = {
                maNhanVien: responseInfo.data.maNhanVien,
                hoTen: responseInfo.data.hoTen,
                gioiTinh: responseInfo.data.gioiTinh,
                ngaySinh: responseInfo.data.ngaySinh,
                dienThoai: responseInfo.data.dienThoai,
                email: responseInfo.data.email,
                cccd: responseInfo.data.cccd,
                diaChi: responseInfo.data.diaChi,
                hinhAnh: responseInfo.data.hinhAnh,
                maBoPhan: responseInfo.data.maBoPhan,
                maChucVu: responseInfo.data.maChucVu,
                maPhongBan: responseInfo.data.maPhongBan,
                tenBoPhan: responseInfo.data.tenBoPhan,
                tenChucVu: responseInfo.data.tenChucVu,
                tenPhongBan: responseInfo.data.tenPhongBan,
                tenTruongPhong: responseInfo.data.tenTruongPhong,
            }

            //Định dạng kiểu dd-mm-yyyy
            const date = new Date(infoNV.value.ngaySinh)
            const formattedDate =
                ('0' + date.getDate()).slice(-2) +
                '-' +
                ('0' + (date.getMonth() + 1)).slice(-2) +
                '-' +
                date.getFullYear()

            infoNV.value.ngaySinh = formattedDate
        }
    } catch (error) {
        await Swal.fire({
            title: 'login.messages.login_fail_server.title',
            text: 'login.messages.login_fail_server.text',
            icon: 'error',
            timer: 1500,
        })
        console.error('Error during login:', error)
    }
}

const downloadPDF = async () => {
  try {
    await getPDF('/api/v1/employees/generate-employee-card-pdf', { employeeCode: sessionStorage.getItem('maNhanVien')})
  } catch (error) {
    console.error('Lỗi khi tải PDF:', error)
  }
}

const getHistory_Works = async () => {
    const response = await get('/api/v1/work-histories', { maNhanVien: sessionStorage.getItem('maNhanVien') })
    listHistory_Works.value = response.data
    listHistory_Works.value.sort((a, b) => new Date(b.thoiGianBatDau) - new Date(a.thoiGianBatDau))
}

const getEdu = async () => {
    const response = await get('/api/v1/educations')
    listEducations.value = response.data
    listEducations.value.sort((a, b) => new Date(b.namTotNghiep) - new Date(a.namTotNghiep))
}

const getHopDong = async () => {
    const response = await get(`/api/v1/contracts/employee/${sessionStorage.getItem('maNhanVien')}`)
    listHopDong.value = response.data
}

const formatDate = (dateString) => {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
}

onMounted(async () => {
    await loadInfoUser()
    await getHistory_Works()
    await getEdu()
    await getHopDong()
})
</script>

<style scoped>
body {
    background-color: aliceblue;
}

.wrapper {
    padding: 30px 50px;
    border: 1px solid #ddd;
    border-radius: 15px;
    margin: 10px auto;
    max-width: 1000px;
}

h4 {
    letter-spacing: -1px;
    font-weight: 400;
}

.img {
    width: 120px;
    height: 120px;
    border-radius: 6px;
    object-fit: cover;
}

label {
    margin-bottom: 0;
    font-size: 14px;
    font-weight: 500;
    color: #777;
    padding-left: 3px;
}

.nav-tabs {
    border-radius: 0 !important;
    border-top-left-radius: 5px !important;
    border-top-right-radius: 5px !important;
}
</style>
