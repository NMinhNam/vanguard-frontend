<template>
    <form @submit.prevent="validate" class="row">
        <div class="col-md-6">
            <!-- Ngày sinh -->
            <div class="form-group row mb-3">
                <label for="ngaySinh" class="col-sm-4 col-form-label">Ngày sinh</label>
                <div class="col-sm-8">
                    <input
                        :class="{ 'is-invalid': error.ngaySinh }"
                        type="date"
                        class="form-control"
                        v-model="props.staff.ngaySinh"
                    />
                    <div class="invalid-feedback" v-if="error.ngaySinh">Ngày sinh không được để trống.</div>
                </div>
            </div>

            <div class="form-group row mb-3">
                <label for="gioiTinh" class="col-sm-4 col-form-label">Giới tính</label>
                <div class="col-sm-8">
                    <div class="form-check form-check-inline">
                        <input
                            class="form-check-input"
                            v-model="props.staff.gioiTinh"
                            type="radio"
                            name="gioiTinh"
                            id="nam"
                            checked="true"
                            :value="true"
                        />
                        <label class="form-check-label" for="nam">Nam</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input
                            v-model="props.staff.gioiTinh"
                            class="form-check-input"
                            type="radio"
                            name="gioiTinh"
                            id="nu"
                            :value="false"
                        />
                        <label class="form-check-label" for="nu">Nữ</label>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-md-6">
            <!-- Căn cước công dân -->
            <div class="form-group row mb-3">
                <label for="cccd" class="col-sm-4 col-form-label">Căn cước công dân</label>
                <div class="col-sm-8">
                    <input
                        :class="{ 'is-invalid': error.cccd }"
                        type="text"
                        v-model="props.staff.cccd"
                        class="form-control"
                        id="cccd"
                        placeholder="Nhập căn cước công dân"
                    />
                    <div class="invalid-feedback" v-if="error.cccd">Căn cước công dân sai định dạng</div>
                </div>
            </div>
        </div>
    </form>
</template>

<script setup>
const props = defineProps({
    staff: {
        type: Object,
    },
    error: Object,
})
</script>
