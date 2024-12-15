<template>
    <div class="text-center fw-bolder card pt-3">
        <div class="col-sm-12 row m-0 mb-3">
            <div class="col-sm-4">
                <div class="item card justify-content-center" style="background-color: #91d5ff">
                    <span>Tổng số hợp đồng: {{ listHopDong.length }}</span>
                </div>
            </div>
            <div class="col-sm-3 p-0">
                <div class="item card justify-content-center" style="background-color: #ffe58f">
                    <span>Hợp đồng mới: {{ listHopDongMoi.length }}</span>
                </div>
            </div>
            <div class="col-sm-5">
                <div class="item card justify-content-center" style="background-color: #ffadd2">
                    <span>Hợp đồng sắp hết hạn: {{ listHopDongCu.length }}</span>
                </div>
            </div>
        </div>
        <span>Thống kê hợp đồng theo thời hạn</span>
        <div ref="chart" style="width: 100%; height: 400px"></div>
    </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'
import { get } from '@/stores/https'

const listHopDong = ref([])
const listHopDongMoi = ref([])
const listHopDongCu = ref([])
const listHopDong1Nam = ref([])
const listHopDong2Nam = ref([])
const listHopDong3Nam = ref([])

const getListHopDong = async () => {
    const response = await get('/api/v1/contracts')
    listHopDong.value = response.data

    const currentYear = new Date().getFullYear()

    listHopDong.value.forEach((item) => {
        const ngayBatDau = new Date(item.ngayBatDau)
        const ngayKetThuc = new Date(item.ngayKetThuc)
        if (ngayBatDau === currentYear) {
            listHopDongMoi.value.push(item)
        }
        if (ngayKetThuc === currentYear || item.ngayKetThuc === currentYear + 1) {
            listNu.value.push(item)
        }

        if (item.thoiHan === 1) {
            listHopDong1Nam.value.push(item)
        } else if (item.thoiHan === 2) {
            listHopDong2Nam.value.push(item)
        } else {
            listHopDong3Nam.value.push(item)
        }
    })
}

const chart = ref(null)
let chartInstance = null

const initChart = () => {
    if (!chart.value) return

    chartInstance = echarts.init(chart.value)

    const option = {
        tooltip: {
            trigger: 'item',
        },
        legend: {
            top: '5%',
            left: 'center',
        },
        series: [
            {
                name: 'Số lượng',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center',
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold',
                    },
                },
                labelLine: {
                    show: false,
                },
                data: [
                    { value: listHopDong1Nam.value.length, name: 'Hợp đồng 1 Năm' },
                    { value: listHopDong2Nam.value.length, name: 'Hợp đồng 2 Năm' },
                    { value: listHopDong3Nam.value.length, name: 'Hợp đồng 3 Năm' },
                ],
            },
        ],
    }

    chartInstance.setOption(option)
}

const resizeChart = () => {
    if (chartInstance) {
        chartInstance.resize()
    }
}

onMounted(async () => {
    await getListHopDong()
    initChart()
    window.addEventListener('resize', resizeChart)
})

onBeforeUnmount(() => {
    if (chartInstance) {
        chartInstance.dispose()
    }
    window.removeEventListener('resize', resizeChart)
})
</script>
<style>
.item {
    height: 50px;
    color: #2c2c2c;
}
</style>
