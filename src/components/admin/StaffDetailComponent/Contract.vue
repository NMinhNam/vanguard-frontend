<template>
    <div class="container mt-4">
        <div v-if="Contract && Contract.length > 0" class="mt-4">
            <h5>Thông tin hợp đồng</h5>
            <table class="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Nội dung</th>
                        <th>Ngày bắt đầu</th>
                        <th>Ngày kết thúc</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(contract, index) in Contract" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td>{{ contract.noiDung }}</td>
                        <td>{{ contract.ngayBatDau }}</td>
                        <td>{{ contract.ngayKetThuc }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else>
            <p>Nhân viên chưa có hợp đồng.</p>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { get } from '@/stores/https'
import router from '@/router'

const Contract = ref([])

const getContractByEmployee = async (maNhanVien) => {
    try {
        const response = await get(`/api/v1/contracts/employee/${maNhanVien}`)
        if (response && response.data) {
            Contract.value = response.data
        }
    } catch (error) {
        console.error('Error fetching contract details:', error)
    }
}

onMounted(async () => {
    const param = router.currentRoute.value.params.id
    if (param) {
        await getContractByEmployee(param)
    }
})
</script>
