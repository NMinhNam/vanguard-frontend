<template>
    <div class="p-4 border-0 border-bottom border-secondary-subtle">
        <div class="head-menu col-12">
            <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center">
                    <button class="btn btn-primary me-2" @click="$router.go(-1)">
                        <div class="d-flex align-items-center">
                            <span class="material-symbols-outlined"> undo</span> Quay lại
                        </div>
                    </button>
                    <h5 class="mb-0">Employees</h5>
                </div>
                <div class="d-flex align-items-center">
                    <button
                        @click="$emit('saveNhanVien')"
                        type="submit"
                        class="btn btn-success w-100 fw-bold me-2"
                        :disabled="loading"
                        :class="{ loading: loading }"
                    >
                        <span
                            v-if="loading"
                            class="spinner-border me-2 spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                        ></span>
                        <span v-if="!loading"><i class="fa-solid fa-download me-2"></i></span>Save
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    loading: Boolean,
    nhanVien: Object,
})
const clearForm = () => {
    props.nhanVien.maNhanVien = ''
    props.nhanVien.hoTen = ''
    props.nhanVien.gioiTinh = true
    props.nhanVien.ngaySinh = ''
    props.nhanVien.dienThoai = ''
    props.nhanVien.cccd = ''
    props.nhanVien.diaChi = ''
    props.nhanVien.hinhAnh = ''
    props.nhanVien.email = ''
    props.nhanVien.maPhongBan = ''
    props.nhanVien.maBoPhan = ''
    props.nhanVien.maChucVu = ''
}
</script>

<style scoped>
.spinner-border {
    width: 1.2rem;
    height: 1.2rem;
}
</style>