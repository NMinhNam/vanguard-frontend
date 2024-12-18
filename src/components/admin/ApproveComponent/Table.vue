<template>
    <div class="table-responsive">
        <table class="table table-hover align-middle text-center">
            <thead class="table-light">
                <tr class="text-center">
                    <th scope="col">{{ t('approve.table.no') }}</th>
                    <th scope="col">{{ t('approve.table.approvedid') }}</th>
                    <th scope="col">{{ t('approve.table.ordercreater') }}</th>
                    <th scope="col">{{ t('approve.table.reason') }}</th>
                    <th scope="col">{{ t('approve.table.datesend') }}</th>
                    <th scope="col">{{ t('approve.table.reviewer') }}</th>
                    <th scope="col">{{ t('approve.table.approvaldate') }}</th>
                    <th scope="col">{{ t('approve.table.status') }}</th>
                    <th scope="col">{{ t('approve.table.act') }}</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(approve, index) in paginatedApproves"
                    :key="approve.maDon"
                    @dblclick="$router.push(`/admin/approve/${approve.maDon}`)"
                    style="cursor: pointer"
                >
                    <td>{{ (props.currentPage - 1) * props.pageSize + index + 1 }}</td>
                    <td>{{ approve.maDon }}</td>
                    <td>
                        <div class="d-flex align-items-center">
                            <p class="mb-0">{{ approve.hoTenNguoiTao }}</p>
                        </div>
                    </td>
                    <td>{{ approve.loaiDon }}</td>
                    <td>{{ formatDate(approve.ngayTao) }}</td>
                    <td>
                        <div class="d-flex align-items-center">
                            <p class="mb-0">{{ approve.hoTenNguoiPheDuyet }}</p>
                        </div>
                    </td>
                    <td>{{ formatDate(approve.ngayPheDuyet) }}</td>
                    <td>
                        <span v-if="approve.trangThai === 1" class="badge bg-warning">Chờ phê duyệt</span>
                        <span v-if="approve.trangThai === 2" class="badge bg-success">Đã phê duyệt</span>
                        <span v-if="approve.trangThai === 3" class="badge bg-danger">Đã Từ chối</span>
                    </td>
                    <td v-if="approve.trangThai === 1">
                        <button
                            class="btn btn-success me-2"
                            @click.stop="$emit('setTrangThaiApprove', approve.maDon, 2, '')"
                        >
                            <i class="fa-regular fa-circle-check me-2"></i>{{ t('approve.buttons.accept') }}
                        </button>
                        <button class="btn btn-danger" @click.stop="$emit('setTrangThaiApprove', approve.maDon, 3, '')">
                            <i class="fa-regular fa-circle-xmark me-2"></i>{{ t('approve.buttons.refuse') }}
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
        <span>{{ t('approve.page') }} {{ props.currentPage }} / {{ totalPages }}</span>
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
const emit = defineEmits(['setTrangThaiApprove', 'updatePage'])

const props = defineProps({
    listApprove: Array,
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
        default: 2,
    },
    filterDate: {
        type: Array,
        default: [],
    },
    statusSelected: {
        type: String,
        default: '',
    },
})
const filteredApprove = computed(() => {
    let approves = props.listApprove
    if (props.searchQuery) {
        approves = approves.filter((approve) => approve.maDon.toLowerCase().includes(props.searchQuery.toLowerCase()))
    }

    if (props.filterDate && props.filterDate.length === 2) {
        const startDate = new Date(props.filterDate[0])
        const endDate = new Date(props.filterDate[1])
        approves = approves.filter((approve) => {
            const approveDate = new Date(approve.ngayTao)
            return approveDate >= startDate && approveDate <= endDate
        })
    }

    if (props.statusSelected) {
        approves = approves.filter((approve) => approve.trangThai == Number(props.statusSelected))
    }

    return approves
})

function formatDate(date) {
    const d = new Date(date)

    const day = d.getDate().toString().padStart(2, '0')
    const month = (d.getMonth() + 1).toString().padStart(2, '0') 
    const year = d.getFullYear()
    return `${day}/${month}/${year}`
}

const paginatedApproves = computed(() => {
    const start = (props.currentPage - 1) * props.pageSize
    const end = start + props.pageSize
    return filteredApprove.value.slice(start, end)
})

const totalPages = computed(() => {
    return Math.ceil(filteredApprove.value.length / props.pageSize)
})

const goToPage = (page) => {
    emit('updatePage', page)
}
</script>