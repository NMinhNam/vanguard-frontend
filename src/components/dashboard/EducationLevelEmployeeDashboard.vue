<template>
    <div class="text-center fw-bolder pt-2">
        <span>Trình độ học vấn</span>
        <div ref="chart" style="width: 100%; height: 300px"></div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { get } from '@/stores/https'
import * as echarts from 'echarts'

const chart = ref(null)
let chartInstance = null

onMounted(async () => {
    await getDataChart()
    initChart()
    window.addEventListener('resize', resizeChart)
})

const getDataChart = async () => {
    const response = await get('/api/v1/statistic/education-by-employee')
    chartData.value = response.data
}
const chartData = ref([])

const initChart = () => {
    if (!chart.value) return
    chartInstance = echarts.init(chart.value)
    const dataMap = chartData.value.map((item) => ({
        value: item.soLuongNhanVien,
        name: item.tenTrinhDo,
    }))

    const options = {
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
            orient: 'vertical',
            left: 'left',
        },
        series: [
            {
                name: 'Nhân viên',
                type: 'pie',
                radius: '50%',
                data: dataMap,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                    },
                },
            },
        ],
    }

    chartInstance.setOption(options)
}

const resizeChart = () => {
    if (chartInstance) {
        chartInstance.resize()
    }
}

onBeforeUnmount(() => {
    if (chartInstance) {
        chartInstance.dispose()
    }
    window.removeEventListener('resize', resizeChart)
})
</script>

<style scoped>
</style>
