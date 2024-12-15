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
            title: 'Thất bại',
            text: 'Không thể tải lên dữ liệu hợp đồng',
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
                title: 'Thành công',
                text: 'Hợp đồng đã được lưu thành công!',
                icon: 'success',
                timer: 1500,
            })

            router.push('/admin/contract') // Điều hướng về danh sách hợp đồng
        }
    } catch (error) {
        Swal.fire({
            title: 'Thất bại',
            text: 'Không thể lưu hợp đồng. Vui lòng kiểm tra lại!',
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

    // Kiểm tra lỗi bằng validateForm
    Object.assign(error, validateForm(formRule, Contract.value))
    console.log(error) // Kiểm tra cấu trúc của error

    // Kiểm tra tất cả các lỗi
    for (let key in error) {
        // Nếu có lỗi thì return false
        if (error[key] !== false) {
            return false
        }
    }

    return true
}
</script>
