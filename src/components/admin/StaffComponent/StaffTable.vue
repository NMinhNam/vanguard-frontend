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
                    <th class="text-center" scope="col">{{ $t('staffManagement.items.tool') }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="paginatedStaffs.length === 0" style="text-align: center; font-style: italic">
                    <td colspan="10">Không tìm thấy nhân viên</td>
                </tr>
                <tr
                    v-for="(staff, index) in paginatedStaffs"
                    :key="staff.maNhanVien"
                    @dblclick="$router.push(`/${role}/staff/` + staff.maNhanVien)"
                >
                    <td>{{ (props.currentPage - 1) * props.pageSize + index + 1 }}</td>
                    <td>{{ staff.hoTen }}</td>
                    <td>{{ staff.dienThoai }}</td>
                    <td>{{ staff.email }}</td>
                    <td class="text-center">
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
                    <td class="text-center">
                        <button class="btn btn-danger" @click="btnDeleteNhanVien_click(staff.maNhanVien)">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
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
import { del } from '@/stores/https'
const { t, locale } = useI18n()
const role = sessionStorage.getItem('role').toLowerCase()
console.log(role)
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
    getAllStaff: {
        type: Function,
    },
})

const btnDeleteNhanVien_click = async (maNhanVien) => {
    const result = await Swal.fire({
        title: 'Bạn thật muốn xóa nhân viên này?',
        text: 'Bạn thật sự muốn xóa nhân viên này?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy bỏ',
        reverseButtons: true,
    })

    if (result.isConfirmed) {
        try {
            const response = await del(`/api/v1/employees/${maNhanVien}`)
            if (response.status === 200) {
                Swal.fire({
                    title: 'Xóa nhân viên!',
                    text: 'Xóa nhân viên thành công.',
                    icon: 'success',
                    timer: 1500,
                })
            }
        } catch (e) {
            Swal.fire({
                title: 'Error!',
                text: 'Failed to delete staff member.',
                icon: 'error',
                timer: 1500,
            })
            console.error(e)
        }
        props.getAllStaff()
    }
}

const filteredStaffs = computed(() => {
    let staffs = props.listStaff

    if (props.searchQuery) {
        staffs = staffs.filter((staff) => staff.hoTen.toLowerCase().includes(props.searchQuery.toLowerCase()))
    }

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
