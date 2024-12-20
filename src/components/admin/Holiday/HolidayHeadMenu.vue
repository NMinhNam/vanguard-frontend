<template>
    <div class="head-menu border-0 border-bottom border-secondary-subtle col-12">
        <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center">
                <button class="btn btn-primary me-2" @click="showPopup = true">
                    <i class="fa-solid fa-plus me-1"></i>
                    {{ $t('configuration.holiday.new') }}
                </button>
                <h5 class="mb-0 fw-bolder">
                    {{ $t('configuration.holiday.title') }}
                </h5>
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
                <span>{{ $t('configuration.holiday.page') }} {{ currentPage }} / {{ totalPages }}</span>
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
    <div :class="['popup', { show: showPopup }]" tabindex="-1">
        <div class="popup-content modal-dialog">
            <div class="modal-content p-4">
                <h2 class="modal-title border-bottom mb-4">{{ $t('configuration.holiday.title_new') }}</h2>
                <div class="modal-body">
                    <AddHolidayPopup :getNgayLe="getNgayLe" />
                </div>
                <div class="modal-footer d-flex justify-content-end align-items-end">
                    <i @click="showPopup = false" class="text-danger fs-3 fa-solid fa-circle-xmark"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'
import AddHolidayPopup from './AddHolidayPopup.vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const showPopup = ref(false)
const searchQuery = ref('')

const emit = defineEmits(['prevPage', 'nextPage', 'search', 'refresh'])

const props = defineProps({
    currentPage: {
        type: Number,
        default: 1,
    },
    totalPages: {
        type: Number,
        default: 1,
    },
    getNgayLe: {
        type: Function,
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

.popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: start;
    z-index: 10;
    opacity: 0;
    visibility: hidden;
    transition:
        opacity 0.3s ease,
        visibility 0.3s ease;
}

.popup.show {
    opacity: 1;
    visibility: visible;
}

.popup-content {
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
    transform: translateY(-20px);
    transition: transform 0.3s ease;
    max-width: 500px;
    width: 90%;
    margin-top: 1rem;
}

.popup.show .popup-content {
    transform: translateY(0);
}
.modal-footer {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 1;
}
</style>
