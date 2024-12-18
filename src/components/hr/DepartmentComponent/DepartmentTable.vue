<template>
    <div>
        <table class="table table-hover align-middle table-responsive">
            <thead class="table-light">
                <tr>
                    <th scope="col">{{ t('department.table.no') }}</th>
                    <th scope="col">{{ t('department.table.name') }}</th>
                    <th scope="col">{{ t('department.table.manage') }}</th>
                    <th scope="col">{{ t('department.table.staff') }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="departments.length === 0" style="text-align: center; font-style: italic">
                    <td colspan="10">{{ t('department.table.search') }}</td>
                </tr>

                <tr v-for="(department, index) in paginatedDepartments" :key="department.maPhongBan">
                    <td>{{ (props.currentPage - 1) * props.pageSize + index + 1 }}</td>
                    <td>{{ department.tenPhongBan }}</td>
                    <td>
                        {{ department.truongPhong }}
                    </td>
                    <td>{{ department.soLuongNhanVien }}</td>
                </tr>
            </tbody>
        </table>
        <div class="pagination d-flex justify-content-center align-items-center">
            <button
                class="btn btn-secondary rounded-0 mx-1 d-flex align-items-center"
                :disabled="props.currentPage === 1"
                @click="goToPage(props.currentPage - 1)"
            >
                <span class="material-symbols-outlined"> keyboard_double_arrow_left </span>
            </button>
            <span>{{ t('department.page') }} {{ props.currentPage }} / {{ totalPages }}</span>
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
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const props = defineProps({
    departments: Array,
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
