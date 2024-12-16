<template>
    <div>
        <table class="table table-hover align-middle table-responsive text-center">
            <thead class="table-light">
                <tr class="text-center">
                    <th scope="col">{{ t('position.table.no') }}</th>
                    <th scope="col">{{ t('position.table.id') }}</th>
                    <th scope="col">{{ t('position.table.name') }}</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(Position, index) in listPositon"
                    :key="Position.maChucVu || index"
                >
                    <td>{{ index + 1 }}</td>
                    <td>{{ Position.maChucVu }}</td>
                    <td>{{ Position.tenChucVu }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const props = defineProps({
    listPositon: Array,
})
</script>
