<template>
    <div class="container-fluid mt-3" style="overflow-x: auto">
        <HeadMenu @tab-change="setActiveTab" :activeTab="activeTab" @search="handleSearch" />
        <div class="row" style="overflow-x: auto">
            <div>
                <Card
                    v-if="activeTab === 'card'"
                    :searchQuery="searchQuery"
                    :currentPage="currentPage"
                    :pageSize="pageSize"
                    :listRecruitment="listRecruitment"
                    @updatePage="currentPage = $event"
                />
                <Table
                    v-if="activeTab === 'table'"
                    :searchQuery="searchQuery"
                    :currentPage="currentPage"
                    :pageSize="pageSize"
                    :listRecruitment="listRecruitment"
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
const listRecruitment = ref([])
const searchQuery = ref('')
const currentPage = ref(1)
const pageSize = ref(9)

const setActiveTab = (tab) => {
    activeTab.value = tab
    currentPage.value = 1
}

const handleSearch = (query) => {
    searchQuery.value = query
}

onMounted(async () => {
    await getAllRecruitment()
})

const getAllRecruitment = async () => {
    try {
        const response = await get('/api/v1/recruitment-positions')
        listRecruitment.value = (response.data || []).map((item) => ({
            ...item,
            isFull: item.soLuongUngTuyen >= item.soLuongTuyen, // Đánh dấu "đã đầy" nếu số lượng ứng tuyển >= số lượng cần tuyển
        }))
    } catch (error) {
        console.error('Error fetching recruitment data:', error)
    }
}
</script>
