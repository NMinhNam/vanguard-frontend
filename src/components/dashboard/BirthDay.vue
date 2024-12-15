<script setup>
import { get } from '@/stores/https'
import { ref, onMounted } from 'vue'

const listNhanVien = ref([])
const listBirthDay = ref([])

const formatDate = (dateString) => {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
}

const listAllNhanVien = async () => {
    const response = await get('/api/v1/employees')
    listNhanVien.value = response.data

    const currentMonth = new Date().getMonth() + 1

    listNhanVien.value.forEach((item) => {
        const thang = new Date(item.ngaySinh)
        if (thang.getMonth() + 1 === currentMonth) {
            listBirthDay.value.push(item)
            const day = new Date(item.ngaySinh).getDate()
        }
    })

    listBirthDay.value.sort((a, b) => new Date(a.ngaySinh).getDate() - new Date(b.ngaySinh).getDate())
}

onMounted(async () => {
    await listAllNhanVien()
})
</script>
<template>
    <div class="card">
        <div class="card-header">Sinh nhật trong tháng</div>
        <div class="card-body pb-1">
            <div class="col-sm-12 row m-0 mb-2" v-for="nv in listBirthDay" :key="nv.maNhanVien">
                <div class="col-sm-2 p-0">
                    <img class="img-fluid rounded-circle" v-if="nv.hinhAnh === 'img.jpg'" :src="nv.hinhAnh" alt="" />
                    <img
                        class="img-fluid rounded-circle"
                        :src="'https://i.pinimg.com/736x/8f/1c/a2/8f1ca2029e2efceebd22fa05cca423d7.jpg'"
                        alt=""
                    />
                </div>
                <div class="col-sm-7 small pe-1">
                    <b>{{ nv.hoTen }}</b>
                    <p>{{ nv.tenChucVu }}</p>
                    <p>{{ nv.tenPhongBan }}</p>
                </div>
                <div class="col-sm-3 p-0 pt-1">
                    <p>[{{ formatDate(nv.ngaySinh) }}]</p>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.card-body {
    height: 263px;
    overflow-y: auto;
}

b {
    font-size: 13px;
}
p {
    font-size: 11px;
    margin: 0;
}
</style>
