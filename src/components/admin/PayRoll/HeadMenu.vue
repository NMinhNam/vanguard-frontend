<template>
    <div class="head-menu border-0 border-bottom border-secondary-subtle col-12">
        <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center">
                <h5 class="mb-0 fw-bolder">Bảng lương tổng hợp tháng 12</h5>
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
            <div class="pagination d-flex justify-content-center align-items-center">
                <span>Trang {{ currentPage }} / {{ totalPages }}</span>
                <button
                    class="btn btn-secondary rounded-0 mx-1 d-flex align-items-center"
                    :disabled="currentPage === 1"
                    @click="$emit('prevPage')"
                >
                    <span class="material-symbols-outlined"> keyboard_double_arrow_left </span>
                </button>
                <button
                    class="btn btn-secondary rounded-0 d-flex align-items-center"
                    :disabled="currentPage === totalPages"
                    @click="$emit('nextPage')"
                >
                    <span class="material-symbols-outlined"> keyboard_double_arrow_right </span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const searchQuery = ref('')

const emit = defineEmits(['prevPage', 'nextPage', 'search'])

const props = defineProps({
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
