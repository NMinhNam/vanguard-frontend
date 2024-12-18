<template>
    <HeadMenu @setTrangThaiApprove="setApproveInfo" :approveDetail="approveDetail" :loading="loading" />

    <div class="container">
        <ApproveDetailForm :approveDetail="approveDetail" />
        <ApproveTab @setActiveTab="setActiveTab" :activeTab="activeTab" />
        <div class="m-3">
            <Note :approveDetail="approveDetail" v-if="activeTab === 'Note'" />
            <ListApprove :approveDetail="approveDetail" v-if="activeTab === 'ListApprove'" />
        </div>
    </div>
</template>

<script setup>
import HeadMenu from './HeadMenu.vue'
import ApproveDetailForm from '@/components/admin/ApproveDetail/ApproveDetailForm.vue'
import { ref, onMounted, reactive } from 'vue'
import { get, put } from '@/stores/https'
import ApproveTab from './ApproveTab.vue'
import Note from './Note.vue'
import ListApprove from './ListApprove.vue'
import router from '@/router'

const activeTab = ref('Note')
const userLogin = ref({})
const approveDetail = ref({})
const loading = ref(false)
const maDon = ref('')

onMounted(async () => {
    maDon.value = router.currentRoute.value.params.id
    await getUserLogin()
    await getAproveInfoByMaDon(maDon.value)
})

const approveInfo = reactive({
    maDon: '',
    maNhanVien: '',
    trangThai: 0,
    ghiChu: '',
})

const getUserLogin = async () => {
    try {
        const username = sessionStorage.getItem('user')
        const response = await get('/api/v1/employees/me', { username })
        if (response) {
            userLogin.value = response.data
        }
    } catch (error) {
        console.error(error)
    }
}

const setActiveTab = (tab) => {
    activeTab.value = tab
}

const setApproveInfo = async (maDon, trangThai, ghiChu) => {
    approveInfo.maDon = maDon
    approveInfo.maNhanVien = userLogin.value.maNhanVien
    approveInfo.trangThai = trangThai
    approveInfo.ghiChu = ghiChu
    updateApprove()
}

const updateApprove = async () => {
    try {
        const response = await put('/api/v1/approvals', approveInfo)
        if (response) {
            getAproveInfoByMaDon(maDon.value)
        }
        Swal.fire({
            title: 'Thành công',
            text: 'Cập nhật trạng thái phê duyệt thành công',
            icon: 'success',
            timer: 1500,
        })
    } catch (error) {
        Swal.fire({
            title: 'Thất bại',
            text: 'Cập nhật trạng thái phê duyệt thất bại',
            icon: 'error',
            timer: 1500,
        })
        console.error(error)
    }
}

const getAproveInfoByMaDon = async (maDon) => {
    const maNhanVien = userLogin.value.maNhanVien
    try {
        const response = await get(`/api/v1/approvals/search`, { maDon, maNhanVien })
        if (response && response.data) {
            approveDetail.value = response.data
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
</script>
