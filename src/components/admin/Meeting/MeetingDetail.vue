<template>
    <div class="container mt-4 p-4">
        <div class="mb-4">
            <h4 class="text-center text-primary">{{ t('meeting.title') }}</h4>
        </div>
        <div class="row">
            <div class="col-md-6">
                <div class="mb-3">
                    <label for="meetingTitle" class="form-label fw-bold">{{ t('meeting.meeting_title') }}</label>
                    <input
                        :disabled="role == 'USER'"
                        type="text"
                        class="form-control"
                        id="meetingTitle"
                        v-model="formData.tenCuocHop"
                    />
                </div>
                <div class="mb-3">
                    <label for="start" class="form-label fw-bold">{{ t('meeting.start') }}</label>
                    <DatePicker
                        :disabled="role == 'USER'"
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
                    <label for="meetingParticipantsSelect" class="form-label fw-bold">{{
                        t('meeting.participants')
                    }}</label>
                    <select
                        :disabled="role == 'USER'"
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
            <div class="col-md-6">
                <div class="mb-3">
                    <label for="nguoiToChuc" class="form-label fw-bold">{{ t('meeting.organizer') }}</label>
                    <input
                        :disabled="role == 'USER'"
                        type="text"
                        readonly
                        class="form-control bg-light"
                        id="nguoiToChuc"
                        :value="formData.tenNguoiToChuc"
                        @focus="$event.target.blur()"
                    />
                </div>
                <div class="mb-3">
                    <label for="end" class="form-label fw-bold">{{ t('meeting.end') }}</label>
                    <DatePicker
                        :disabled="role == 'USER'"
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
                    <label for="meetingPosition" class="form-label fw-bold">{{ t('meeting.location') }}</label>
                    <input
                        :disabled="role == 'USER'"
                        type="text"
                        class="form-control"
                        id="meetingPosition"
                        v-model="formData.viTri"
                    />
                </div>
            </div>
        </div>
        <div class="row mb-3">
            <div class="col-md-10">
                <label for="linkMeeting" class="form-label fw-bold">{{ t('meeting.path') }}</label>
                <input
                    :disabled="role == 'USER'"
                    type="text"
                    class="form-control"
                    id="linkMeeting"
                    v-model="formData.videoCallUrl"
                />
            </div>
            <div class="col-md-2 d-flex align-items-end">
                <div>
                    <button class="btn btn-primary w-100" :disabled="!formData.videoCallUrl" @click="openMeeting">
                        <span class="d-flex align-items-center">
                            <span class="material-symbols-outlined">videocam</span>
                        </span>
                    </button>
                </div>
            </div>
        </div>

        <!-- Nút lưu -->
        <div class="text-start">
            <button class="btn btn-success" @click="saveMeeting" v-if="role != 'USER'">
                <span class="d-flex align-items-center">
                    <span class="material-symbols-outlined" style="margin-right: 8px">save</span>
                    {{ t('meeting.save') }}
                </span>
            </button>
            <button class="btn btn-danger ms-2" @click="deleteMeeting()" v-if="role != 'USER' && event.maCuocHop">
                <span class="d-flex align-items-center">
                    <span class="material-symbols-outlined" style="margin-right: 8px">delete</span>
                    {{ t('meeting.delete') }}
                </span>
            </button>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { get, post, put, del } from '@/stores/https'
import SlimSelect from 'slim-select'
import DatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
const emit = defineEmits(['reloadData'])
import { format } from 'date-fns'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const props = defineProps({
    event: {
        type: Object,
        default: () => ({}),
    },
})
const listStaff = ref([])
const slimSelectInstance = ref('')
const meetingDetail = ref({})
const role = ref('')

const formData = reactive({
    maNhanVien: '',
    maCuocHop: '',
    ghiChu: '',
    nguoiToChuc: '',
    tenNguoiToChuc: '',
    tenCuocHop: '',
    thoiGianBatDau: '',
    thoiGianKetThuc: '',
    viTri: '',
    videoCallUrl: '',
    danhSachThamGia: ['NV01'],
})

onMounted(async () => {
    role.value = sessionStorage.getItem('role')
    setDataforFormData(props.event)
    if (props.event.maCuocHop) {
        await getMeetingByMeetingId(props.event.maCuocHop)
    }
    await getListStaff()
    createSlimSelect()
})

