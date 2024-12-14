<template>
    <div class="container-fluid mt-3" style="overflow-x: auto">
        <HeadMenu @tab-change="setActiveTab" :activeTab="activeTab"/>
        <div class="row">
            <div>
                <Card v-if="activeTab === 'card'" :listPositon="listPositon" />
                <Table v-if="activeTab === 'table'" :listPositon="listPositon" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { get } from '@/stores/https'

import Card from './Card.vue'
import HeadMenu from './HeadMenu.vue'
import Table from './Table.vue'

const activeTab = ref('table')
const listPositon = ref([])
const searchQuery = ref('')

const setActiveTab = (tab) => {
    activeTab.value = tab
}

onMounted(async () => {
    await getAllPostion()
})

const getAllPostion = async () => {
    try {
        const response = await get('/api/v1/chuc-vu')
        listPositon.value = response.data || []
    } catch (error) {
        console.error('Error fetching position data:', error)
    }   
}
const applyFilters = () => {
    filteredRecruitments.value = listRecruitment.value.filter((recruitment) => {
        const matchesQuery =
            searchQuery.value === '' ||
            (recruitment.tenViTri && recruitment.tenViTri.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
            (recruitment.moTa && recruitment.moTa.toLowerCase().includes(searchQuery.value.toLowerCase()))
        return matchesQuery
    })
}
</script>
