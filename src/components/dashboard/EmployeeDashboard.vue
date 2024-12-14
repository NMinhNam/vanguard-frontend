<template>
    <div ref="chart" style="width: 100%; height: 400px"></div>
</template>
  
  <script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'

const chart = ref(null)
let chartInstance = null

const chartData = {
    title: 'Thống kê nhân viên theo phòng ban',
    categories: [
        'Phòng ban 1',
        'Phòng ban 2',
        'Phòng ban 3',
        'Phòng ban 4',
        'Phòng ban 5',
        'Phòng ban 6',
        'Phòng ban 7',
        'Phòng ban 8',
        'Phòng ban 9',
    ],
    series: [15, 23, 22, 21, 13, 22, 21, 13, 11],
}

const colors = ['#FF5733', '#33FF57', '#3357FF', '#F39C12', '#8E44AD', '#FF5733', '#33FF57', '#3357FF', '#F39C12']

const initChart = () => {
    if (!chart.value) return

    chartInstance = echarts.init(chart.value)

    const formattedSeries = chartData.series.map((value, index) => ({
        value,
        itemStyle: { color: colors[index] },
    }))

    const options = {
        title: {
            text: chartData.title,
        },
        tooltip: {
            trigger: 'axis',
        },
        xAxis: {
            type: 'category',
            data: chartData.categories,
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                type: 'bar',
                data: formattedSeries,
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

onMounted(() => {
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
  
  <style scoped>
</style>
  