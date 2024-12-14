<template>
    <div>
        <table class="table table-hover align-middle table-responsive">
            <thead class="table-light">
                <tr class="text-center">
                    <th scope="col">STT</th>
                    <th scope="col">Mã chức vụ</th>
                    <th scope="col">Tên chức vụ</th>
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
const props = defineProps({
    listPositon: Array,
})
</script>
