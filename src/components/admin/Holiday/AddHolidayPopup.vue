<template>
    <div class="container-fluid">
        <div class="mb-3">
            <label for="tenNgayLe" class="form-label me-2 text-nowrap" style="width: 12rem">
                {{ $t('configuration.holiday.table.holiday_name') }}
            </label>
            <input
                v-model="ngayLeInfo.tenNgayLe"
                type="text"
                class="form-control"
                id="tenNgayLe"
                :class="{ 'is-invalid': error.tenNgayLe }"
            />
            <div class="invalid-feedback">
                {{ $t('configuration.holiday.validate.name') }}
            </div>
        </div>
        <div class="mb-3">
            <label for="ngayThangBatDau" class="form-label me-2 text-nowrap" style="width: 12rem">
                {{ $t('configuration.holiday.table.start_day') }}
            </label>
            <input
                v-model="ngayLeInfo.ngayThangBatDau"
                type="text"
                class="form-control"
                id="ngayThangBatDau"
                placeholder="01-01"
                :class="{ 'is-invalid': error.ngayThangBatDau }"
            />
            <div class="invalid-feedback">
                {{ $t('configuration.holiday.validate.start_day') }}
            </div>
        </div>
        <div class="mb-3">
            <label for="ngayThangKetThuc" class="form-label me-2 text-nowrap" style="width: 12rem">
                {{ $t('configuration.holiday.table.end_day') }}
            </label>
            <input
                v-model="ngayLeInfo.ngayThangKetThuc"
                type="text"
                class="form-control"
                id="ngayThangKetThuc"
                placeholder="01-01"
                :class="{ 'is-invalid': error.ngayThangKetThuc }"
            />
            <div class="invalid-feedback">
                {{ $t('configuration.holiday.validate.end_day') }}
            </div>
        </div>
        <div class="d-flex justify-content-end">
            <button @click="btnLuuNgayLe_click()" class="btn btn-success">
                {{ $t('configuration.holiday.save') }}
            </button>
        </div>
    </div>
</template>
    
<script setup>
import { onMounted, reactive, ref } from 'vue'
import { post } from '@/stores/https'
import { useValidation } from '@/stores/mixin/validate_form'
import { useI18n } from 'vue-i18n'

// Nhận hàm getNgayLe từ props
const { t, locale } = useI18n()
const props = defineProps({
    getNgayLe: {
        type: Function,
        required: true
    }
})

const ngayLeInfo = reactive({
    tenNgayLe: '',
    ngayThangBatDau: '',
    ngayThangKetThuc: ''
})

onMounted(async () => {
    // Có thể gọi getNgayLe khi component được tải
})

const btnLuuNgayLe_click = async () => {
    if (!validate()) {
        Swal.fire({
            title: t('configuration.holiday.validate.error.title'),
            text: t('configuration.holiday.validate.error.text'),
            icon: 'error',
            timer: 1500,
        })
        return
    }

    try {
        const response = await post('/api/v1/holidays', ngayLeInfo)
        if (response.success) {
            Swal.fire({
                title: t('configuration.holiday.save_click.success.title'),
                text: t('configuration.holiday.save_click.success.text'),
                icon: 'success',
                timer: 1500,
            }).then(() => {
                props.getNgayLe();
            })
        } else {
            Swal.fire({
                title: t('configuration.holiday.save_click.fail.title'),
                text: t('configuration.holiday.save_click.fail.text'),
                icon: 'success',
                timer: 1500,
            })
        }
    } catch (error) {
        Swal.fire({
            title: t('configuration.error.title'),
            text: t('configuration.error.text'),
            icon: 'error',
            timer: 1500,
        })
        console.error(error)
    }
}

//------------Validate-------------//
const { validateForm } = useValidation()

const error = reactive({
    tenNgayLe: '',
    ngayThangBatDau: '',
    ngayThangKetThuc: ''
})

const validate = () => {
    const formRule = {
        tenNgayLe: {
            required: true,
        },
        ngayThangBatDau: {
            required: true,
        },
        ngayThangKetThuc: {
            required: true,
        }
    }
    const formData = {
        tenNgayLe: ngayLeInfo.tenNgayLe,
        ngayThangBatDau: ngayLeInfo.ngayThangBatDau,
        ngayThangKetThuc: ngayLeInfo.ngayThangKetThuc
    }
    Object.assign(error, validateForm(formRule, formData))
    for (let key in error) {
        if (error[key] !== false) return false
    }
    return true
}
</script>

    
<style>
</style>