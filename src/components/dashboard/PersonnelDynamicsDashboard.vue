<template>
    <div ref="chart" style="width: 100%; height: 400px"></div>
</template>
  
  <script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'
import { data } from 'jquery'

const chart = ref(null)
let chartInstance = null

const chartData = {
    title: 'Thống kê nhân sự theo tháng cho từng chức vụ',
    thang: [
        'Tháng 1',
        'Tháng 2',
        'Tháng 3',
        'Tháng 4',
        'Tháng 5',
        'Tháng 6',
        'Tháng 7',
        'Tháng 8',
        'Tháng 9',
        'Tháng 10',
        'Tháng 11',
        'Tháng 12',
    ],
    dataChucVu: {
        'Quản lý': [5, 6, 5, 7, 6, 8, 9, 8, 7, 8, 9, 10],
        'Nhân viên kỹ thuật': [1.2, 7, 11, 13, 14, 15, 6, 17, 18, 19, 20, 21],
        'Nhân viên hành chính': [7, 8, 9, 8, 9, 10, 11, 10, 9, 10, 6, 12],
    },
}

const colors = ['#FF5733', '#33FF57', '#3357FF', '#F39C12', '#8E44AD', '#FF5733', '#33FF57', '#3357FF', '#F39C12']

const initChart = () => {
    if (!chart.value) return

    chartInstance = echarts.init(chart.value)

    const seriesData = Object.keys(chartData.dataChucVu).map((role, index) => ({
        name: role,
        type: 'line',
        data: chartData.dataChucVu[role],
        color: colors[index],
        smooth: true,
        itemStyle: {
            color: colors[index],
        },
        emphasis: {
            focus: 'series',
        },
    }))

    const options = {
        title: {
            text: chartData.title,
        },
        tooltip: {
            trigger: 'axis',
        },
        legend: {
            data: chartData.chucVu,
        },
        toolbox: {
            feature: {
                saveAsImage: {},
            },
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: chartData.thang,
            },
        ],
        yAxis: [
            {
                type: 'value',
                axisLabel: {
                    formatter: '{value}',
                },
            },
        ],
        series: seriesData,
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
  