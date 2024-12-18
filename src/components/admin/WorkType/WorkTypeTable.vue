<script setup>
import { del } from '@/stores/https'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const props = defineProps({
    listLoaiCong: Array,
    currentPage: Number,
    pageSize: Number,
    getLoaiCong: {
        type: Function,
        required: true,
    },
})

const btnDeleteLoaiCong_click = async (item) => {
    Swal.fire({
        title: t('configuration.work_type.delete_click.question.title'),
        text: t('configuration.work_type.delete_click.question.text'),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: t('configuration.work_type.delete_click.button.delete'),
        cancelButtonText: t('configuration.work_type.delete_click.button.cancel'),
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const response = await del(`/api/v1/attendance-types/${item.tenLoaiCong}`)
                if (response.success) {
                    Swal.fire({
                        title: t('configuration.work_type.delete_click.success.title'),
                        text: t('configuration.work_type.delete_click.success.text'),
                        icon: 'success',
                        timer: 1500,
                    }).then(() => {
                        props.getLoaiCong()
                    })
                } else {
                    Swal.fire({
                        title: t('configuration.work_type.delete_click.fail.title'),
                        text: t('configuration.work_type.delete_click.fail.text'),
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
            }
        }
    })
}
</script>

<template>
    <div class="table-responsive">
        <table class="table table-hover table-striped table-bordered text-center text-nowrap">
            <thead class="">
                <!-- Tiêu đề bảng -->
                <tr>
                    <th scope="col">{{ $t('configuration.work_type.table.no') }}</th>
                    <th scope="col">{{ $t('configuration.work_type.table.work_type_name') }}</th>
                    <th scope="col">{{ $t('configuration.work_type.table.start_time') }}</th>
                    <th scope="col">{{ $t('configuration.work_type.table.end_time') }}</th>
                    <th scope="col">{{ $t('configuration.work_type.table.salary_coefficient') }}</th>
                    <th scope="col">{{ $t('configuration.work_type.table.tools') }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="listLoaiCong.length === 0" style="text-align: center; font-style: italic">
                    <td colspan="7">{{ $t('configuration.work_type.search') }}</td>
                </tr>
                <!-- Dữ liệu bảng -->
                <tr class="align-middle" v-for="(item, index) in listLoaiCong" :key="index">
                    <td>{{ (currentPage - 1) * pageSize + index + 1 }}</td>
                    <td>{{ item.tenLoaiCong }}</td>
                    <td>{{ item.gioBatDau }}</td>
                    <td>{{ item.gioKetThuc }}</td>
                    <td>{{ item.heSo }}</td>
                    <td>
                        <button class="btn btn-danger" @click="btnDeleteLoaiCong_click(item)">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.btn {
    padding: 3px 6px;
}

.popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: start;
    z-index: 10;
    opacity: 0;
    visibility: hidden;
    transition:
        opacity 0.3s ease,
        visibility 0.3s ease;
}

.popup.show {
    opacity: 1;
    visibility: visible;
}

.popup-content {
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
    transform: translateY(-20px);
    transition: transform 0.3s ease;
    max-width: 500px;
    width: 90%;
    margin-top: 1rem;
}

.popup.show .popup-content {
    transform: translateY(0);
}

.modal-footer {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 1;
}
</style>
