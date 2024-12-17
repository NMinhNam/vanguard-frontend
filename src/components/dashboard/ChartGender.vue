<template>
    <div class="text-center fw-bolder pt-2">
        <span>Tỷ lệ nhân viên theo giới tính</span>
        <div ref="chart" style="width: 100%; height: 300px"></div>
    </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'
import { get } from '@/stores/https'

const listNhanVien = ref([])
const listNam = ref([])
const listNu = ref([])

const getListNhanVien = async () => {
    const response = await get('/api/v1/employees')
    listNhanVien.value = response.data

    listNhanVien.value.forEach((item) => {
        if (item.gioiTinh === true) {
            listNam.value.push(item)
        } else {
            listNu.value.push(item)
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
                    { value: listNam.value.length, name: 'Nam' },
                    { value: listNu.value.length, name: 'Nữ' },
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
    await getListNhanVien()
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
