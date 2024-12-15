<template>
    <div class="p-4 border-0 border-bottom border-secondary-subtle">
        <div class="head-menu col-12">
            <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center">
                    <button class="btn btn-primary me-2" @click="$router.go(-1)">
                        <div class="d-flex align-items-center">
                            <span class="material-symbols-outlined"> undo</span> {{ t('approve.buttons.back') }}
                        </div>
                    </button>
                </div>
                <div>
                    <button
                        class="btn btn-success me-2"
                        @click="$emit('setTrangThaiApprove', approveDetail.maDon, 2, props.approveDetail.ghiChu)"
                    >
                        <i class="fa-regular fa-circle-check me-2"></i>{{ t('approve.buttons.accept') }}
                    </button>
                    <button
                        class="btn btn-danger"
                        @click="$emit('setTrangThaiApprove', approveDetail.maDon, 3, props.approveDetail.ghiChu)"
                    >
                        <i class="fa-regular fa-circle-xmark me-2"></i>{{ t('approve.buttons.refuse') }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const props = defineProps({
    loading: Boolean,
    approveDetail: Object,
})
</script>

<style scoped>
.spinner-border {
    width: 1.2rem;
    height: 1.2rem;
}
</style>