const setDataforFormData = (data) => {
    formData.maNhanVien = data.maNhanVien
    formData.maCuocHop = data.maCuocHop
    formData.ghiChu = data.ghiChu || ''
    formData.nguoiToChuc = data.nguoiToChuc
    formData.tenCuocHop = data.tenCuocHop || ''
    formData.thoiGianBatDau = data.thoiGianBatDau || props.event.thoiGianBatDau || ''
    formData.thoiGianKetThuc = data.thoiGianKetThuc
    formData.viTri = data.viTri || ''
    formData.videoCallUrl = data.videoCallUrl
    formData.tenNguoiToChuc = data.tenNguoiToChuc || props.event.tenNguoiToChuc || ''
    if (data.danhSachThamGia) {
        formData.danhSachThamGia = data.danhSachThamGia.split(',').map((item) => item.trim())
        formData.danhSachThamGia.push(props.event.maNhanVien)
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
    }
}

const saveSuccess = () => {
    emit('reloadData')
}
const deleteMeeting = async () => {
    try {
        const confirmResult = await Swal.fire({
            title: 'Xác nhận xóa cuộc họp!',
            text: 'Bạn đồng ý xóa cuộc họp này?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Hủy bỏ',
        })
        if (confirmResult.isConfirmed) {
            const response = await del(`/api/v1/meetings/${props.event.maCuocHop}`)
            if (response) {
                Swal.fire({
                    title: t('meeting.swal.delete.success.title'),
                    text: t('meeting.swal.delete.success.text'),
                    icon: 'success',
                }).then(() => {
                    emit('reloadData')
                })
            }
        }
    } catch (error) {
        Swal.fire({
            title: t('meeting.swal.delete.fail.title'),
            text: t('meeting.swal.delete.fail.text'),
            icon: 'error',
        })
        console.error(error)
    }
    saveSuccess()
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
    saveSuccess()
}

const createMeeting = async () => {
    if (validate(formData)) {
        return
    }
    try {
        const response = await post('/api/v1/meetings', formData)

        if (formData.danhSachThamGia.length > 0) {
            const chiTietCuocHop = {
                maNhanVien: formData.maNhanVien,
                thoiGianBatDau: formData.thoiGianBatDau,
                thoiGianKetThuc: formData.thoiGianKetThuc,
                nguoiToChuc: formData.nguoiToChuc,
                tenCuocHop: formData.tenCuocHop,
                danhSachMaNhanVien: formData.danhSachThamGia,
            }
            try {
                const chiTietResponse = await post('/api/v1/chi-tiet-cuoc-hop', chiTietCuocHop)
            } catch (error) {
                console.error('Lỗi khi tạo chi tiết cuộc họp cho nhân viên', chiTietCuocHop.maNhanVien, error)
            }
        }
        if (response) {
            Swal.fire({
                title: t('meeting.swal.save.success.title'),
                text: t('meeting.swal.save.success.text'),
                icon: 'success',
                timer: 1500,
            })
        }
    } catch (error) {
        console.error('Lỗi khi tạo cuộc họp:', error)
        Swal.fire({
            title: t('meeting.swal.save.fail.title'),
            text: t('meeting.swal.save.fail.text'),
            icon: 'error',
            timer: 1500,
        })
    }
    saveSuccess()
}
const updateMeeting = async () => {
    if (validate(formData)) {
        return
    }
    try {
        const response = await put('/api/v1/meetings', formData)
        if (formData.danhSachThamGia.length > 0) {
            const chiTietCuocHop = {
                maNhanVien: formData.maNhanVien,
                thoiGianBatDau: formData.thoiGianBatDau,
                thoiGianKetThuc: formData.thoiGianKetThuc,
                nguoiToChuc: formData.nguoiToChuc,
                tenCuocHop: formData.tenCuocHop,
                danhSachMaNhanVien: formData.danhSachThamGia,
            }
            try {
                const chiTietResponse = await post('/api/v1/chi-tiet-cuoc-hop', chiTietCuocHop)
            } catch (error) {
                console.error('Lỗi khi tạo chi tiết cuộc họp cho nhân viên', chiTietCuocHop.maNhanVien, error)
            }
        }
        if (response) {
            Swal.fire({
                title: t('meeting.swal.update.success.title'),
                text: t('meeting.swal.update.success.text'),
                icon: 'success',
                timer: 1500,
            })
        }
    } catch (error) {
        console.error(error)
        Swal.fire({
            title: t('meeting.swal.update.fail.title'),
            text: t('meeting.swal.update.fail.text'),
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
