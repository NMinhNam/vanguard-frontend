<template>
    <div class="container mt-4 p-4">
        <!-- Tiêu đề -->
        <div class="mb-4">
            <h4 class="text-center text-primary">Thông Tin Cuộc Họp</h4>
        </div>

        <!-- Nội dung chính (2 cột) -->
        <div class="row">
            <!-- Cột trái -->
            <div class="col-md-6">
                <!-- Tiêu đề cuộc họp -->
                <div class="mb-3">
                    <label for="meetingTitle" class="form-label fw-bold">Tiêu đề cuộc họp</label>
                    <input type="text" class="form-control" id="meetingTitle" v-model="formData.tenCuocHop" />
                </div>

                <!-- Thời gian bắt đầu -->
                <div class="mb-3">
                    <label for="start" class="form-label fw-bold">Thời gian bắt đầu</label>
                    <DatePicker
                        id="start"
                        v-model="formData.thoiGianBatDau"
                        placeholder="Thời gian bắt đầu"
                        :teleport="true"
                        :auto-position="true"
                        :enable-time-picker="true"
                        format="dd/MM/yyyy HH:mm"
                        :flow="['year', 'month', 'date', 'time']"
                        :time-zone="0"
                    />
                </div>

                <div class="mb-3">
                    <label for="meetingParticipantsSelect" class="form-label fw-bold">Người tham gia</label>
                    <select
                        id="meetingParticipantsSelect"
                        class="slim-select"
                        v-model="formData.danhSachThamGia"
                        multiple
                    >
                        <option v-for="staff in listStaff" :key="staff.maNhanVien" :value="staff.maNhanVien">
                            {{ staff.hoTen }}
                        </option>
                    </select>
                </div>
            </div>

            <!-- Cột phải -->
            <div class="col-md-6">
                <!-- Người tổ chức -->
                <div class="mb-3">
                    <label for="nguoiToChuc" class="form-label fw-bold">Người tổ chức</label>
                    <input
                        type="text"
                        readonly
                        class="form-control bg-light"
                        id="nguoiToChuc"
                        v-model="formData.nguoiToChuc"
                    />
                </div>

                <!-- Thời gian kết thúc -->
                <div class="mb-3">
                    <label for="end" class="form-label fw-bold">Thời gian kết thúc</label>
                    <DatePicker
                        id="end"
                        v-model="formData.thoiGianKetThuc"
                        placeholder="Thời gian kết thúc"
                        :teleport="true"
                        :auto-position="true"
                        :enable-time-picker="true"
                        :flow="['year', 'month', 'date', 'time']"
                        format="dd/MM/yyyy HH:mm"
                    />
                </div>

                <div class="mb-3">
                    <label for="meetingPosition" class="form-label fw-bold">Vị trí họp</label>
                    <input type="text" class="form-control" id="meetingPosition" v-model="formData.viTri" />
                </div>
            </div>
        </div>

        <!-- Đường dẫn cuộc họp -->
        <div class="row mb-3">
            <div class="col-md-10">
                <label for="linkMeeting" class="form-label fw-bold">Đường dẫn họp</label>
                <input type="text" class="form-control" id="linkMeeting" v-model="formData.videoCallUrl" />
            </div>
            <div class="col-md-2 d-flex align-items-end">
                <div>
                    <button class="btn btn-primary w-100" :disabled="!formData.videoCallUrl" @click="openMeeting">
                        <span class="d-flex align-items-center">
                            <span class="material-symbols-outlined" style="margin-right: 8px">videocam</span>
                            Tham gia
                        </span>
                    </button>
                </div>
            </div>
        </div>

        <!-- Nút lưu -->
        <div class="text-end">
            <button class="btn btn-success" @click="saveMeeting">
                <span class="d-flex align-items-center">
                    <span class="material-symbols-outlined" style="margin-right: 8px">save</span>
                    Lưu
                </span>
            </button>
        </div>
    </div>
</template>



