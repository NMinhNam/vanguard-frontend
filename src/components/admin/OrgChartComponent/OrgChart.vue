<template>
    <div class="bg-body-secondary">
        <header>
            <HeadMenu @tab-selected="activeTab = $event" />
        </header>

        <!-- Main content area -->
        <div>
            <OrgDepartment v-if="activeTab === 'OrgDepartment'" />
            <OrgStaff v-if="activeTab === 'OrgStaff'" />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import HeadMenu from './HeadMenu.vue' // Import HeadMenu component
import OrgDepartment from './OrgDepartment.vue'
import OrgStaff from './OrgStaff.vue'

const activeTab = ref('OrgDepartment') // Track the selected component
</script>

<style scoped></style>
