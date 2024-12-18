<template>
    <HeadMenu :saveContract="saveContract" :loading="loading" />
    <div class="container-fluid p-0">
        <ContractDetailForm :error="error" :Contract="Contract" />
    </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { get, post } from '@/stores/https'
import router from '@/router'
import HeadMenu from './HeadMenu.vue'
import ContractDetailForm from './ContractDetailForm.vue'
import { useValidation } from '@/stores/mixin/validate_form'
const { validateForm } = useValidation()
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const Contract = ref({})
const loading = ref(false)

const error = reactive({
    noiDung: '',
    ngayKy: '',
    ngayBatDau: '',
    ngayKetThuc: '',
    thoiHan: '',
    luongCoBan: '',
})

onMounted(() => {
    const param = router.currentRoute.value.params.id
    if (param) {
        Contract.soHopDong = param
        getInfoBysoHopDong(Contract.soHopDong)
    }
})

const getInfoBysoHopDong = async (id) => {
    try {
        const response = await get('/api/v1/contracts/id', { id })
        if (response && response.data) {
            Contract.value = response.data
        }
    } catch (error) {
        Swal.fire({
            title: t('contract.swal.getInfo.error.title'),
            text: t('contract.swal.getInfo.error.text'),
            icon: 'error',
            timer: 1500,
        })
        console.error(error)
    }
}

const saveContract = async () => {
    if (!validate()) {
        console.log(error)
        Swal.fire({
            title: 'Save contract',
            text: 'Hợp đồng không đúng định dạng',
            icon: 'error',
            timer: 1500,
        })
        return
    }
    loading.value = true
    try {
        const response = await post('/api/v1/contracts', Contract.value)
        if (response && response.data) {
            Swal.fire({
                title: t('contract.swal.save.success.title'),
                text: t('contract.swal.save.success.text'),
                icon: 'success',
                timer: 1500,
            })

            router.push('/admin/contract')
        }
    } catch (error) {
        Swal.fire({
            title: t('contract.swal.save.fail.title'),
            text: t('contract.swal.save.fail.text'),
            icon: 'error',
            timer: 2000,
        })
        console.error(error)
    } finally {
        loading.value = false
    }
}
const validate = () => {
    const formRule = {
        noiDung: { required: true },
        ngayKy: { required: true },
        ngayBatDau: { required: true },
        ngayKetThuc: { required: true },
        thoiHan: { required: true, pattern: /^[0-9]+$/ },
        luongCoBan: { required: true, pattern: /^\d+(\.\d{1,2})?$/ },
    }

    Object.assign(error, validateForm(formRule, Contract.value))
    console.log(error)

    for (let key in error) {
        if (error[key] !== false) {
            return false
        }
    }

    return true
}
</script>
