<script setup>
import { get } from '@/stores/https'
import { ref, onMounted } from 'vue'

const listNhanVien = ref([])
const listNhanSuMoi = ref([])

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

    const currentDate = new Date()
    const sixMonthsAgo = new Date(currentDate)
    sixMonthsAgo.setMonth(currentDate.getMonth() - 6)

    listNhanVien.value.forEach((item) => {
        const thang = new Date(item.ngayKyHopDong)
        if (thang >= sixMonthsAgo && thang <= currentDate) {
            listNhanSuMoi.value.push(item)
        }
    })

    listNhanSuMoi.value.sort((a, b) => new Date(a.ngayKyHopDong).getDate() - new Date(b.ngayKyHopDong).getDate())
}

onMounted(async () => {
    await listAllNhanVien()
})
</script>
<template>
    <div class="card">
        <div class="card-header">Nhân sự mới</div>
        <div class="card-body">
            <div class="col-sm-12 row m-0 mb-2" v-for="nv in listNhanSuMoi" :key="nv.maNhanVien">
                <div class="col-sm-2 p-0">
                    <img class="img-fluid rounded-circle" v-if="nv.hinhAnh === 'img.jpg'" :src="nv.hinhAnh" alt="" />
                    <img
                        class="img-fluid rounded-circle"
                        :src="'https://i.pinimg.com/736x/8f/1c/a2/8f1ca2029e2efceebd22fa05cca423d7.jpg'"
                        alt=""
                    />
                </div>
                <div class="col-sm-7 small">
                    <b>{{ nv.hoTen }}</b>
                    <p>{{ nv.tenChucVu }}</p>
                    <p>{{ nv.tenPhongBan }}</p>
                </div>
                <div class="col-sm-3 p-0 ps-1">
                    <p>[{{ formatDate(nv.ngayKyHopDong) }}]</p>
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
