<template>
    <ul class="nav nav-tabs mt-4">
        <li class="nav-item">
            <a
                class="nav-link"
                href="#"
                @click.prevent="$emit('setActiveTab', 'Note')"
                :class="{ active: activeTab === 'Note' }"
                >Mô tả
            </a>
        </li>
        <li class="nav-item">
            <a
                class="nav-link"
                aria-current="page"
                href="#"
                @click.prevent="$emit('setActiveTab', 'ListApprove')"
                :class="{ active: activeTab === 'ListApprove' }"
                >Người phê duyệt</a
            >
        </li>
    </ul>
</template>

<script setup>
const props = defineProps({
    activeTab: String,
})
</script>
