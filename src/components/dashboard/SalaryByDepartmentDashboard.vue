<template>
    <div class="chart-container pt-3 text-center fw-bolder">
        <span>Mức lương theo phòng ban</span>
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
    const response = await get('api/v1/statistic/salary-by-department')
    chartData.value = response.data
}
const chartData = ref([])

const initChart = () => {
    if (!chart.value) return
    const departments = chartData.value.map((item) => item.tenPhongBan)
    const employeeCounts = chartData.value.map((item) => item.tongLuong)

    chartInstance = echarts.init(chart.value)

    const options = {
        tooltip: {
            trigger: 'axis',
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
            data: departments,
            name: 'Phòng ban',
            nameLocation: 'middle',
            nameGap: 25,
        },
        yAxis: {
            type: 'value',
            name: 'Lương',
            axisLabel: {
                rotate: 45, // Xoay chữ 45 độ nếu cần thiết
                interval: 0, // Đảm bảo mỗi nhãn đều được hiển thị
            },
        },
        series: [
            {
                data: employeeCounts,
                type: 'bar',
                itemStyle: {
                    color: '#4CAF50',
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
  