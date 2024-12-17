<template>
    <div class="container-fluid mt-3" style="overflow-x: auto">
        <div class="row">
            <HeadMenu @tab-change="setActiveTab" :activeTab="activeTab" @search="handleSearch" />
            <div class="col-12" style="overflow-x: auto">
                <div>
                    <DepartmentTable
                        v-if="activeTab === 'table'"
                        :searchQuery="searchQuery"
                        :currentPage="currentPage"
                        :pageSize="pageSize"
                        @updatePage="currentPage = $event"
                        :departments="departments"
                    />
                    <DepartmentCard
                        v-if="activeTab === 'card'"
                        :searchQuery="searchQuery"
                        :currentPage="currentPage"
                        :pageSize="pageSize"
                        @updatePage="currentPage = $event"
                        :departments="departments"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import HeadMenu from './HeadMenu.vue'
import DepartmentTable from './DepartmentTable.vue'
import DepartmentCard from './DepartmentCard.vue'
import { ref, onMounted, h } from 'vue'
import { get } from '@/stores/https'

const departments = ref([])
const activeTab = ref('table')
const currentPage = ref(1)
const pageSize = ref(9)
const searchQuery = ref('')

onMounted(async () => {
    await getDepartments()
})

const handleSearch = (query) => {
    searchQuery.value = query
}

const getDepartments = async () => {
    try {
        const response = await get('/api/v1/departments')
        if (response) {
            departments.value = response.data
        }
    } catch (error) {
        console.error(error)
    }
}

const setActiveTab = (newTab) => {
    activeTab.value = newTab
    currentPage.value = 1
}
</script>
