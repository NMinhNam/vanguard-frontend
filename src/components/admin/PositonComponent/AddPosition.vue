<template>
    <div class="container-fluid">
        <div class="d-flex align-items-center mb-2">
            <label for="tenChucVu" class="form-label me-2 text-nowrap label-width">Chức Vụ Mới</label>
            <input
                v-model="info.tenChucVu "
                type="text"
                class="form-control"
                id="tenChucVu"
                placeholder="Chức Vụ"
            />
            <div class="d-flex justify-content-end">
                <button class="btn btn-success" @click="savePosition()">Save</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import {  reactive } from 'vue'
import { post } from '@/stores/https'

const info = reactive({
    tenChucVu: '',
})

const savePosition = async () => {
    try {
        const response = await post('/api/v1/chuc-vu', info)
        if (response) {
            Swal.fire({
                title: 'Thành công',
                text: 'Thêm vị trí tuyển dụng thành công',
                icon: 'success',
                timer: 1500,
            })
        }
    } catch (error) {
        Swal.fire({
            title: 'Thất bại',
            text: 'Thêm vị trí tuyển dụng thất bại',
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
