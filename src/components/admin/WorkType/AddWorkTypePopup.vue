<template>
    <div class="container-fluid">
        <div class="mb-3">
            <label for="tenLoaiCong" class="form-label me-2 text-nowrap" style="width: 12rem">
                {{ $t('configuration.work_type.table.work_type_name')}}
            </label>
            <input v-model="loaiCongInfo.tenLoaiCong" type="text" class="form-control" id="tenLoaiCong"
                :class="{ 'is-invalid': error.tenLoaiCong }" />
            <div class="invalid-feedback">
                {{ $t('configuration.work_type.validate.name')}}
            </div>
        </div>
        <div class="mb-3">
            <label for="gioBatDau" class="form-label me-2 text-nowrap" style="width: 12rem">
                {{ $t('configuration.work_type.table.start_time')}}
            </label>
            <input v-model="loaiCongInfo.gioBatDau" type="time" class="form-control" id="gioBatDau"
                :class="{ 'is-invalid': error.gioBatDau }" />
            <div class="invalid-feedback">
                {{ $t('configuration.work_type.validate.start')}}
            </div>
        </div>
        <div class="mb-3">
            <label for="gioKetThuc" class="form-label me-2 text-nowrap" style="width: 12rem">
                {{ $t('configuration.work_type.table.end_time')}}
            </label>
            <input v-model="loaiCongInfo.gioKetThuc" type="time" class="form-control" id="gioKetThuc"
                :class="{ 'is-invalid': error.gioKetThuc }" />
            <div class="invalid-feedback">
               {{ $t('configuration.work_type.validate.end')}}
            </div>
        </div>
        <div class="mb-3">
            <label for="heSo" class="form-label me-2 text-nowrap" style="width: 12rem">
                {{ $t('configuration.work_type.table.salary_coefficient')}}
            </label>
            <input v-model="loaiCongInfo.heSo" type="text" class="form-control" id="heSo"
                :class="{ 'is-invalid': error.heSo }" />
            <div class="invalid-feedback">
                {{ $t('configuration.work_type.validate.salary')}}
            </div>
        </div>
        <div class="d-flex justify-content-end">
            <button @click="btnLuuLoaiCong_click()" class="btn btn-success">
                {{ $t('configuration.work_type.save')}}
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
const props = defineProps({
    getLoaiCong: {
        type: Function,
        required: true
    }
})

const loaiCongInfo = reactive({
    tenLoaiCong: '',
    gioBatDau: '',
    gioKetThuc: '',
    soTien: ''
})

const btnLuuLoaiCong_click = async () => {
    if (!validate()) {
        Swal.fire({
            title: t('configuration.work_type.validate.error.title'),
            text: t('configuration.work_type.validate.error.text'),
            icon: 'error',
            timer: 1500,
        })
        return
    }

    try {
        const response = await post('/api/v1/attendance-types', loaiCongInfo)
        if (response.success) {
            Swal.fire({
                title: t('configuration.work_type.save_click.success.title'),
                text: t('configuration.work_type.save_click.success.text'),
                icon: 'success',
                timer: 1500,
            }).then(() => {
                props.getLoaiCong();
            })
        } else {
            Swal.fire({
                title: t('configuration.work_type.save_click.fail.title'),
                text: t('configuration.work_type.save_click.fail.text'),
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
    tenLoaiCong: '',
    gioBatDau: '',
    gioKetThuc: '',
    heSo: ''
})

const validate = () => {
    const formRule = {
        tenLoaiCong: {
            required: true,
        },
        gioBatDau: {
            required: true,
        },
        gioKetThuc: {
            required: true,
        },
        heSo: {
            required: true,
            number: loaiCongInfo.heSo
        }
    }
    const formData = {
        tenLoaiCong: loaiCongInfo.tenLoaiCong,
        gioBatDau: loaiCongInfo.gioBatDau,
        gioKetThuc: loaiCongInfo.gioKetThuc,
        heSo: loaiCongInfo.heSo
    }
    Object.assign(error, validateForm(formRule, formData))
    for (let key in error) {
        if (error[key] !== false) return false
    }
    return true
}
//--------------------------------------------------------------//

onMounted(async () => {
    
})
</script>

<style>
</style>