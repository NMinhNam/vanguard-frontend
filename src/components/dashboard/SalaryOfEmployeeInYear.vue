<template>
    <div class="chart-container fw-bolder d-flex flex-column align-items-start">
        <div class="row w-100">
            <div class="col-1 col-md-1 col-lg-1">
                <select class="mt-2 ms-2 form-select form-select-sm px-2" v-model="selectedYear" @change="onYearChange">
                    <option v-for="year in availableYears" :key="year" :value="year">
                        {{ year }}
                    </option>
                </select>
            </div>
        </div>
        <span class="mx-auto text-center">Thống kê lương hàng tháng</span>
        <div ref="chart" style="width: 100%; height: 300px"></div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'
import { get } from '@/stores/https'
import router from '@/router'

const chart = ref(null)
let chartInstance = null

const availableYears = ref([])
const selectedYear = ref({})
const chartData = ref([])

onMounted(async () => {
    await getDataChart()
    availableYears.value = [...new Set(chartData.value.map((item) => new Date(item.thangNam).getFullYear()))]
    selectedYear.value = availableYears.value[0]
    initChart()
    window.addEventListener('resize', resizeChart)
})

const maNhanVien = router.currentRoute.value.params.maNhanVien

const getDataChart = async () => {
    try {
        const response = await get(`/api/v1/statistic/salary/employee/${maNhanVien}`)
        chartData.value = response.data
    } catch (error) {
        console.log(error)
    }
}

onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeChart)
    if (chartInstance) {
        chartInstance.dispose()
    }
})

const processedData = (year) => {
    return chartData.value.reduce((acc, item) => {
        const month = new Date(item.thangNam).getMonth() + 1
        const itemYear = new Date(item.thangNam).getFullYear()

        if (itemYear !== year) return acc

        if (!acc[month]) {
            acc[month] = 0
        }

        acc[month] += item.tongLuongThucNhan

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
    const dataForSelectedYear = processedData(selectedYear.value)

    const monthlyData = months.map((month, index) => {
        const key = index + 1
        return dataForSelectedYear[key] || 0
    })

    const options = {
        tooltip: {
            trigger: 'axis',
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
            data: months,
        },
        yAxis: {
            type: 'value',
            name: 'Lương',
            nameLocation: 'end',
            nameGap: 25,
        },
        series: [
            {
                name: 'Tổng lương',
                type: 'line',
                data: monthlyData,
                lineStyle: {
                    color: '#5DB996',
                    width: 3,
                },
                itemStyle: {
                    color: '#118B50',
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
</script>

<style scoped></style>
