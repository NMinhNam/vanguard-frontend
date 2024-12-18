<template>
    <div>
        <div class="modal-header">
            <h1 class="modal-title fs-4 fw-bold" id="staticBackdropLabel">
                <i class="fa-solid fa-gear me-2"></i>
                {{ $t('component.header.title.setting') }}
            </h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="row g-3 align-items-center">
                <div class="col-auto">
                    <label for="language" class="col-form-label fw-bold">{{ $t('common.select_lang') }}</label>
                </div>
                <div class="col-auto">
                    <select class="form-select" id="language" v-model="language">
                        <option value="vn" selected>Tiếng Việt</option>
                        <option value="en">English</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
                <i class="fa-solid fa-times me-2"></i>{{ $t('component.header.buttons.cancel') }}
            </button>
            <button type="button" class="btn btn-success" data-bs-dismiss="modal" @click="btnSave_Click">
                <i class="fa-solid fa-sync-alt me-2"></i>{{ $t('component.header.buttons.save') }}
            </button>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { useCookie } from '@/stores/mixin/cookie'
import { useI18n } from 'vue-i18n'

const { getCookie, setCookie } = useCookie()
const { locale } = useI18n()

const language = ref('')

onMounted(() => {
    const lang = getCookie('HRMWebSuitLanguage')
    language.value = lang || 'vn'
    locale.value = lang || 'vn'
})
const btnSave_Click = () => {
    setCookie('HRMWebSuitLanguage', language.value, 30)
    locale.value = language.value
}
</script>
<style scoped></style>
