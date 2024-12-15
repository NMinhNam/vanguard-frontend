<template>
    <div class="p-4">
        <div class="row row-cols-1 row-cols-md-3 g-4">
            <div class="col" v-for="department in paginatedDepartments" :key="department.maPhongBan">
                <div class="card h-100">
                    <div class="card-body d-flex p-0">
                        <div class="px-3 py-2 flex-grow-1 p-3">
                            <div class="d-flex justify-content-between align-items-start mb-3">
                                <h5 class="card-title">{{ department.tenPhongBan }}</h5>
                                <span class="status-indicator">:</span>
                            </div>
                            <div>
                                <button class="btn btn-primary mb-3">{{ department.soLuongNhanVien }} {{ $t('department.table.staff') }}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="pagination d-flex justify-content-center align-items-center">
            <button
                class="btn btn-secondary rounded-0 mx-1 d-flex align-items-center"
                :disabled="props.currentPage === 1"
                @click="goToPage(props.currentPage - 1)"
            >
                <span class="material-symbols-outlined"> keyboard_double_arrow_left </span>
            </button>
            <span>{{ $t('department.page') }} {{ props.currentPage }} / {{ totalPages }}</span>
            <button
                class="btn btn-secondary rounded-0 d-flex align-items-center"
                :disabled="props.currentPage === totalPages"
                @click="goToPage(props.currentPage + 1)"
            >
                <span class="material-symbols-outlined"> keyboard_double_arrow_right </span>
            </button>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const props = defineProps({
    departments: {
        type: Array,
    },
    searchQuery: {
        type: String,
        default: '',
    },
    currentPage: {
        type: Number,
        default: 1,
    },
    pageSize: {
        type: Number,
        default: 9,
    },
})

const filteredDepartments = computed(() => {
    console.log(props.searchQuery)
    let departments = props.departments
    if (props.searchQuery) {
        departments = departments.filter((department) =>
            department.tenPhongBan.toLowerCase().includes(props.searchQuery.toLowerCase()),
        )
    }
    return departments
})

const paginatedDepartments = computed(() => {
    const start = (props.currentPage - 1) * props.pageSize
    const end = start + props.pageSize
    return filteredDepartments.value.slice(start, end)
})

const totalPages = computed(() => {
    return Math.ceil(filteredDepartments.value.length / props.pageSize)
})

const emit = defineEmits(['updatePage'])

const goToPage = (page) => {
    emit('updatePage', page)
}
</script>