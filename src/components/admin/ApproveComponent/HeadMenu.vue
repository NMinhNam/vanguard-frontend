<template>
    <div class="head-menu border-0 border-bottom border-secondary-subtle col-12">
        <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center">
                <h5 class="mb-0">Approve manager</h5>
            </div>
            <div class="form-group fs has-search me-2">
                <span class="material-symbols-outlined form-control-feedback">search</span>
                <input
                    type="search"
                    class="form-control"
                    @input="$emit('search', searchQuery)"
                    placeholder="Search"
                    v-model="searchQuery"
                />
            </div>
            <div class="form-group me-2">
                <DatePicker
                    v-model="dateSelected"
                    :range="{ partialRange: false }"
                    placeholder="Chọn khoảng ngày"
                    auto-apply
                    :teleport="true"
                    :auto-position="true"
                    :enable-time-picker="false"
                    format="dd/MM/yyyy"
                    @update:model-value="$emit('filterDate', dateSelected)"
                />
            </div>

            <div class="form-group me-2">
                <select
                    id="status-filter"
                    class="form-select"
                    v-model="selectedStatus"
                    @change="$emit('filterStatus', selectedStatus)"
                >
                    <option value="">Trạng thái</option>
                    <option value="1">Chờ duyệt</option>
                    <option value="2">Đã duyệt</option>
                    <option value="3">Từ chối</option>
                </select>
            </div>

            <div class="pagination d-flex justify-content-center align-items-center">
                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <a
                            class="nav-link"
                            :class="{
                                active: activeTab === 'table',
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
                            :class="{ active: activeTab === 'card', 'text-dark': activeTab !== 'card' }"
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
import { ref } from 'vue'
const emit = defineEmits(['tab-change', 'prevPage', 'nextPage', 'search', 'filterDate', 'filterStatus'])
const searchQuery = ref('')
const selectedStatus = ref('')
const dateSelected = ref([])
import DatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const props = defineProps({
    activeTab: String,
    currentPage: {
        type: Number,
        default: 1,
    },
    totalPages: {
        type: Number,
        default: 1,
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
