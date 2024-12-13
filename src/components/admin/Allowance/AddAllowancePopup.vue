<template>
    <div class="container-fluid">
        <div class="mb-3">
            <label for="tenPhongBan" class="form-label me-2 text-nowrap" style="width: 12rem">
                {{ $t('configuration.allowance.table.allowance_name') }}
            </label>
            <input v-model="phuCapInfo.tenPhuCap" type="text" class="form-control" id="tenPhuCap"
                :class="{ 'is-invalid': error.tenPhuCap }" />
            <div class="invalid-feedback">
                {{ $t('configuration.allowance.validate.name') }}
            </div>
        </div>
        <div class="mb-3">
            <label for="tenPhongBan" class="form-label me-2 text-nowrap" style="width: 12rem">
                {{ $t('configuration.allowance.table.amount') }}
            </label>
            <input v-model="phuCapInfo.soTien" type="text" class="form-control" id="soTien"
                :class="{ 'is-invalid': error.soTien }" />
            <div class="invalid-feedback">
                {{ $t('configuration.allowance.validate.amount') }}
            </div>
        </div>
        <div class="d-flex justify-content-end">
            <button @click="btnLuuPhuCap_click()" class="btn btn-success">
                {{ $t('configuration.allowance.save') }}
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

const phuCapInfo = reactive({
    tenPhuCap: '',
    soTien: ''
})

onMounted(async () => {

})

const btnLuuPhuCap_click = async () => {
    if (!validate()) {
        Swal.fire({
            title: t('configuration.allowance.validate.error.title'),
            text: t('configuration.allowance.validate.error.text'),
            icon: 'error',
            timer: 1500,
        })

        return
    }

    try {
        const response = await post('/api/v1/allowance', phuCapInfo)
        if (response.success) {
            Swal.fire({
                title: t('configuration.allowance.update_click.success.title'),
                text: t('configuration.allowance.update_click.success.text'),
                icon: 'success',
                timer: 1500,
            })
        } else {
            Swal.fire({
                title: t('configuration.allowance.update_click.fail.title'),
                text: t('configuration.allowance.update_click.fail.text'),
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
    tenPhuCap: '',
    soTien: ''
})

const validate = () => {
    const formRule = {
        tenPhuCap: {
            required: true,
        },
        soTien: {
            required: true,
            number: phuCapInfo.soTien
        }
    }
    const formData = {
        tenPhuCap: phuCapInfo.tenPhuCap,
        soTien: phuCapInfo.soTien
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