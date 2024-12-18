<template>
    <div class="head-menu border-0 border-secondary-subtle col-12">
        <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center">
                <h5 class="mb-0 fw-bolder">{{ $t('pay_roll.title') }}</h5>
            </div>
            <div class="pagination d-flex justify-content-center align-items-center">
                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <a
                            class="nav-link"
                            :class="{
                                'active text-primary': activeTab === 'table',
                                'text-dark': activeTab !== 'table',
                            }"
                            @click.prevent="$emit('tab-change', 'table')"
                            href="#"
                        >
                            <i class="fas fa-table"></i>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a
                            class="nav-link"
                            :class="{ 'active text-primary': activeTab === 'card', 'text-dark': activeTab !== 'card' }"
                            @click.prevent="$emit('tab-change', 'card')"
                            href="#"
                        >
                            <i class="fas fa-bars"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    activeTab: {
        type: String,
        required: true,
    },
})
</script>

<style scoped>
.head-menu {
    padding: 0.88rem 1rem;
    width: 100%;
    position: relative;
    height: calc(100% - 60px - 0.88rem * 2);
    background-color: var(--color-main);
    transition: var(--tran-05);
    border: 1px solid var(--color-border);
}
</style>
