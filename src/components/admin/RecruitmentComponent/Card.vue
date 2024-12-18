<template>
    <div class="p-0">
        <div class="row row-cols-1 row-cols-md-3 g-4 p-0">
            <div
                v-for="(Recruitment, index) in paginatedRecruitment"
                :key="Recruitment.viTriTuyenDung || index"
                @dblclick="$router.push(`/${role}/recruitment/${Recruitment.tenViTri}`)"
                style="cursor: pointer"
            >
                <div class="card h-100 p-0">
                    <div class="card-body d-flex p-0">
                        <div class="recruitment-avatar">
                            <img
                                v-if="Recruitment.logo"
                                :src="Recruitment.logo"
                                :alt="Recruitment.tenViTri"
                                class="img-fluid"
                            />
                            <div v-else>
                                <img
                                    src="https://static-00.iconduck.com/assets.00/avatar-default-symbolic-icon-2048x1949-pq9uiebg.png"
                                    class="img-fluid"
                                />
                            </div>
                        </div>
                        <div class="recruitment-info px-3 py-0 flex-grow-1">
                            <div class="d-flex justify-content-between align-items-start mt-2">
                                <h5 class="card-title">{{ Recruitment.tenViTri }}</h5>
                                <span
                                    v-if="Recruitment.soLuongUngTuyen >= Recruitment.soLuongTuyen"
                                    class="badge bg-danger"
                                >
                                    {{ t('recruitment.table.full') }}
                                </span>
                                <span v-else class="badge bg-success">
                                    {{ t('recruitment.table.isfull') }}
                                </span>
                            </div>
                            <p class="card-text">
                                <i class="bi bi-people"></i> {{ t('recruitment.table.number') }}:
                                {{ Recruitment.soLuongTuyen }}
                            </p>
                            <p class="card-text">
                                <button class="btn btn-primary oe_kanban_action oe_kanban_action_button" type="action">
                                    <span>{{ Recruitment.soLuongUngTuyen }}</span> {{ t('recruitment.table.cv') }}
                                </button>
                            </p>
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
            <span>{{ t('recruitment.page') }} {{ props.currentPage }} / {{ totalPages }}</span>
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

const role = sessionStorage.getItem('role').toLowerCase()
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

<style scoped>
.card {
    border: 1px solid #e0e0e0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    max-height: 200px;
}

.recruitment-avatar {
    width: 100px;
    height: 100px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
}

.recruitment-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.recruitment-info {
    min-width: 0;
}

.card-title {
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 0.25rem;
}

.card-text {
    font-size: 0.875rem;
    margin-bottom: 0.25rem;
}

.badge {
    font-weight: normal;
    font-size: 0.75rem;
    padding: 0.25em 0.5em;
    border-radius: 1rem;
}

.badge.bg-danger {
    background-color: #dc3545;
    color: #fff;
}

.badge.bg-success {
    background-color: #28a745;
    color: #fff;
}
</style>
