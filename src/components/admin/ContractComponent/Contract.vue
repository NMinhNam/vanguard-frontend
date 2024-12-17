<template>
    <div class="container-fluid mt-3" style="overflow-x: auto">
        <HeadMenu @search="handleSearch" @tab-change="setActiveTab" :activeTab="activeTab" />
        <div class="row">
            <div>
                <Card
                    v-if="activeTab === 'card'"
                    :searchQuery="searchQuery"
                    :currentPage="currentPage"
                    :pageSize="pageSize"
                    :listContract="listContract"
                    @updatePage="currentPage = $event"
                />
                <Table
                    v-if="activeTab === 'table'"
                    :searchQuery="searchQuery"
                    :currentPage="currentPage"
                    :pageSize="pageSize"
                    :listContract="listContract"
                    @updatePage="currentPage = $event"
                />
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
const listContract = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const searchQuery = ref('')

const handleSearch = (query) => {
    searchQuery.value = query
}
const setActiveTab = (tab) => {
    activeTab.value = tab
}

onMounted(async () => {
    await getAllContract()
})

const getAllContract = async () => {
    try {
        const response = await get('/api/v1/contracts')
        listContract.value = response.data || []
    } catch (error) {
        console.error('Error fetching contract data:', error)
    }
}
</script>
