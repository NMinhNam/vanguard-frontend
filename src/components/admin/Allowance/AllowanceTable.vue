<script setup>
import { reactive, ref } from 'vue';
import { useValidation } from '@/stores/mixin/validate_form'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const showPopup = ref(false);
const selectedItem = reactive({});

const openPopup = (item) => {
    Object.assign(selectedItem, item);
    showPopup.value = true;
};

const props = defineProps({
    listPhuCap: Array,
    currentPage: Number,
    pageSize: Number,
});

const saveUpdate = () => {
    if (!validate()) {
        Swal.fire({
            title: t('configuration.allowance.validate.error.title'),
            text: t('configuration.allowance.validate.error.text'),
            icon: 'error',
            timer: 1500,
        })

        return
    }

    console.log('Dữ liệu sau chỉnh sửa:', selectedItem);
    // Gửi dữ liệu về server hoặc xử lý cập nhật tại đây
};

const deleteItem = (item) => {
    if (confirm(`Bạn có chắc chắn muốn xóa vi phạm: ${item.tenPhuCap}?`)) {
        const index = props.listPhuCap.indexOf(item);
        if (index !== -1) {
            props.listPhuCap.splice(index, 1);
            console.log('Đã xóa vi phạm:', item);
        }
    }
};

//------------Validate-------------//
const { validateForm } = useValidation()

const error = reactive({
    tenPhuCap: '',
    soTien: ''
})

const validate = () => {
    const formRule = {
        tenPhuCap: {
            required: true,
        },
        soTien: {
            required: true,
            number: selectedItem.soTien
        }
    }
    const formData = {
        tenPhuCap: selectedItem.tenPhuCap,
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
                    <th scope="col">{{ $t('configuration.allowance.table.no') }}</th>
                    <th scope="col">{{ $t('configuration.allowance.table.allowance_id') }}</th>
                    <th scope="col">{{ $t('configuration.allowance.table.allowance_name') }}</th>
                    <th scope="col">{{ $t('configuration.allowance.table.amount') }}</th>
                    <th scope="col">{{ $t('configuration.allowance.table.tools') }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="listPhuCap.length === 0" style="text-align: center; font-style: italic">
                    <td colspan="5">{{ $t('configuration.allowance.search') }}</td>
                </tr>
                <!-- Dữ liệu bảng -->
                <tr class="align-middle" v-for="(item, index) in listPhuCap" :key="index">
                    <td>{{ (currentPage - 1) * pageSize + index + 1 }}</td>
                    <td>{{ item.maPhuCap }}</td>
                    <td>{{ item.tenPhuCap }}</td>
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
                <h2 class="modal-title border-bottom mb-4">{{ $t('configuration.allowance.title_update') }}</h2>
                <div class="modal-body">
                    <div class="container-fluid">
                        <div class="mb-3">
                            <label for="maPhuCap" class="form-label">
                                {{ $t('configuration.allowance.table.allowance_id') }}
                            </label>
                            <input v-model="selectedItem.maPhuCap" type="text" id="maPhuCap" class="form-control"
                                readonly />
                        </div>
                        <div class="mb-3">
                            <label for="tenPhuCap" class="form-label">
                                {{ $t('configuration.allowance.table.allowance_name') }}
                            </label>
                            <input v-model="selectedItem.tenPhuCap" type="text" id="tenPhuCap" class="form-control"
                                :class="{ 'is-invalid': error.tenPhuCap }" />
                            <div class="invalid-feedback">
                                {{ $t('configuration.allowance.validate.name') }}
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="soTien" class="form-label">
                                {{ $t('configuration.allowance.table.amount') }}
                            </label>
                            <input v-model="selectedItem.soTien" type="text" id="soTien"
                                class="form-control" :class="{ 'is-invalid': error.soTien }" />
                            <div class="invalid-feedback">
                                {{ $t('configuration.allowance.validate.amount') }}
                            </div>
                        </div>

                        <div class="d-flex justify-content-end">
                            <button @click="saveUpdate" class="btn btn-warning">
                                {{ $t('configuration.allowance.update') }}
                            </button>
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
