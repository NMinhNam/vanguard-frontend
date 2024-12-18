<template>
    <div class="table-responsive">
        <table class="table table-hover align-middle text-center">
            <thead class="table-light">
                <tr class="text-center">
                    <th scope="col">{{ t('recruitment.table.no') }}</th>
                    <th scope="col">{{ t('recruitment.table.name') }}</th>
                    <th scope="col">{{ t('recruitment.table.id') }}</th>
                    <th scope="col">{{ t('recruitment.table.number') }}</th>
                    <th scope="col">{{ t('recruitment.table.application') }}</th>
                    <th scope="col">{{ t('recruitment.table.status') }}</th>
                    <th scope="col">{{ t('recruitment.table.describe') }}</th>
                    <th scope="col">{{ t('recruitment.table.request') }}</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(Recruitment, index) in paginatedRecruitment"
                    :key="Recruitment.viTriTuyenDung || index"
                    @dblclick="$router.push(`/hr/recruitment/${Recruitment.tenViTri}`)"
                    style="cursor: pointer"
                >
                    <td>{{ (props.currentPage - 1) * props.pageSize + index + 1 }}</td>
                    <td>{{ Recruitment.tenViTri }}</td>
                    <td>{{ Recruitment.maPhongBan }}</td>
                    <td>{{ Recruitment.soLuongTuyen }}</td>
                    <td>{{ Recruitment.soLuongUngTuyen }}</td>
                    <td>
                        <span v-if="Recruitment.soLuongUngTuyen >= Recruitment.soLuongTuyen" class="text-danger">
                            {{ t('recruitment.table.full') }}
                        </span>
                        <span v-else class="text-success"> {{ t('recruitment.table.isfull') }} </span>
                    </td>
                    <td>{{ Recruitment.moTa }}</td>
                    <td>{{ Recruitment.yeuCau }}</td>
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
        <span>{{ t('recruitment.page') }} {{ props.currentPage }} / {{ totalPages }}</span>
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
    listRecruitment: Array,
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
})

const filteredRecruitment = computed(() => {
    let recruitments = props.listRecruitment
    if (props.searchQuery) {
        recruitments = recruitments.filter((recruitment) =>
            recruitment.tenViTri.toLowerCase().includes(props.searchQuery.toLowerCase()),
        )
    }
    return recruitments
})

const paginatedRecruitment = computed(() => {
    const start = (props.currentPage - 1) * props.pageSize
    const end = start + props.pageSize
    return filteredRecruitment.value.slice(start, end)
})

const totalPages = computed(() => {
    return Math.ceil(filteredRecruitment.value.length / props.pageSize)
})

const emit = defineEmits(['updatePage'])

const goToPage = (page) => {
    emit('updatePage', page)
}
</script>
