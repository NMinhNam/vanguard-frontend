<template>
    <div id="tree" ref="tree"></div>
</template>

<script setup>
import { get, post } from '@/stores/https'
import { ref, onMounted, reactive } from 'vue'
import OrgChart from '@balkangraph/orgchart.js'

const dataChart = ref([])
const phongBan = reactive({
    maPhongBan: '',
    tenPhongBan: '',
    truongPhong: '',
    maPhongBanCapTren: '',
})

const mapData = (data) => {
    return data.map((item) => ({
        id: item.maPhongBan,
        pid: item.maPhongBanCapTren,
        tenPhongBan: item.tenPhongBan,
        truongPhong: item.truongPhong,
        soLuongNhanVien: item.soLuongNhanVien,
        anhTruongPhong: item.anhTruongPhong,
    }))
}

const tree = ref(null)

onMounted(async () => {
    await getAllDataChart()
    renderChart()
})

const getAllDataChart = async () => {
    const response = await get('/api/v1/departments/orgchart')
    dataChart.value = response.data
}

const getPhongBanByMaPhongBan = async (maPhongBan) => {
    const response = await get('/api/v1/departments/search', { maPhongBan })
    if (response.data) {
        const data = response.data
        phongBan.maPhongBan = data.maPhongBan
        phongBan.tenPhongBan = data.tenPhongBan
        phongBan.truongPhong = data.truongPhong
        phongBan.maPhongBanCapTren = data.maPhongBanCapTren
    }
}

const updatePhongBanCapTren = async (maPhongBan, maPhongBanCapTren) => {
    if (maPhongBan && maPhongBanCapTren) {
        await getPhongBanByMaPhongBan(maPhongBan)
        phongBan.maPhongBanCapTren = maPhongBanCapTren
        try {
            const response = await post('/api/v1/departments', phongBan)
            getAllDataChart()
        } catch (error) {
            console.error(error)
        }
    }
}

const renderChart = () => {
    const chart = new OrgChart(tree.value, {
        nodes: mapData(dataChart.value),
        nodeBinding: {
            field_0: 'tenPhongBan',
            field_1: 'truongPhong',
            field_2: 'soLuongNhanVien',
            img_0: 'anhTruongPhong',
        },
        zoom: { speed: 30, smooth: 5 },
        idField: 'maPhongBan',
        pidField: 'maPhongBanCapTren',
        nodeWidth: 180,
        nodeHeight: 80,
        enableSearch: true,
        searchFields: ['tenPhongBan'],
        enableDragDrop: true,
        movable: OrgChart.movable.node,
        layout: OrgChart.normal,
        template: 'ula',
        editForm: {
            generateElementsFromFields: false,
            elements: [
                { type: 'textbox', label: 'Tên phòng ban', binding: 'tenPhongBan' },
                { type: 'textbox', label: 'Trưởng phòng', binding: 'truongPhong' },
                { type: 'textbox', label: 'Số nhân viên', binding: 'soLuongNhanVien' },
            ],
            photoBinding: 'anhTruongPhong',
            addMore: null,
            buttons: {
                edit: null,
                share: null,
                pdf: {
                    icon: OrgChart.icon.pdf(24, 24, '#fff'),
                    text: 'Save as PDF',
                },
                remove: null,
            },
        },
    })
    chart.onDrop((sender) => {
        updatePhongBanCapTren(sender.dragId, sender.dropId)
    })
}
</script>

<style></style>
