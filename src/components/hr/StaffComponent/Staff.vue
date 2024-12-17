<template>
    <div class="container-fluid mt-3" style="overflow-x: auto; background-color: var(--color-main)">
        <div class="row">
            <HeadMenu
                @tab-change="setActiveTab"
                @search="handleSearch"
                :activeTab="activeTab"
                @filter-change="handleFilterChucVu"
            />
            <div class="col-2 p-0">
                <ListgroupItem :departments="departments" @filterStaffByDepartment="handleFilterByDepartment" />
            </div>
            <div class="col-10 p-0" style="overflow-x: auto">
                <div>
                    <StaffTable
                        v-if="activeTab === 'table'"
                        :listStaff="listStaff"
                        :searchQuery="searchQuery"
                        :currentPage="currentPage"
                        :pageSize="pageSize"
                        :departmentSelected="departmentSelected"
                        :chucVuSelected="chucVuSelected"
                        @updatePage="currentPage = $event"
                    />
                    <StaffCard
                        v-if="activeTab === 'card'"
                        :listStaff="listStaff"
                        :searchQuery="searchQuery"
                        :currentPage="currentPage"
                        :pageSize="pageSize"
                        :chucVuSelected="chucVuSelected"
                        :departmentSelected="departmentSelected"
                        @updatePage="currentPage = $event"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import HeadMenu from './HeadMenu.vue'
import StaffTable from './StaffTable.vue'
import StaffCard from './StaffCard.vue'
import ListgroupItem from './ListgroupItem.vue'
import { get } from '@/stores/https'

const listStaff = ref([])
const activeTab = ref('table')
const currentPage = ref(1)
const pageSize = ref(12)
const searchQuery = ref('')
const departments = ref([])
const departmentSelected = ref([])
const chucVuSelected = ref('')

onMounted(async () => {
    await getAllStaff()
    await getAllDepartments()
})

const getAllStaff = async () => {
    const response = await get('/api/v1/employees')
    listStaff.value = response.data
}

const getAllDepartments = async () => {
    const response = await get('/api/v1/departments')
    departments.value = response.data
}

const handleFilterChucVu = (chucVu) => {
    chucVuSelected.value = chucVu
}

const handleSearch = (query) => {
    searchQuery.value = query
}

const handleFilterByDepartment = (selected) => {
    departmentSelected.value = selected
}

const setActiveTab = (newTab) => {
    activeTab.value = newTab
    currentPage.value = 1
}
</script>
