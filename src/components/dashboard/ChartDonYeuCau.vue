<template>
    <div class="fw-bolder text-center pt-2">
        <span>Thống kê đơn yêu cầu nghỉ phép trong năm</span>
        <div class="col-sm-12 row mt-3 ps-3 mb-3">
            <div class="col-sm-3">
                <div class="item card justify-content-center" style="background-color: #91d5ff">
                    <span>Tổng số đơn: {{ listDonYeuCauDaGui.length }}</span>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="item card justify-content-center" style="background-color: #ffe58f">
                    <span>Chưa duyệt: {{ listChuaDuyet.length }}</span>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="item card justify-content-center" style="background-color: #ffadd2">
                    <span>Đã duyệt: {{ listDaDuyet.length }}</span>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="item card justify-content-center" style="background-color: #ffadd2">
                    <span>Từ chối: {{ listTuChoi.length }}</span>
                </div>
            </div>
        </div>

        <!-- Sử dụng ref để liên kết -->
        <div ref="chart" style="width: 100%; height: 400px"></div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'
import { get } from '@/stores/https'

const listDonYeuCau = ref([])
const listDonYeuCauDaGui = ref([])
const listChuaDuyet = ref([])
const listDaDuyet = ref([])
const listTuChoi = ref([])
const result = ref([])

const getAllYeuCau = async () => {
    const response = await get('/api/v1/statistic/leave-requests')
    listDonYeuCau.value = response.data

    listDonYeuCau.value.forEach((item) => {
        if (item.trangThai === 1) {
            listChuaDuyet.value.push(item)
        } else if (item.trangThai === 2) {
            listDaDuyet.value.push(item)
        } else if (item.trangThai === 3) {
            listTuChoi.value.push(item)
        }

        if (item.trangThai !== 0) {
            listDonYeuCauDaGui.value.push(item)
        }
    })

    result.value = getRequestCountByMonth(listDonYeuCauDaGui.value)
}

const generateMonthList = () => {
    const currentYear = new Date().getFullYear() // Lấy năm hiện tại
    const months = []

    for (let i = 0; i < 12; i++) {
        const month = (i + 1).toString().padStart(2, '0') // Định dạng tháng thành MM
        months.push(`${month}/${currentYear}`)
    }

    return months
}

const getRequestCountByMonth = (data) => {
    const currentYear = new Date().getFullYear() // Lấy năm hiện tại
    const result = Array(12).fill(0) // Khởi tạo mảng 12 tháng với giá trị 0

    data.forEach((item) => {
        const ngayTao = new Date(item.ngayTao)
        const year = ngayTao.getFullYear()
        const month = ngayTao.getMonth() // Lấy tháng (0-11)

        if (year === currentYear) {
            result[month] += 1
        }
    })

    return result
}

const monthList = generateMonthList()

const chart = ref(null) // Sử dụng ref cho biểu đồ
let myChart = null

onMounted(async () => {
    await getAllYeuCau()

    // Khởi tạo biểu đồ sau khi DOM sẵn sàng
    if (chart.value) {
        myChart = echarts.init(chart.value)

        // Cấu hình biểu đồ
        const option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                },
            },
            toolbox: {
                show: true,
                top: '0%',
                feature: {
                    saveAsImage: {
                        show: true,
                        title: 'Save as Image',
                    },
                },
            },
            xAxis: {
                type: 'category',
                data: monthList,
            },
            yAxis: {
                type: 'value',
            },
            series: [
                {
                    name: 'Số lượng đơn:',
                    type: 'bar',
                    data: result.value,
                },
            ],
        }

        // Gán option cho biểu đồ
        myChart.setOption(option)
    }

    // Xử lý khi thay đổi kích thước
    window.addEventListener('resize', () => {
        myChart?.resize()
    })
})

onBeforeUnmount(() => {
    // Hủy biểu đồ để tránh rò rỉ bộ nhớ
    myChart?.dispose()
    window.removeEventListener('resize', () => {
        myChart?.resize()
    })
})
</script>

<style scoped>
.col-sm-3 {
    padding: 0px 6px;
}
</style>