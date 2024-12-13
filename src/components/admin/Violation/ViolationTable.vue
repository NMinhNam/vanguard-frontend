<script setup>
import { reactive, ref } from 'vue';
import { useValidation } from '@/stores/mixin/validate_form'

const showPopup = ref(false);
const selectedItem = reactive({});

const openPopup = (item) => {
    Object.assign(selectedItem, item); // Cập nhật trực tiếp
    showPopup.value = true;
};

const props = defineProps({
    listViPham: Array,
    currentPage: Number,
    pageSize: Number,
});

const saveUpdate = () => {
    if (!validate()) {
        Swal.fire({
            title: 'Có trường không hợp lệ',
            text: 'Hãy kiểm tra lại',
            icon: 'error',
            timer: 1500,
        })

        return
    }

    console.log('Dữ liệu sau chỉnh sửa:', selectedItem);
    // Gửi dữ liệu về server hoặc xử lý cập nhật tại đây
};

const deleteItem = (item) => {
    if (confirm(`Bạn có chắc chắn muốn xóa vi phạm: ${item.tenViPham}?`)) {
        const index = props.listViPham.indexOf(item);
        if (index !== -1) {
            props.listViPham.splice(index, 1);
            console.log('Đã xóa vi phạm:', item);
        }
    }
};

//------------Validate-------------//
const { validateForm } = useValidation()

const error = reactive({
    tenViPham: '',
    soTien: ''
})

const validate = () => {
    const formRule = {
        tenViPham: {
            required: true,
        },
        soTien: {
            required: true,
            number: selectedItem.soTien
        }
    }
    const formData = {
        tenViPham: selectedItem.tenViPham,
        soTien: selectedItem.soTien
    }
    Object.assign(error, validateForm(formRule, formData))
    for (let key in error) {
        if (error[key] !== false) return false
    }
    return true
}
//--------------------------------------------------------------//

</script>

<template>
    <div class="table-responsive">
        <table class="table table-hover table-striped table-bordered text-center text-nowrap">
            <thead class="">
                <!-- Tiêu đề bảng -->
                <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Mã vi phạm</th>
                    <th scope="col">Tên vi phạm</th>
                    <th scope="col">Số tiền</th>
                    <th scope="col">Công cụ</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="listViPham.length === 0" style="text-align: center; font-style: italic">
                    <td colspan="5">Không tìm thấy vi phạm</td>
                </tr>
                <!-- Dữ liệu bảng -->
                <tr class="align-middle" v-for="(item, index) in listViPham" :key="index">
                    <td>{{ (currentPage - 1) * pageSize + index + 1 }}</td>
                    <td>{{ item.maViPham }}</td>
                    <td>{{ item.tenViPham }}</td>
                    <td>{{ item.soTien }}</td>
                    <td>
                        <button class="btn btn-warning me-1" @click="openPopup(item)"><i
                                class="fa-solid fa-pen-to-square"></i></button>
                        <button class="btn btn-danger" @click="deleteItem(item)"><i
                                class="fa-solid fa-trash-can"></i></button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div :class="['popup', { show: showPopup }]" tabindex="-1">
        <div class="popup-content modal-dialog">
            <div class="modal-content p-4">
                <h2 class="modal-title border-bottom mb-4">Sửa vi phạm</h2>
                <div class="modal-body">
                    <div class="container-fluid">
                        <div class="mb-3">
                            <label for="maViPham" class="form-label">Mã vi phạm</label>
                            <input v-model="selectedItem.maViPham" type="text" id="maViPham" class="form-control"
                                readonly />
                        </div>
                        <div class="mb-3">
                            <label for="tenViPham" class="form-label">Tên vi phạm</label>
                            <input v-model="selectedItem.tenViPham" type="text" id="tenViPham" class="form-control"
                                :class="{ 'is-invalid': error.tenViPham }" />
                            <div class="invalid-feedback">
                                Tên vi phạm không được để trống
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="soTien" class="form-label">Số tiền</label>
                            <input v-model="selectedItem.soTien" type="text" id="soTien" class="form-control"
                                :class="{ 'is-invalid': error.soTien }" />
                            <div class="invalid-feedback">
                            Số tiền không hợp lệ
                            </div>
                        </div>
                        <div class="d-flex justify-content-end">
                            <button @click="saveUpdate" class="btn btn-warning">Cập nhật</button>
                        </div>
                    </div>
                </div>
                <div class="modal-footer d-flex justify-content-end align-items-end">
                    <i @click="showPopup = false" class="text-danger fs-3 fa-solid fa-circle-xmark"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.btn {
    padding: 3px 6px;
}

.popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: start;
    z-index: 10;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
}

.popup.show {
    opacity: 1;
    visibility: visible;
}

.popup-content {
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
    transform: translateY(-20px);
    transition: transform 0.3s ease;
    max-width: 500px;
    width: 90%;
    margin-top: 1rem;
}

.popup.show .popup-content {
    transform: translateY(0);
}

.modal-footer {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 1;
}
</style>
