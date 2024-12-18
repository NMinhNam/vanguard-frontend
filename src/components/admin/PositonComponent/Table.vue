<template>
    <div>
        <table class="table table-hover align-middle table-responsive text-center">
            <thead class="table-light">
                <tr class="text-center">
                    <th scope="col">{{ t('position.table.no') }}</th>
                    <th scope="col">{{ t('position.table.id') }}</th>
                    <th scope="col">{{ t('position.table.name') }}</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(Position, index) in paginatedPositions"
                    @dblclick="getPostionById(Position.maChucVu)"
                    :key="Position.maChucVu || index"
                >
                    <td>{{ index + 1 }}</td>
                    <td>{{ Position.maChucVu }}</td>
                    <td>{{ Position.tenChucVu }}</td>
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
        <span>{{ t('department.page') }} {{ props.currentPage }} / {{ totalPages }}</span>
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
import { useI18n } from 'vue-i18n'
import { computed, ref } from 'vue'
import { get } from '@/stores/https'
const { t, locale } = useI18n()
const positionDetail = ref({})

const props = defineProps({
    listPositon: Array,
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


const getPostionById = async (maChucVu) => {
    const response = await get('/api/v1/positions/id', { maChucVu })
    positionDetail.value = response.data
    console.log(positionDetail.value)
    emit('getPostionById', positionDetail.value)
}

const filteredPositions = computed(() => {
    console.log(props.searchQuery)
    let positons = props.listPositon
    if (props.searchQuery) {
        positons = positons.filter((positon) =>
            positon.tenChucVu.toLowerCase().includes(props.searchQuery.toLowerCase()),
        )
    }
    return positons
})

const paginatedPositions = computed(() => {
    const start = (props.currentPage - 1) * props.pageSize
    const end = start + props.pageSize
    return filteredPositions.value.slice(start, end)
})
const totalPages = computed(() => {
    return Math.ceil(filteredPositions.value.length / props.pageSize)
})

const emit = defineEmits(['updatePage', 'getPostionById'])

const goToPage = (page) => {
    emit('updatePage', page)
}
</script>
