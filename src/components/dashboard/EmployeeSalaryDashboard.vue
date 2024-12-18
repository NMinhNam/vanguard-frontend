<template>
    <div class="text-center fw-bolder chart-container pt-2">
        <span>Thống kê nhân viên theo mức lương</span>
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
    const response = await get('api/v1/statistic/salary-by-employee')
    chartData.value = response.data
}
const chartData = ref([])

const initChart = () => {
    if (!chart.value) return

    chartInstance = echarts.init(chart.value)

    const sourceData = chartData.value.map((item) => ({ Số_nhân_viên: item.soNhanVien, Mức_lương: item.mucLuong }))

    const options = {
        dataset: {
            source: sourceData,
        },
        grid: {
            containLabel: true,
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
            name: 'Số nhân viên',
            type: 'value',
            nameLocation: 'middle',
            nameGap: 20,

            interval: 1,
        },
        yAxis: {
            name: 'Mức lương (triệu)',
            type: 'category',
        },
        visualMap: {
            orient: 'horizontal',
            left: 'center',
            min: Math.min(...chartData.value.map((item) => item.soNhanVien)),
            max: 10,
            text: ['Nhiều nhân viên', 'Ít nhân viên'],
            dimension: 0,
            inRange: {
                color: ['#65B581', '#FFCE34', '#FD665F'],
            },
        },
        series: [
            {
                type: 'bar',
                encode: {
                    x: 'Số_nhân_viên',
                    y: 'Mức_lương',
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
