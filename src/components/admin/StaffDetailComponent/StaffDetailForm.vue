<template>
    <div class="card custom-card border-0">
        <div class="row">
            <div class="col-md-9">
                <h2 class="card-title"></h2>
                <input
                    type="text"
                    :class="{ 'is-invalid': error.hoTen }"
                    v-model="props.staff.hoTen"
                    :placeholder="$t('staffManagement.items.full_name')"
                />
                <div class="invalid-feedback" v-if="error.hoTen">Tên không được để trống</div>
                <br />
                <span class="badge bg-primary">{{ staff.maNhanVien }}</span>
                <p class="text-muted">{{ props.staff.tenChucVu }}</p>
            </div>

            <div class="col-md-3 d-flex justify-content-center align-items-center mt-2">
                <div class="avatar-container w-50">
                    <img
                        v-if="props.staff.hinhAnh"
                        :src="props.staff.hinhAnh"
                        :alt="props.staff.hoTen || 'Avatar'"
                        class="img-fluid avatar"
                    />
                    <img
                        v-else
                        src="https://khodulieu.sohoa.tuyenquang.gov.vn/congthongtin/thanhpho.tuyenquang.gov.vn/uploads/thumbnails/af90226ec4555c15e919244248b4cc21.jpg"
                        alt="Avatar"
                        class="img-fluid avatar"
                    />
                </div>
            </div>
        </div>

        <div class="row mt-4">
            <div class="col-md-6">
                <h5 class="section-title">{{ $t('staffManagement.header.personal_infomation') }}</h5>
                <!-- Work Mobile -->
                <div class="row mb-3">
                    <label for="phone" class="col-sm-4 col-form-label">{{ $t('staffManagement.items.phone') }}</label>
                    <div class="col-sm-8">
                        <input
                            type="text"
                            class="form-control"
                            :class="{ 'is-invalid': error.dienThoai }"
                            v-model="props.staff.dienThoai"
                            placeholder="Số điện thoại"
                        />
                        <div class="invalid-feedback" v-if="error.dienThoai">Số điện thoại sai định dạng</div>
                    </div>
                </div>
                <!-- Work Address -->
                <div class="row mb-3">
                    <label for="address" class="col-sm-4 col-form-label">{{
                        $t('staffManagement.items.address')
                    }}</label>
                    <div class="col-sm-8">
                        <input
                            type="text"
                            class="form-control"
                            id="address"
                            v-model="props.staff.diaChi"
                            placeholder="Địa chỉ"
                        />
                    </div>
                </div>
                <!-- Work Email -->
                <div class="row mb-3">
                    <label for="email" class="col-sm-4 col-form-label">{{ $t('staffManagement.items.email') }}</label>
                    <div class="col-sm-8">
                        <input
                            type="email"
                            class="form-control"
                            :class="{ 'is-invalid': error.email }"
                            id="email"
                            v-model="props.staff.email"
                            placeholder="@gmail.com"
                        />
                        <div class="invalid-feedback" v-if="error.email">Email sai định dạng</div>
                    </div>
                </div>
            </div>

            <div class="col-md-6">
                <h5 class="section-title">{{ $t('staffManagement.header.job_infomation') }}</h5>
                <!-- Department -->
                <div class="row mb-3">
                    <label for="department" class="col-sm-4 col-form-label">{{
                        $t('staffManagement.items.department')
                    }}</label>
                    <div class="col-sm-8">
                        <select
                            id="phongBanSelect"
                            v-model="props.staff.maPhongBan"
                            :class="{ 'is-invalid': error.maPhongBan }"
                            class="form-select"
                            placeholder="Chọn phòng ban"
                        >
                            <option selected value="">Chọn phòng ban</option>
                            <option
                                v-for="phongBan in listPhongBan"
                                :key="phongBan.maPhongBan"
                                :value="phongBan.maPhongBan"
                            >
                                {{ phongBan.tenPhongBan }}
                            </option>
                        </select>
                        <div class="invalid-feedback" v-if="error.maPhongBan">Mã phòng ban không được để trống</div>
                    </div>
                </div>
                <!-- Job Position -->
                <div class="row mb-3">
                    <label for="viTriSelect" class="col-sm-4 col-form-label">{{
                        $t('staffManagement.items.position')
                    }}</label>
                    <div class="col-sm-8">
                        <select
                            id="viTriSelect"
                            v-model="props.staff.maChucVu"
                            :class="{ 'is-invalid': error.maChucVu }"
                            class="form-select"
                        >
                            <option value="">Chọn vị trí</option>
                            <option v-for="viTri in listViTri" :key="viTri.maChucVu" :value="viTri.maChucVu">
                                {{ viTri.tenChucVu }}
                            </option>
                        </select>
                        <div class="invalid-feedback" v-if="error.maChucVu">Chức vụ không được để trống</div>
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="quanLySelect" class="col-sm-4 col-form-label">{{
                        $t('staffManagement.items.manager')
                    }}</label>
                    <div class="col-sm-8">
                        <select
                            id="quanLySelect"
                            v-model="props.staff.quanLy"
                            :class="{ 'is-invalid': error.quanLy }"
                            class="slim-select"
                        >
                            <option value="">Chọn Quản lý</option>
                            <option v-for="quanLy in listStaff" :key="quanLy.maNhanVien" :value="quanLy.maNhanVien">
                                {{ quanLy.hoTen }}
                            </option>
                        </select>
                        <div class="invalid-feedback" v-if="error.maChucVu">Chức vụ không được để trống</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { get } from '@/stores/https'
import SlimSelect from 'slim-select'
import { useI18n } from 'vue-i18n'
import { type } from 'jquery'
const { t, locale } = useI18n()
const listPhongBan = ref([])
const listViTri = ref([])
const listStaff = ref([])
const slimSelectInstance = ref('')
const props = defineProps({
    staff: {
        type: Object,
    },
    error: Object,
})

onMounted(async () => {
    await getAllStaff()
    await getAllPhongBan()
    await getAllViTri()
    await createSlimSelect()
})

const createSlimSelect = () => {
    slimSelectInstance.value = new SlimSelect({
        select: '#quanLySelect',
        closeOnSelect: false,
    })
}

const getAllStaff = async () => {
    const response = await get('/api/v1/employees')
    listStaff.value = response.data.filter((staff) => staff.maNhanVien !== props.staff.maNhanVien)
}

const getAllPhongBan = async () => {
    const response = await get('/api/v1/departments')
    listPhongBan.value = response.data
}

const getAllViTri = async () => {
    const response = await get('/api/v1/positions')
    listViTri.value = response.data
}
</script>

<style scope>
@import url('https://cdn.jsdelivr.net/npm/slim-select@latest/dist/slimselect.min.css');
</style>
