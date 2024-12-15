<template>
    <HeadMenu :saveContract="saveContract" :loading="loading" />
    <div class="container-fluid p-0">
        <ContractDetailForm :Contract="Contract" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { get, post } from '@/stores/https'
import router from '@/router'
import HeadMenu from './HeadMenu.vue'
import ContractDetailForm from './ContractDetailForm.vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const Contract = ref({})
const loading = ref(false)

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

            router.push('/admin/contract') // Điều hướng về danh sách hợp đồng
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
</script>
