<template>
    <div class="container-fluid mt-3" style="overflow-x: auto">
        <HeadMenu
            @tab-change="setActiveTab"
            @search="handleSearch"
            @filterDate="handleFilterDate"
            @filterStatus="handleFilterStatus"
            :activeTab="activeTab"
        />
        <div class="row p-0" style="overflow-x: auto">
            <div>
                <Card
                    @setTrangThaiApprove="setApproveInfo"
                    :searchQuery="searchQuery"
                    :currentPage="currentPage"
                    :pageSize="pageSize"
                    :listApprove="listApprove"
                    :statusSelected="statusSelected"
                    @updatePage="currentPage = $event"
                    v-if="activeTab === 'card'"
                />
                <Table
                    @setTrangThaiApprove="setApproveInfo"
                    :searchQuery="searchQuery"
                    :currentPage="currentPage"
                    :pageSize="pageSize"
                    :statusSelected="statusSelected"
                    :filterDate="filterDate"
                    @updatePage="currentPage = $event"
                    :listApprove="listApprove"
                    v-if="activeTab === 'table'"
                />
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref, reactive } from 'vue'
import { get, put } from '@/stores/https'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

import Card from './Card.vue'
import HeadMenu from './HeadMenu.vue'
import Table from './Table.vue'

const activeTab = ref('table')
const userLogin = ref({})
const listApprove = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const searchQuery = ref('')
const statusSelected = ref('')
const filterDate = ref(null)
const handleSearch = (query) => {
    searchQuery.value = query
}

const handleFilterDate = (data) => {
    filterDate.value = data
}

const handleFilterStatus = (status) => {
    statusSelected.value = status
}

const approveInfo = reactive({
    maDon: '',
    maNhanVien: '',
    trangThai: 0,
    ghiChu: '',
})

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
            Swal.fire({
                title: t('approve.swal.success.title'),
                text: t('approve.swal.success.text'),
                icon: 'success',
                timer: 1500,
            })
            getAllApprove()
        }
    } catch (error) {
        Swal.fire({
            title: t('approve.swal.fail.title'),
            text: t('approve.swal.fail.text'),
            icon: 'error',
            timer: 1500,
        })
        console.error(error)
    }
}

const setActiveTab = (tab) => {
    activeTab.value = tab
    currentPage.value = 1
}

onMounted(async () => {
    await getUserLogin()
    await getAllApprove()
})

const getUserLogin = async () => {
    try {
        const username = sessionStorage.getItem('user')
        const response = await get('/api/v1/employees/me', { username })
        userLogin.value = response.data
    } catch (error) {
        console.error(error)
    }
}

const getAllApprove = async () => {
    try {
        const maNhanVienLogin = userLogin.value.maNhanVien
        const response = await get(`/api/v1/approvals/employee/${maNhanVienLogin}`)
        if (response) {
            listApprove.value = response.data
        }
    } catch (error) {
        console.error(error)
    }
}
</script>