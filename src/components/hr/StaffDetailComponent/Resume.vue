<template>
    <div class="container mt-4">
        <div class="row">
            <div class="col-6">
                <div class="summary-card">
                    <div class="row">
                        <div class="col-6"><h6>Kinh nghiệm</h6></div>
                    </div>

                    <div class="experience-entry mt-4" v-for="kinhNghiem in listKinhNghiem" :key="kinhNghiem.tenCongTy">
                        <span class="experience-date"
                            >{{ kinhNghiem.thoiGianBatDau }} - {{ kinhNghiem.thoiGianKetThuc }}</span
                        >
                        <p>
                            <strong>{{ kinhNghiem.tenCongTy }}</strong>
                        </p>
                        <p>{{ kinhNghiem.moTaCongViec }}</p>
                        <span class="delete-icon">
                            <i class="fas fa-trash"></i>
                        </span>
                    </div>
                </div>
            </div>

            <div class="col-6">
                <div class="summary-card">
                    <div class="row">
                        <div class="col-6"><h6>Học vấn</h6></div>
                    </div>

                    <div class="experience-entry mt-4" v-for="hocVan in listHocVan" :key="hocVan.maNhanVien">
                        <span class="experience-date">Năm tốt nghiệp: {{ hocVan.namTotNghiep }}</span>
                        <p>
                            <strong>{{ hocVan.coSoGiaoDuc }}</strong>
                        </p>
                        <p>{{ hocVan.chuyenNganh }}</p>
                        <span class="delete-icon">
                            <i class="fas fa-trash"></i>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { get } from '@/stores/https'

const listKinhNghiem = ref([])
const listHocVan = ref([])

const props = defineProps({
    staff: Object,
})

onMounted(async () => {
    await getAllKinhNghiem()
    await getAllHocVan()
})

const getAllKinhNghiem = async () => {
    if (props.staff.maNhanVien) {
        const maNhanVien = props.staff.maNhanVien
        const response = await get('/api/v1/work-histories', { maNhanVien })
        listKinhNghiem.value = response.data
    }
}

const getAllHocVan = async () => {
    if (props.staff.maNhanVien) {
        const maNhanVien = props.staff.maNhanVien
        const response = await get(`/api/v1/educations/${maNhanVien}`)
        listHocVan.value = response.data
    }
}
</script>

<style>
.summary-card {
    border: 1px solid #dee2e6;
    border-radius: 10px;
    padding: 20px;
}

.experience-entry {
    border-left: 4px solid #17a2b8; /* Highlight bar */
    padding-left: 10px;
    margin-bottom: 15px;
    position: relative;
}

.experience-entry p {
    margin: 0;
}

.delete-icon {
    position: absolute;
    top: 0;
    right: 10px;
    cursor: pointer;
    color: #6c757d;
}

.delete-icon:hover {
    color: #dc3545;
}

.add-btn {
    float: right;
}

.experience-date {
    color: #6c757d;
}
</style>
