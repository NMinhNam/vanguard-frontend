<template>
    <div class="p-0">
        <div class="row row-cols-md-3s g-4">
            <div class="col">
                <h4>Đang chờ duyệt</h4>
                <hr />
                <div
                    class="mb-3"
                    v-for="candidate in listCandidate"
                    :key="candidate.maUngVien"
                    @click="$router.push(`/admin/recruitmentstage/${candidate.maUngVien}`)"
                >
                    <div class="card p-2 h-100 position-relative" v-if="candidate.trangThai === 1">
                        <div class="card-body d-flex p-0">
                            <div class="approve-avatar">
                                <img
                                    src="https://www.nhadep.net/wp-content/uploads/2013/12/Ghe-day-thung_01-1.jpg"
                                    class="img-fluid"
                                    :alt="candidate.hoTen"
                                />
                            </div>
                            <div class="approve-info px-3 py-0 flex-grow-1 row">
                                <div class="col-12">
                                    <h5 class="card-title">Họ tên: {{ candidate.hoTen }}</h5>
                                    <h5 class="card-title">
                                        Trạng thái: <span class="badge bg-warning">Chờ duyệt</span>
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col">
                <h4>Phỏng vấn lần 1</h4>
                <hr />
                <div
                    class="mb-3"
                    v-for="candidate in listCandidate"
                    :key="candidate.maUngVien"
                    @click="$router.push(`/admin/recruitmentstage/${candidate.maUngVien}`)"
                >
                    <div class="card p-2 h-100 position-relative" v-if="candidate.trangThai === 2">
                        <div class="card-body d-flex p-0">
                            <div class="approve-avatar">
                                <img
                                    src="https://www.nhadep.net/wp-content/uploads/2013/12/Ghe-day-thung_01-1.jpg"
                                    class="img-fluid"
                                    :alt="candidate.hoTen"
                                />
                            </div>
                            <div class="approve-info px-3 py-0 flex-grow-1 row">
                                <div class="col-12">
                                    <h5 class="card-title">Họ tên: {{ candidate.hoTen }}</h5>
                                    <h5 class="card-title">
                                        Trạng thái: <span class="badge bg-info">Phỏng vấn lần 1</span>
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col">
                <h4>Phỏng vấn lần 2</h4>
                <hr />
                <div
                    class="mb-3"
                    v-for="candidate in listCandidate"
                    :key="candidate.maUngVien"
                    @click="$router.push(`/admin/recruitmentstage/${candidate.maUngVien}`)"
                >
                    <div class="card p-2 h-100 position-relative" v-if="candidate.trangThai === 3">
                        <div class="card-body d-flex p-0">
                            <div class="approve-avatar">
                                <img
                                    src="https://www.nhadep.net/wp-content/uploads/2013/12/Ghe-day-thung_01-1.jpg"
                                    class="img-fluid"
                                    :alt="candidate.hoTen"
                                />
                            </div>
                            <div class="approve-info px-3 py-0 flex-grow-1 row">
                                <div class="col-12">
                                    <h5 class="card-title">Họ tên: {{ candidate.hoTen }}</h5>
                                    <h5 class="card-title">
                                        Trạng thái: <span class="badge bg-primary">Phỏng vấn lần 2</span>
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col">
                <h4>Đạt yêu cầu</h4>
                <hr />
                <div
                    class="mb-3"
                    v-for="candidate in listCandidate"
                    :key="candidate.maUngVien"
                    @click="$router.push(`/admin/recruitmentstage/${candidate.maUngVien}`)"
                >
                    <div class="card p-2 h-100 position-relative" v-if="candidate.trangThai === 4">
                        <div class="card-body d-flex p-0">
                            <div class="approve-avatar">
                                <img
                                    src="https://www.nhadep.net/wp-content/uploads/2013/12/Ghe-day-thung_01-1.jpg"
                                    class="img-fluid"
                                    :alt="candidate.hoTen"
                                />
                            </div>
                            <div class="approve-info px-3 py-0 flex-grow-1 row">
                                <div class="col-12">
                                    <h5 class="card-title">Họ tên: {{ candidate.hoTen }}</h5>
                                    <h5 class="card-title">
                                        Trạng thái: <span class="badge bg-success">Đạt yêu cầu</span>
                                    </h5>
                                </div>
                                <div class="col-12 d-flex">
                                    <div class="ms-auto">
                                        <button @click.stop="navigateToAddStaff(candidate)" class="btn btn-primary">
                                            Tạo nhân viên
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const navigateToAddStaff = (candidate) => {
    sessionStorage.setItem('selectedCandidate', JSON.stringify(candidate)) // Lưu vào sessionStorage
    router.push('/admin/staff/addstaff')
}

const props = defineProps({
    listCandidate: Array,
})
onMounted(async () => {})

</script>

<style scoped>
.card {
    border: 1px solid #e0e0e0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: relative; /* Để cho các phần tử con có thể dùng position absolute */
}

.approve-avatar {
    width: 70px;
    height: 70px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
}

.approve-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.approve-info {
    min-width: 0;
}

.card-title {
    font-size: 1rem;
    font-weight: bold;
}

.btn-custom {
    background-color: #8e4f68;
    color: white;
    border-radius: 8px;
    padding: 0.5rem 1rem;
}

.btn-secondary {
    background-color: #e0e0e0;
    color: #6c757d;
    border-radius: 8px;
    padding: 0.5rem 1rem;
}

.status-indicator {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: inline-block;
}

.position-absolute {
    position: absolute;
}

.bottom-0 {
    bottom: 0;
}

.end-0 {
    right: 0;
}
</style>
