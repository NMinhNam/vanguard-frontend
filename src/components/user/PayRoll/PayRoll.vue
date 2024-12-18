<script setup>
import HeaderPayRoll from './HeaderPayRoll.vue'
import Content from './ContentPayRoll.vue'
import tablePayroll from './tablePayroll.vue'
import { ref } from 'vue'
const activeTab = ref('card')
const setActiveTab = (newTab) => {
    activeTab.value = newTab
}
</script>
<template>
    <div class="container-fluid mt-3">
        <div class="row">
            <HeaderPayRoll @tab-change="setActiveTab" :activeTab="activeTab" />
            <div>
                <Content v-if="activeTab === 'card'" />
                <tablePayroll v-if="activeTab === 'table'" />
            </div>
        </div>
    </div>
</template>
