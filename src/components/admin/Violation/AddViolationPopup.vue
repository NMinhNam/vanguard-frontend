<template>
    <div class="container-fluid">
        <div class="mb-3">
            <label for="tenViPham" class="form-label me-2 text-nowrap" style="width: 12rem">
                {{ $t('configuration.violation.table.violation_name')}}
            </label>
            <input
                v-model="viPhamInfo.tenViPham"
                type="text"
                class="form-control"
                id="tenViPham"
                :class="{ 'is-invalid': error.tenViPham }"
            />
            <div class="invalid-feedback">
                {{ $t('configuration.violation.validate.name')}}
            </div>
        </div>
        <div class="mb-3">
            <label for="soTien" class="form-label me-2 text-nowrap" style="width: 12rem">
                {{ $t('configuration.violation.table.amount')}}
            </label>
            <input
                v-model="viPhamInfo.soTien"
                type="text"
                class="form-control"
                id="soTien"
                :class="{ 'is-invalid': error.soTien }"
            />
            <div class="invalid-feedback">
                {{ $t('configuration.violation.validate.amount')}}
            </div>
        </div>
        <div class="d-flex justify-content-end">
            <button @click="saveDepartment()" class="btn btn-success">
                {{ $t('configuration.violation.save')}}
            </button>
        </div>
    </div>
</template>
    
  <script setup>
import { onMounted, reactive, ref } from 'vue'
import { get, post } from '@/stores/https'
import { useValidation } from '@/stores/mixin/validate_form'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const viPhamInfo = reactive({
    tenViPham: '',
    soTien: ''
})

onMounted(async () => {
})

const saveDepartment = async () => {
    if (!validate()) {
        Swal.fire({
            title: t('configuration.violation.validate.error.title'),
            text: t('configuration.violation.validate.error.text'),
            icon: 'error',
            timer: 1500,
        })
        return
    }

    try {
        
        if (true) {
            Swal.fire({
            title: t('configuration.violation.validate.success.title'),
            text: t('configuration.violation.validate.success.text'),
            icon: 'success',
            timer: 1500,
        })
        } else {
            Swal.fire({
            title: t('configuration.violation.validate.fail.title'),
            text: t('configuration.violation.validate.fail.text'),
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
    soTien: ''
})

const validate = () => {
    const formRule = {
        tenViPham: {
            required: true,
        },
        soTien: {
            required: true,
            number: viPhamInfo.soTien
        }
    }
    const formData = {
        tenViPham: viPhamInfo.tenViPham,
        soTien: viPhamInfo.soTien
    }
    Object.assign(error, validateForm(formRule, formData))
    for (let key in error) {
        if (error[key] !== false) return false
    }
    return true
}
//--------------------------------------------------------------//
</script>
    
<style>
</style>