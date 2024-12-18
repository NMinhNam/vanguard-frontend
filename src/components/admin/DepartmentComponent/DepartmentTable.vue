<template>
    <div>
        <table class="table table-hover align-middle table-responsive">
            <thead class="table-light">
                <tr>
                    <th scope="col">{{ t('department.table.no') }}</th>
                    <th scope="col">{{ t('department.table.name') }}</th>
                    <th scope="col">{{ t('department.table.manage') }}</th>
                    <th scope="col">{{ t('department.table.staff') }}</th>
                    <th scope="col">{{ t('department.table.tool') }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="departments.length === 0" style="text-align: center; font-style: italic">
                    <td colspan="10">{{ t('department.table.search') }}</td>
                </tr>

                <tr
                    @dblclick="getDepartmentById(department.maPhongBan)"
                    v-for="(department, index) in paginatedDepartments"
                    :key="department.maPhongBan"
                >
                    <td>{{ (props.currentPage - 1) * props.pageSize + index + 1 }}</td>
                    <td>{{ department.tenPhongBan }}</td>
                    <td>
                        {{ department.truongPhong }}
                    </td>
                    <td>{{ department.soLuongNhanVien }}</td>
                    <td>
                        <button class="btn btn-danger" @click="btnDeletePhongBan_click(department.maPhongBan)">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </td>
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
import { computed, ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { get, del } from '@/stores/https'

const { t, locale } = useI18n()

const departmentDetailt = ref({})
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
    getDepartment: {
        type: Function,
        required: true,
    },
})

const btnDeletePhongBan_click = async (maPhongBan) => {
    try {
        const response = await del(`/api/v1/departments/${maPhongBan}`)
        if (response.status === 200) {
            Swal.fire({
                title: 'Delete department',
                text: 'Delete department successfully',
                icon: 'success',
                timer: 1500,
            })
        }
    } catch (e) {
        Swal.fire({
            title: 'Delete department',
            text: 'Delete department fail',
            icon: 'error',
            timer: 1500,
        })
        console.error(e)
    }
    props.getDepartment()
}

const getDepartmentById = async (maPhongBan) => {
    const response = await get(`/api/v1/departments/${maPhongBan}`)
    departmentDetailt.value = response.data
    emit('getDepartmentById', departmentDetailt.value)
}

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

const emit = defineEmits(['updatePage', 'getDepartmentById'])

const goToPage = (page) => {
    emit('updatePage', page)
}
</script>
