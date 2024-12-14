<template>
    <div class="container-fluid mt-3" style="overflow-x: auto">
        <HeadMenu @tab-change="setActiveTab" :activeTab="activeTab" />
        <div class="row">
            <div>
                <Card v-if="activeTab === 'card'" :listContract="listContract" />
                <Table v-if="activeTab === 'table'" :listContract="listContract" />
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
const searchQuery = ref('')

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
