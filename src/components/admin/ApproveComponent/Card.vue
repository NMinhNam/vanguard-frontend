<template>
    <div class="mt-3">
        <div class="row row-cols-md-3s g-4">
            <div class="col">
                <h4>{{ t('approve.card.title1') }}</h4>
                <hr />
                <div class="mb-3" v-for="approve in filteredApprove" :key="approve.maDon">
                    <div class="card h-100" v-if="approve.trangThai === 1"
                        @dblclick="$router.push(`/admin/approve/${approve.maDon}`)">
                        <div class="card-body d-flex p-0">
                            <div class="px-3 py-2 flex-grow-1 p-3">
                                <div class="d-flex justify-content-between align-items-start">
                                    <h5 class="card-title">{{ approve.maDon }}</h5>
                                    <span class="status-indicator"></span>
                                </div>
                                <div class="mb-2">
                                    <p class="m-0">{{ t('approve.table.reason') }}: {{ approve.loaiDon }}</p>
                                    <p class="m-0">{{ t('approve.table.datesend') }}: {{ approve.ngayTao }}</p>
                                </div>
                                <div class="row">
                                    <div class="col-8 d-flex justify-content-start fs-4">
                                        <button class="btn btn-success me-2"
                                            @click="$emit('setTrangThaiApprove', approve.maDon, 2, '')">
                                            <i class="fa-regular fa-circle-check me-2"></i>{{
                                            t('approve.buttons.accept') }}
                                        </button>
                                        <button class="btn btn-danger"
                                            @click="$emit('setTrangThaiApprove', approve.maDon, 3, '')">
                                            <i class="fa-regular fa-circle-xmark me-2"></i>{{
                                            t('approve.buttons.refuse') }}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col">
                <h4>{{ t('approve.card.title2') }}</h4>
                <hr />
                <div class="mb-3" v-for="approve in filteredApprove" :key="approve.maDon">
                    <div class="card h-100" v-if="approve.trangThai === 2"
                        @dblclick="$router.push(`/admin/approve/${approve.maDon}`)">
                        <div class="card-body d-flex p-0">
                            <div class="px-3 py-2 flex-grow-1 p-3">
                                <div class="d-flex justify-content-between align-items-start">
                                    <h5 class="card-title">{{ approve.maDon }}</h5>
                                    <span class="status-indicator">:</span>
                                </div>
                                <div class="mb-2">
                                    <p class="m-0">{{ t('approve.table.reason') }}: {{ approve.loaiDon }}</p>
                                    <p class="m-0">{{ t('approve.table.ordercreater') }}: {{ approve.ngayTao }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col">
                <h4>{{ t('approve.card.title3') }}</h4>
                <hr />
                <div class="mb-3" v-for="approve in filteredApprove" :key="approve.maDon">
                    <div class="card h-100" v-if="approve.trangThai === 3"
                        @dblclick="$router.push(`/admin/approve/${approve.maDon}`)">
                        <div class="card-body d-flex p-0">
                            <div class="px-3 py-2 flex-grow-1 p-3">
                                <div class="d-flex justify-content-between align-items-start">
                                    <h5 class="card-title">{{ approve.maDon }}</h5>
                                    <span class="status-indicator">:</span>
                                </div>
                                <div class="mb-2">
                                    <p class="m-0">{{ t('approve.table.reason') }}: {{ approve.loaiDon }}</p>
                                    <p class="m-0">{{ t('approve.table.ordercreater') }}: {{ approve.ngayTao }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const emits = defineEmits(['setTrangThaiApprove', 'updatePage']);
const props = defineProps({
    listApprove: {
        type: Array,
    },
    searchQuery: {
        type: String,
        default: '',
    },
    dateSelected: {
        type: String,
        default: '',
    },
})

const filteredApprove = computed(() => {
    let approves = props.listApprove
    if (props.searchQuery) {
        approves = approves.filter((approve) => approve.maDon.toLowerCase().includes(props.searchQuery.toLowerCase()))
    }

    if (props.dateSelected) {
        approves = approves.filter((approve) => approve.ngayTao === props.dateSelected)
    }
    return approves
})
</script>