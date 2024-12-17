<template>
    <div class="pt-3 text-center fw-bolder">
        <span>Thống kê trạng thái đơn trong tháng</span>
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
                    { value: listChuaDuyet.value.length, name: 'Chưa duyệt' },
                    { value: listDaDuyet.value.length, name: 'Đã duyệt' },
                    { value: listTuChoi.value.length, name: 'Từ chối' },
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
    await getAllYeuCau()
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
