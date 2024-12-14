<script setup></script>
<template>
    <div class="col-sm-12 gap-2 flex-row m-0 mt-2 card border-0">
        <div class="col-sm-4 card-body border my-2 rounded-3 ">
            <div class="mb-4">
                <div class="d-flex justify-content-between align-items-center">
                    <p>{{ $t('pay_roll.items.total_income') }}</p>
                    <i class="fa-regular fa-credit-card mb-3"></i>
                </div>
                <b>36.000.000 VNĐ</b>
            </div>
            <div class="mb-4">
                <p>{{ $t('pay_roll.items.bonus') }}</p>
                <b>0 VNĐ</b>
            </div>
            <div class="mb-4">
                <p>{{ $t('pay_roll.items.violation') }}</p>
                <b>0 VNĐ</b>
            </div>
            <div class="mb-4">
                <p>{{ $t('pay_roll.items.allowance') }}</p>
                <b>0 VNĐ</b>
                <hr>
            </div>
            <div class="mb-4">
                <p>{{ $t('pay_roll.items.net_pay') }}</p>
                <b class="text-success">0 VNĐ</b>
            </div>
        </div>
        <div class="col-sm-4 card-body border my-2 rounded-3">
            <div class="d-flex justify-content-between align-items-center">
                <p>{{ $t('pay_roll.items.violation_bonus') }}</p>
                <i class="fa-solid fa-receipt mb-3"></i>
            </div>
            <div class="mb-3">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <b>{{ $t('pay_roll.items.violation') }}</b>
                    <b>0 VNĐ</b>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <span>Đi làm muộn</span>
                    <span>0 VNĐ</span>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <span>Về sớm</span>
                    <span>0 VNĐ</span>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <span>Nghỉ không phép</span>
                    <span>0 VNĐ</span>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <span>Làm việc riêng nhiều</span>
                    <span>0 VNĐ</span>
                </div>
            </div>
            <div class="mb-3">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <b>{{ $t('pay_roll.items.bonus') }}</b>
                    <b>0 VNĐ</b>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <span>Thưởng chuyên cần</span>
                    <span>0 VNĐ</span>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <span>Thưởng năng suất</span>
                    <span>0 VNĐ</span>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <span>Thưởng hỗ trợ cộng đồng</span>
                    <span>0 VNĐ</span>
                </div>
            </div>
        </div>
        <div class="col-sm-4 card-body border my-2 rounded-3">
            <div class="d-flex justify-content-between align-items-center">
                <p>{{ $t('pay_roll.items.additional_information') }}</p>
                <i class="fa-solid fa-circle-info mb-3"></i>
            </div>
            <div class="d-flex justify-content-between align-items-center">
                <span>Số ngày công</span>
                <span>24 ngày</span>
            </div>
            <div class="d-flex justify-content-between align-items-center">
                <span>Số giờ công</span>
                <span>12 giờ</span>
            </div>
            <div class="d-flex justify-content-between align-items-center">
                <span>Lương cơ bản</span>
                <span>0 VNĐ</span>
            </div>
            <div class="d-flex justify-content-between align-items-center">
                <span>Hệ số lương</span>
                <span>0 VNĐ</span>
            </div>
            <div class="d-flex justify-content-between align-items-center">
                <span>Cách tính lương</span>
            </div>
        </div>
    </div>
</template>
<style scoped></style>