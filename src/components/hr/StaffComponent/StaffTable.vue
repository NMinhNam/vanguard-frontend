
<template>
    <div class="table-responsive">
        <table class="table table-hover align-middle">
            <thead class="table-light">
                <tr>
                    <th scope="col">STT</th>
                    <th scope="col">{{ $t('staffManagement.items.full_name') }}</th>
                    <th scope="col">{{ $t('staffManagement.items.phone') }}</th>
                    <th scope="col">{{ $t('staffManagement.items.email') }}</th>
                    <th scope="col">{{ $t('staffManagement.items.status') }}</th>
                    <th scope="col">{{ $t('staffManagement.items.department') }}</th>
                    <th scope="col">{{ $t('staffManagement.items.position') }}</th>
                    <th scope="col">{{ $t('staffManagement.items.manager') }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="paginatedStaffs.length === 0" style="text-align: center; font-style: italic">
                    <td colspan="10">Không tìm thấy nhân viên</td>
                </tr>
                <tr
                    v-for="(staff, index) in paginatedStaffs"
                    :key="staff.maNhanVien"
                    @dblclick="$router.push('/admin/staff/' + staff.maNhanVien)"
                >
                    <td>{{ (props.currentPage - 1) * props.pageSize + index + 1 }}</td>
                    <td>{{ staff.hoTen }}</td>
                    <td>{{ staff.dienThoai }}</td>
                    <td>{{ staff.email }}</td>
                    <td>
                        <span
                            class="material-symbols-outlined"
                            :class="index % 2 == 0 && !index % 3 == 0 ? 'text-danger' : 'text-success'"
                        >
                            radio_button_checked
                        </span>
                    </td>
                    <td>{{ staff.tenPhongBan }}</td>
                    <td>{{ staff.tenChucVu }}</td>
                    <td>
                        <div class="d-flex align-items-center">
                            <p class="mb-0">{{ staff.tenQuanLy }}</p>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="pagination d-flex justify-content-center align-items-center">
        <button
            class="btn btn-secondary rounded-0 mx-1 d-flex align-items-center"
            :disabled="props.currentPage === 1"
            @click="goToPage(props.currentPage - 1)"
        >
            <span class="material-symbols-outlined"> keyboard_double_arrow_left </span>
        </button>
        <span>Trang {{ props.currentPage }} / {{ totalPages }}</span>
        <button
            class="btn btn-secondary rounded-0 d-flex align-items-center"
            :disabled="props.currentPage === totalPages"
            @click="goToPage(props.currentPage + 1)"
        >
            <span class="material-symbols-outlined"> keyboard_double_arrow_right </span>
        </button>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()
const props = defineProps({
    listStaff: {
        type: Array,
        default: () => [],
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
        default: 10,
    },
    departmentSelected: {
        type: Array,
        default: () => [],
    },
    chucVuSelected: {
        type: String,
        default: '',
    },
})
const filteredStaffs = computed(() => {
    let staffs = props.listStaff

    // Lọc theo từ khóa
    if (props.searchQuery) {
        staffs = staffs.filter((staff) => staff.hoTen.toLowerCase().includes(props.searchQuery.toLowerCase()))
    }

    // Lọc theo phòng ban
    if (props.departmentSelected.length > 0) {
        staffs = staffs.filter((staff) => props.departmentSelected.includes(staff.maPhongBan))
    }

    if (props.chucVuSelected) {
        staffs = staffs.filter((staff) => props.chucVuSelected === staff.maChucVu)
    }
    return staffs
})

const paginatedStaffs = computed(() => {
    const start = (props.currentPage - 1) * props.pageSize
    const end = start + props.pageSize
    return filteredStaffs.value.slice(start, end)
})

const totalPages = computed(() => {
    return Math.ceil(filteredStaffs.value.length / props.pageSize)
})

const emit = defineEmits(['updatePage'])

const goToPage = (page) => {
    emit('updatePage', page)
}
</script>
