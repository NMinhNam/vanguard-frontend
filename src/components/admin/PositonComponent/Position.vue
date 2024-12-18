<template>
    <div class="container-fluid mt-3" style="overflow-x: auto">
        <HeadMenu
            :positionDetail="positionDetail"
            @search="handleSearch"
            @tab-change="setActiveTab"
            :activeTab="activeTab"
        />
        <div class="row">
            <div>
                <Card
                    v-if="activeTab === 'card'"
                    :searchQuery="searchQuery"
                    :currentPage="currentPage"
                    :pageSize="pageSize"
                    @updatePage="currentPage = $event"
                    :listPositon="listPositon"
                />
                <Table
                    v-if="activeTab === 'table'"
                    @getPostionById="handlePostionDetail"
                    :searchQuery="searchQuery"
                    :currentPage="currentPage"
                    :pageSize="pageSize"
                    @updatePage="currentPage = $event"
                    :listPositon="listPositon"
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
const listPositon = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const searchQuery = ref('')
const positionDetail = ref({})

const handlePostionDetail = (detail) => {
    positionDetail.value = detail
}

const setActiveTab = (tab) => {
    activeTab.value = tab
}

const handleSearch = (query) => {
    searchQuery.value = query
}

onMounted(async () => {
    await getAllPostion()
})

const getAllPostion = async () => {
    try {
        const response = await get('/api/v1/positions')
        listPositon.value = response.data || []
    } catch (error) {
        console.error('Error fetching position data:', error)
    }
}
</script>