<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { get, post, put } from '@/stores/https'
import SlimSelect from 'slim-select'
import DatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
const emit = defineEmits(['reloadData'])
import { format } from 'date-fns'

const props = defineProps({
    event: {
        type: Object,
        default: () => ({}),
    },
})
const listStaff = ref([])
const slimSelectInstance = ref('')
const meetingDetail = ref({})

const formData = reactive({
    maCuocHop: '',
    ghiChu: '',
    nguoiToChuc: '',
    tenCuocHop: '',
    thoiGianBatDau: '',
    thoiGianKetThuc: '',
    viTri: '',
    videoCallUrl: '',
    danhSachThamGia: [],
})

onMounted(async () => {
    if (props.event.maCuocHop) {
        await getMeetingByMeetingId(props.event.maCuocHop)
    }
    await getListStaff()
    createSlimSelect()
})

const setDataforFormData = (data) => {
    formData.maCuocHop = data.maCuocHop
    formData.ghiChu = data.ghiChu || ''
    formData.nguoiToChuc = data.nguoiToChuc || ''
    formData.tenCuocHop = data.tenCuocHop || ''
    formData.thoiGianBatDau = data.thoiGianBatDau
    formData.thoiGianKetThuc = data.thoiGianKetThuc
    formData.viTri = data.viTri || ''
    formData.videoCallUrl = data.videoCallUrl
    if (data.danhSachThamGia) {
        formData.danhSachThamGia = data.danhSachThamGia.split(',').map((item) => item.trim())
        setSlimSelectValues(formData.danhSachThamGia)
    }
}

const getMeetingByMeetingId = async (maCuocHop) => {
    if (maCuocHop) {
        try {
            const response = await get(`/api/v1/meetings/${maCuocHop}`)
            meetingDetail.value = response.data
            setDataforFormData(meetingDetail.value)
        } catch (error) {
            console.error(error)
        }
        console.log(meetingDetail.value)
    }
}

const saveSuccess = () => {
    emit('reloadData')
    console.log('loadData')
}

// watchEffect(() => {
//     if (props.event) {
//         formData.maCuocHop = props.event.maCuocHop
//         formData.ghiChu = props.event.ghiChu || ''
//         formData.nguoiToChuc = props.event.nguoiToChuc || ''
//         formData.tenCuocHop = props.event.tenCuocHop || ''
//         formData.thoiGianBatDau = props.event.thoiGianBatDau
//         formData.thoiGianKetThuc = props.event.thoiGianKetThuc
//         formData.viTri = props.event.viTri || ''
//         formData.videoCallUrl = props.event.videoCallUrl || ''
//         formData.danhSachThamGia = props.event.danhSachThamGia.split(',').map((item) => item.trim())
//     }
//     if (props.event.danhSachThamGia) {
//         formData.danhSachThamGia = props.event.danhSachThamGia.split(',').map((item) => item.trim())
//     } else {
//         formData.danhSachThamGia = []
//     }
//     nextTick(() => {
//         setSlimSelectValues(formData.danhSachThamGia)
//     })
// })

const createSlimSelect = () => {
    if (slimSelectInstance.value) {
        slimSelectInstance.value.destroy()
    }
    slimSelectInstance.value = new SlimSelect({
        select: '#meetingParticipantsSelect',
        closeOnSelect: false,
        showSearch: true,
        placeholder: 'Chọn người tham gia...',
    })
}

const setSlimSelectValues = (values) => {
    if (slimSelectInstance.value) {
        slimSelectInstance.value.setSelected(values)
    } else {
        console.error('SlimSelect instance chưa được khởi tạo!')
    }
}

const getListStaff = async () => {
    const response = await get('/api/v1/employees')
    listStaff.value = response.data
}
function convertToUTC(localTime) {
    const localDate = new Date(localTime)
    const timezoneOffset = localDate.getTimezoneOffset() * 60000

    // Điều chỉnh thời gian để chuyển về UTC mà không thay đổi giá trị giờ
    const utcDate = new Date(localDate.getTime() - timezoneOffset)

    // Trả về thời gian UTC dưới dạng ISO (chuỗi định dạng chuẩn)
    return utcDate.toISOString()
}

