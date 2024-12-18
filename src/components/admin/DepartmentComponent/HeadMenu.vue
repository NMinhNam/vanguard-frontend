<template>
    <div class="head-menu border-0 border-bottom border-secondary-subtle col-12">
        <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center">
                <button class="btn btn-primary me-2" @click="showPopup = true">{{ t('department.new_btn') }}</button>
                <h5 class="mb-0">{{ t('department.title') }}</h5>
            </div>

            <div class="form-group fs has-search me-2">
                <span class="material-symbols-outlined form-control-feedback">search</span>
                <input
                    type="search"
                    class="form-control"
                    @input="$emit('search', searchQuery)"
                    :placeholder="t('department.search')"
                    v-model="searchQuery"
                />
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

    <div v-if="showPopup" class="popup show" tabindex="-1" aria-hidden="false">
        <div class="popup-content modal-dialog">
            <div class="modal-content p-4">
                <div class="modal-body">
                    <AddDepartmentPopup
                        :departmentDetail="departmentDetail"
                        @closePopup="showPopup = false"
                        :getDepartment="getDepartment"
                    />
                </div>
                <div class="modal-footer d-flex justify-content-end align-items-end">
                    <i @click="showPopup = false" class="text-danger fs-3 fa-solid fa-circle-xmark"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import AddDepartmentPopup from './AddDepartmentPopup.vue'
import { useI18n } from 'vue-i18n'
import { get } from '@/stores/https'

const { t, locale } = useI18n()
const searchQuery = ref('')
const showPopup = ref(false)
const emit = defineEmits(['tab-change', 'search'])

const props = defineProps({
    activeTab: {
        type: String,
        required: true,
    },
    getDepartment: {
        type: Function,
    },
    departmentDetail: {
        type: Object,
    },
})

watch(
    () => props.departmentDetail, // Theo dõi props.positionDetail
    (newValue, oldValue) => {
        if (newValue !== oldValue && newValue && oldValue) {
            showPopup.value = true
        }
    },
    { deep: true, immediate: true },
)
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
    z-index: 100;
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
