<template>
    <div class="container-fluid m-0">
        <div class="row">
            <div class="col-12 col-md-4">
                <div class="card boder-left-1 shadow-sm">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                            <h5 class="card-title fw-bold">Tổng nhân viên</h5>
                        </div>
                        <div class="d-flex align-items-center mb-2 ms-2">
                            <h3 class="mb-0 fw-bold">100</h3>
                        </div>
                        <div>
                            <p class="text-muted mb-0">Tháng trước: 0</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-12 col-md-4">
                <div class="card boder-left-2 shadow-sm">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                            <h5 class="card-title fw-bold">Tỉ lệ nghỉ việc</h5>
                            <div class="select-filter">
                                <select class="form-select border-0 text-secondary">
                                    <option value="">2023</option>
                                    <option value="">2024</option>
                                </select>
                            </div>
                        </div>
                        <div class="d-flex align-items-center mb-2 ms-2">
                            <h3 class="mb-0 fw-bold">1</h3>
                            <span class="text-success ms-3"> <i class="fa-solid fa-arrow-trend-up"></i> 100% </span>
                        </div>
                        <div>
                            <p class="text-muted mb-0">Tháng trước: 0</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-12 col-md-4">
                <div class="card boder-left-3 shadow-sm">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                            <h5 class="card-title fw-bold">Nhân viên mới</h5>
                        </div>
                        <div class="d-flex align-items-center mb-2 ms-2">
                            <h3 class="mb-0 fw-bold">1</h3>
                            <span class="text-success ms-3"> <i class="fa-solid fa-arrow-trend-up"></i> 100% </span>
                        </div>
                        <div>
                            <p class="text-muted mb-0">Tháng trước: 0</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.boder-left-1 {
    border-left: 5px solid #007bff;
}

.boder-left-2 {
    border-left: 5px solid #5db996;
}

.boder-left-3 {
    border-left: 5px solid #fcc737;
}
</style>