const validate = (data) => {
    if (data.thoiGianBatDau > data.thoiGianKetThuc) {
        Swal.fire({
            title: 'Lỗi định dạng',
            text: 'Thời gian bắt đầu và thời gian kết thúc không hợp lệ',
            icon: 'error',
            timer: 1500,
        })
        return true
    }
    return false
}
const saveMeeting = async () => {
    formData.thoiGianBatDau = format(formData.thoiGianBatDau, "yyyy-MM-dd'T'HH:mm:ss")
    formData.thoiGianKetThuc = format(formData.thoiGianKetThuc, "yyyy-MM-dd'T'HH:mm:ss")
    if (props.event.maCuocHop) {
        updateMeeting()
    } else {
        createMeeting()
    }
}

const createMeeting = async () => {
    if (validate(formData)) {
        return
    }
    try {
        const response = await post('/api/v1/meetings', formData)

        if (formData.danhSachThamGia.length > 0) {
            const chiTietCuocHop = {
                maNhanVien: '',
                nguoiToChuc: formData.nguoiToChuc,
                tenCuocHop: formData.tenCuocHop,
                thoiGianBatDau: formData.thoiGianBatDau,
            }

            for (let i = 0; i < formData.danhSachThamGia.length; i++) {
                chiTietCuocHop.maNhanVien = formData.danhSachThamGia[i]
                try {
                    const chiTietResponse = await post('/api/v1/chi-tiet-cuoc-hop', chiTietCuocHop)
                    console.log('Chi tiết cuộc họp đã được tạo:', chiTietResponse)
                } catch (error) {
                    console.error('Lỗi khi tạo chi tiết cuộc họp cho nhân viên', chiTietCuocHop.maNhanVien, error)
                }
            }
        }

        if (response) {
            Swal.fire({
                title: 'Thành công',
                text: 'Tạo cuộc họp thành công',
                icon: 'success',
                timer: 1500,
            })
        }
    } catch (error) {
        console.error('Lỗi khi tạo cuộc họp:', error)
        Swal.fire({
            title: 'Thất bại',
            text: 'Tạo cuộc họp thất bại',
            icon: 'error',
            timer: 1500,
        })
    }
    saveSuccess()
}
const updateMeeting = async () => {
    console.log(formData)
    if (validate(formData)) {
        return
    }
    try {
        const response = await put('/api/v1/meetings', formData)
        if (formData.danhSachThamGia.length > 0) {
            const chiTietCuocHop = {
                maNhanVien: '',
                tenCuocHop: formData.tenCuocHop,
                nguoiToChuc: formData.nguoiToChuc,
                thoiGianBatDau: formData.thoiGianBatDau,
            }
            for (let i = 0; i < formData.danhSachThamGia.length; i++) {
                chiTietCuocHop.maNhanVien = formData.danhSachThamGia[i]
                const chiTietResponse = await post('/api/v1/chi-tiet-cuoc-hop', chiTietCuocHop)
            }
        }
        if (response) {
            Swal.fire({
                title: 'Thành công',
                text: 'Cập nhật cuộc họp thành công',
                icon: 'success',
                timer: 1500,
            })
        }
    } catch (error) {
        console.error(error)
        Swal.fire({
            title: 'Thất bại',
            text: 'Cập nhật cuộc họp thất bại',
            icon: 'error',
            timer: 1500,
        })
    }
    saveSuccess()
}

const openMeeting = () => {
    if (formData.videoCallUrl) {
        window.open(formData.videoCallUrl, '_blank', 'noopener noreferrer') // Mở URL trong tab mới
    }
}
</script>


    
<style>
@import url('https://cdn.jsdelivr.net/npm/slim-select@latest/dist/slimselect.min.css');
</style>