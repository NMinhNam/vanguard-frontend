<template>
    <div class="container-fluid">
        <div class="mb-3">
            <label for="tenViPham" class="form-label me-2 text-nowrap" style="width: 12rem">
                {{ $t('configuration.violation.table.violation_name') }}
            </label>
            <input v-model="viPhamInfo.tenViPham" type="text" class="form-control" id="tenViPham"
                :class="{ 'is-invalid': error.tenViPham }" />
            <div class="invalid-feedback">
                {{ $t('configuration.violation.validate.name') }}
            </div>
        </div>
        <div class="mb-3">
            <label for="soTienViPham" class="form-label me-2 text-nowrap" style="width: 12rem">
                {{ $t('configuration.violation.table.amount') }}
            </label>
            <input v-model="viPhamInfo.soTienViPham" type="text" class="form-control" id="soTienViPham"
                :class="{ 'is-invalid': error.soTienViPham }" />
            <div class="invalid-feedback">
                {{ $t('configuration.violation.validate.amount') }}
            </div>
        </div>
        <div class="d-flex justify-content-end">
            <button @click="btnSaveViPham_click()" class="btn btn-success">
                {{ $t('configuration.violation.save') }}
            </button>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue'
import { post } from '@/stores/https'
import { useValidation } from '@/stores/mixin/validate_form'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const viPhamInfo = reactive({
    tenViPham: '',
    soTienViPham: ''
})

const props = defineProps({
    getViPham: Function
});

const btnSaveViPham_click = async () => {
    if (!validate()) {
        Swal.fire({
            title: t('configuration.violation.validate.error.title'),
            text: t('configuration.violation.validate.error.text'),
            icon: 'error',
            timer: 1500,
        })
        return
    }

    console.log(viPhamInfo)

    try {
        const response = await post('/api/v1/violations', viPhamInfo)
        if (response.success) {
            Swal.fire({
                title: t('configuration.violation.save_click.success.title'),
                text: t('configuration.violation.save_click.success.text'),
                icon: 'success',
                timer: 1500,
            }).then(() => {
                props.getViPham();
            })
        } else {
            Swal.fire({
                title: t('configuration.violation.save_click.fail.title'),
                text: t('configuration.violation.save_click.fail.text'),
                icon: 'error',
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
    tenViPham: '',
    soTienViPham: ''
})

const validate = () => {
    const formRule = {
        tenViPham: {
            required: true,
        },
        soTienViPham: {
            required: true,
            number: viPhamInfo.soTienViPham
        }
    }
    const formData = {
        tenViPham: viPhamInfo.tenViPham,
        soTienViPham: viPhamInfo.soTienViPham
    }
    Object.assign(error, validateForm(formRule, formData))
    for (let key in error) {
        if (error[key] !== false) return false
    }
    return true
}
//--------------------------------------------------------------//
</script>

<style></style>