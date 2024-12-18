<script setup>
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const props = defineProps({
    listBangLuong: Array,
    currentPage: Number,
    pageSize: Number,
})
</script>

<template>
    <div class="table-responsive mt-3">
        <table class="table table-striped table-bordered text-center text-nowrap" cellspacing="0">
            <thead class="">
                <!-- Tiêu đề bảng -->
                <tr>
                    <th scope="col" class="align-middle">{{ t('payroll.table.no') }}</th>
                    <th scope="col" class="align-middle">{{ t('payroll.table.id') }}</th>
                    <th scope="col" class="align-middle">{{ t('payroll.table.name') }}</th>
                    <th scope="col" class="align-middle">{{ t('payroll.table.month') }}</th>
                    <th scope="col" class="align-middle">{{ t('payroll.table.year') }}</th>
                    <th scope="col" class="align-middle">{{ t('payroll.table.allowance') }}</th>
                    <th scope="col" class="align-middle">{{ t('payroll.table.violation') }}</th>
                    <th scope="col" class="align-middle">{{ t('payroll.table.total_salary') }}</th>
                    <th scope="col" class="align-middle">{{ t('payroll.table.real') }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="listBangLuong.length === 0" style="text-align: center; font-style: italic">
                    <td colspan="11">{{ t('payroll.table.search') }}</td>
                </tr>
                <!-- Dữ liệu bảng -->
                <tr v-for="(item, index) in listBangLuong" :key="index">
                    <td>{{ (currentPage - 1) * pageSize + index + 1 }}</td>
                    <td>{{ item.maNhanVien }}</td>
                    <td>{{ item.tenNhanVien }}</td>
                    <td>{{ item.thangBangLuong }}</td>
                    <td>{{ item.namBangLuong }}</td>
                    <td>{{ item.tongPhuCap }}</td>
                    <td>{{ item.tongKhauTru }}</td>
                    <td>{{ item.tongLuong }}</td>
                    <td>{{ item.tongLuongThucNhan }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
