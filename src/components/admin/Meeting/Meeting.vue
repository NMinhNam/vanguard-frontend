<template>
    <div class="container mt-4">
        <FullCalendar :options="calendarOptions" />
        <div v-if="showPopup" class="popup show" tabindex="-1" aria-hidden="false">
            <div class="popup-content modal-dialog">
                <div class="modal-content p-4">
                    <div class="modal-body">
                        <!-- Component Chi Tiết -->
                        <MeetingDetail :event="selectedEvent" @reloadData="getMeetings" />
                    </div>
                    <div class="modal-footer d-flex justify-content-end align-items-end">
                        <i @click="showPopup = false" class="text-danger fs-3 fa-solid fa-circle-xmark"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, watch, computed, onMounted } from 'vue'
import { get } from '@/stores/https'
import MeetingDetail from './MeetingDetail.vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import vn from '@fullcalendar/core/locales/vi'
import en from '@fullcalendar/core/locales/en-gb'
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()

const user = ref(sessionStorage.getItem('user'))
const userLogin = ref({})
const showPopup = ref(false)
const listMeeting = ref([])

onMounted(async () => {
    await getUserLogin()
    await getMeetings()
})

const getUserLogin = async () => {
    try {
        const username = user.value
        const response = await get('/api/v1/employees/me', { username })
        userLogin.value = response.data
    } catch (error) {
        console.error(error)
    }
}

const getMeetings = async () => {
    try {
        const maNhanVien = userLogin.value.maNhanVien
        const response = await get(`/api/v1/meetings/employee/${maNhanVien}`)
        listMeeting.value = response.data
    } catch (error) {
        console.error(error)
    }
    console.log(listMeeting.value)
    showPopup.value = false
}

const selectedEvent = ref({
    maCuocHop: null,
    thoiGianBatDau: null,
})

const calendarEvents = computed(() =>
    listMeeting.value.map((meeting) => ({
        id: meeting.maCuocHop,
        title: meeting.tenCuocHop,
        start: meeting.thoiGianBatDau,
        end: meeting.thoiGianKetThuc,
        viTri: meeting.viTri,
        ghiChu: meeting.ghiChu,
        tenNguoiToChuc: meeting.tenNguoiToChuc,
        maNguoiToChuc: meeting.maNguoiToChuc,
        videoCallUrl: meeting.videoCallUrl,
        danhSachThamGia: meeting.danhSachThamGia,
    })),
)

watch(locale, (newLang) => {
    calendarOptions.value.locale = newLang === 'vn' ? vn : en
})

watch(calendarEvents, (newEvents) => {
    calendarOptions.value.events = newEvents
})

const calendarOptions = ref({
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    timeZone: 'local',
    locales: [vn, en],
    headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth,timeGridFourDay',
    },
    editable: true,
    views: {
        timeGridFourDay: {
            type: 'timeGrid',
            duration: { days: 4 },
            buttonText: '4 days',
        },
    },
    eventClick: function (info) {
        showPopup.value = true
        selectedEvent.value = {
            maCuocHop: info.event.id,
        }
        info.jsEvent.preventDefault()
        console.log(selectedEvent.value)
    },
    dateClick: function (info) {
        showPopup.value = true
        selectedEvent.value = {
            thoiGianBatDau: info.dateStr,
        }
    },
    events: calendarEvents.value,
})
</script>



<style scoped>
/* Popup container */
.popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Màu nền tối với độ trong suốt */
    display: flex;
    justify-content: center;
    align-items: center; /* Popup luôn ở giữa màn hình */
    z-index: 1050; /* Đảm bảo popup luôn trên các phần tử khác */
    opacity: 0; /* Ban đầu ẩn */
    visibility: hidden; /* Ban đầu ẩn */
    transition: opacity 0.3s ease, visibility 0.3s ease;
}

/* Hiển thị popup */
.popup.show {
    opacity: 1; /* Hiển thị rõ */
    visibility: visible;
}

/* Nội dung bên trong popup */
.popup-content {
    background-color: #fff; /* Nền trắng */
    border-radius: 12px; /* Bo góc */
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3); /* Đổ bóng */
    transform: translateY(-30px); /* Bắt đầu với vị trí hơi cao hơn */
    transition: transform 0.3s ease, opacity 0.3s ease;
    max-width: 800px; /* Giới hạn chiều rộng */
    width: 90%; /* Chiếm 90% chiều rộng màn hình */
    padding: 1.5rem; /* Khoảng cách bên trong */
}

/* Khi popup xuất hiện */
.popup.show .popup-content {
    transform: translateY(0); /* Trả về vị trí ban đầu */
}

/* Nút đóng */
.modal-footer {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 10; /* Đặt trên các nội dung khác */
}

.modal-footer i {
    cursor: pointer; /* Biểu tượng tay */
    transition: transform 0.2s ease;
}

.modal-footer i:hover {
    transform: scale(1.2); /* Tăng kích thước khi hover */
}
</style>