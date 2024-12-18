<template>
    <div class="card custom-card border-0">
        <div class="row">
            <div class="col-md-9">
                <h5 class="card-title">{{ t('approve.detail') }}</h5>
                <input type="text" readonly :value="approveDetail.loaiDon" class="fs-2" />
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-md-6">
                <div>
                    <div class="row mb-3">
                        <label for="nguoiYeuCau" class="col-3 col-form-label">{{
                            t('approve.table.ordercreater')
                        }}</label>
                        <div class="col-9">
                            <input
                                type="text"
                                id="nguoiYeuCau"
                                class="form-control"
                                :value="approveDetail.hoTenNguoiTao"
                                readonly
                            />
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="danhMuc" class="col-3 col-form-label">{{ t('approve.table.reason') }}</label>
                        <div class="col-9">
                            <input
                                type="text"
                                id="danhMuc"
                                class="form-control"
                                :value="approveDetail.loaiDon"
                                readonly
                            />
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="ngayTao" class="col-3 col-form-label">{{ t('approve.table.datesend') }}</label>
                        <div class="col-9">
                            <input
                                type="text"
                                id="ngayTao"
                                class="form-control"
                                :value="approveDetail.ngayTao"
                                readonly
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-6">
                <div>
                    <div class="row mb-3">
                        <label for="nguoiYeuCau" class="col-3 col-form-label">{{ t('approve.table.reviewer') }}</label>
                        <div class="col-9">
                            <input
                                type="text"
                                id="nguoiYeuCau"
                                class="form-control"
                                :value="approveDetail.hoTenNguoiPheDuyet"
                                readonly
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <div class="row mb-3">
                        <label for="nguoiYeuCau" class="col-3 col-form-label">{{ t('approve.table.status') }}</label>
                        <div class="col-9">
                            <span v-if="approveDetail.trangThai === 1" class="badge bg-warning">{{
                                t('approve.status.summited')
                            }}</span>
                            <span v-if="approveDetail.trangThai === 2" class="badge bg-success">{{
                                t('approve.status.approved')
                            }}</span>
                            <span v-if="approveDetail.trangThai === 3" class="badge bg-danger">{{
                                t('approve.status.rejected')
                            }}</span>
                        </div>
                    </div>
                </div>

                <div class="row mb-3">
                    <label for="ghiChu" class="col-3 col-form-label">{{ t('approve.note') }}</label>
                    <div class="col-9">
                        <input type="text" id="ghiChu" class="form-control" v-model="approveDetail.ghiChu" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const props = defineProps({
    approveDetail: Object,
})

onMounted(async () => {})
</script>
