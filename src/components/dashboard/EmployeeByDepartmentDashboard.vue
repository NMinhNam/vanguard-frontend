<template>
    <div class="chart-container text-center pt-2 fw-bolder">
        <span>Thống kê nhân viên theo phòng ban</span>
        <div class="mb-2" ref="chart" style="width: 100%; height: 300px"></div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { get } from '@/stores/https'
import * as echarts from 'echarts'

const chart = ref(null)
let chartInstance = null
const chartData = ref([])

onMounted(async () => {
    await getDataChart()
    initChart()
    window.addEventListener('resize', resizeChart)
})

const getDataChart = async () => {
    const response = await get('/api/v1/statistic/departments')
    chartData.value = response.data
}
const initChart = () => {
    if (!chart.value) return

    chartInstance = echarts.init(chart.value)

    const options = {
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
        grid: {
            left: '10%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
        },
        xAxis: [
            {
                type: 'category',
                data: chartData.value.map((item) => item.tenPhongBan),
                axisTick: {
                    alignWithLabel: true,
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        fontSize: 10,
                    },
                    formatter: function (value) {
                        return value.length > 10 ? value.substring(0, 10) + '...' : value
                    },
                },
            },
        ],

        yAxis: [
            {
                name: 'Số Nhân Viên',
                type: 'value',
                nameLocation: 'middle',
                nameRotate: 90,
                nameGap: 25,
            },
        ],
        series: [
            {
                name: 'Số Nhân Viên',
                type: 'bar',
                barWidth: '60%',
                data: chartData.value.map((item) => item.soLuongNhanVien),
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
