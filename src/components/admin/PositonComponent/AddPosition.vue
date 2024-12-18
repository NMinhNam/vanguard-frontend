<template>
    <div class="container-fluid">
        <h5 class="mb-3 fw-bolder text-center">{{ t('position.title') }}</h5>
        <div class="d-flex align-items-center mb-2">
            <label for="tenChucVu" class="form-label me-2 text-nowrap label-width">{{
                t('position.new_position')
            }}</label>
            <input
                v-model="props.positionDetail.tenChucVu"
                type="text"
                class="form-control me-2"
                id="tenChucVu"
                placeholder="Chức Vụ"
            />
            <div class="d-flex justify-content-end">
                <button class="btn btn-success" @click="savePosition()">{{ t('position.save') }}</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import { post } from '@/stores/https'
import { useI18n } from 'vue-i18n'

const props = defineProps({
    positionDetail: {
        type: Object,
    },
})

const { t, locale } = useI18n()

const savePosition = async () => {
    try {
        const response = await post('/api/v1/positions', props.positionDetail)
        if (response) {
            Swal.fire({
                title: t('position.swal.save.success.title'),
                text: t('position.swal.save.success.text'),
                icon: 'success',
                timer: 1500,
            })
        }
    } catch (error) {
        Swal.fire({
            title: t('position.swal.save.fail.title'),
            text: t('position.swal.save.fail.text'),
            icon: 'error',
            timer: 1500,
        })
        console.error(error)
    }
}
</script>

<style>
.container-fluid {
    padding: 20px;
}

.label-width {
    width: 12rem;
}

.row {
    margin-top: 1rem;
}

.form-label {
    font-weight: 600;
    font-size: 0.95rem;
}

.form-control,
.form-select {
    border-radius: 0.375rem;
    height: 2.5rem;
    font-size: 0.875rem;
    padding-left: 1rem;
}

button.btn {
    padding: 0.75rem 2rem;
    font-size: 1rem;
    font-weight: bold;
}

button.btn-success {
    background-color: #28a745;
    border: none;
    color: white;
}

button.btn-success:hover {
    background-color: cornflowerblue;
}

button.btn-success:disabled {
    background-color: #6c757d;
}
</style>
