<template>
    <div class="chart-container fw-bolder d-flex flex-column align-items-start">
        <div class="row w-100">
            <div class="col-1 col-md-1 col-lg-1">
                <select class="mt-2 ms-2 form-select form-select-sm" v-model="selectedYear" @change="onYearChange">
                    <option v-for="year in availableYears" :key="year" :value="year">
                        {{ year }}
                    </option>
                </select>
            </div>
        </div>
        <span class="mx-auto text-center">Thống kê biến động nhân sự từng tháng</span>
        <div ref="chart" style="width: 100%; height: 300px"></div>
    </div>
</template>
  
  <script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { get } from '@/stores/https'
import * as echarts from 'echarts'

const chart = ref(null)
let chartInstance = null

const getDataChart = async () => {
    const response = await get('/api/v1/statistic/employee-movement-by-department')
    chartData.value = response.data
}
const chartData = ref([])
const availableYears = ref([])
const selectedYear = ref({})
onMounted(async () => {
    await getDataChart()
    availableYears.value = [...new Set(chartData.value.map((item) => new Date(item.ngayKy).getFullYear()))]
    selectedYear.value = availableYears.value[0]
    initChart()
    window.addEventListener('resize', resizeChart)
})

const processedData = (year) => {
    return chartData.value.reduce((acc, item) => {
        const month = new Date(item.ngayKy).getMonth() + 1
        const itemYear = new Date(item.ngayKy).getFullYear()

        if (itemYear !== year) return acc

        if (!acc[month]) {
            acc[month] = {}
        }

        if (!acc[month][item.tenPhongBan]) {
            acc[month][item.tenPhongBan] = 0
        }

        acc[month][item.tenPhongBan] += item.soLuongNhanVien

        return acc
    }, {})
}

const onYearChange = () => {
    initChart()
}

const initChart = () => {
    if (!chart.value) return

    chartInstance = echarts.init(chart.value)

    const months = [
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
    ]
    const departments = [...new Set(chartData.value.map((item) => item.tenPhongBan))]

    const dataForSelectedYear = processedData(selectedYear.value)

    const options = {
        tooltip: {
            trigger: 'axis',
        },
        legend: {
            data: departments,
        },
        grid: {
            left: '10%',
            right: '4%',
            bottom: '3%',
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
            type: 'category',
            boundaryGap: false,
            data: months,
        },
        yAxis: {
            type: 'value',
            name: 'Nhân viên',
            nameLocation: 'middle',
            nameRotate: 90,
            nameGap: 25,
        },
        series: departments.map((department) => ({
            name: department,
            type: 'line',
            stack: 'Total',
            data: months.map((month, index) => {
                const key = index + 1
                return dataForSelectedYear[key]?.[department] || 0
            }),
            label: {
                show: true,
            },
        })),
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
select {
    margin-bottom: 10px;
    padding: 5px;
}
</style>
  