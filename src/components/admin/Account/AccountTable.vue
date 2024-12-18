<script setup>
import { reactive, ref, onMounted, computed } from 'vue';
import { useI18n } from 'vue-i18n'
import { put } from '@/stores/https';
import SlimSelect from 'slim-select'

const { t, locale } = useI18n()

const showPopup = ref(false);
const slimSelectInstance = ref('')
const selectedItem = reactive({});

const openPopup = (item) => {
    selectedItem.userName = item.userName;
    selectedItem.roleName = item.role.roleName;
    selectedItem.roleId = item.role.roleId;

    showPopup.value = true;
};

const filteredAccounts = computed(() => {
    const currentUser = sessionStorage.getItem('user'); 
    return (props.listTaiKhoan || []).filter(
        (item) => item.userName !== currentUser
    );
});

const props = defineProps({
    listTaiKhoan: Array,
    currentPage: Number,
    pageSize: Number,
    listRole: Array,
    getTaiKhoan: Function,
});

const createSlimSelect = () => {
    slimSelectInstance.value = new SlimSelect({
        select: '#roleSelect',
        closeOnSelect: false,
    })
}

const saveUpdate = async () => {
    try {
        const formData = reactive({
            username: selectedItem.userName,
            roleId: selectedItem.roleId
        })
        const response = await put('/api/v1/users/updateRole', formData)
        if (response.success) {
            Swal.fire({
                title: t('account.Swal.role.success.title'),
                text: t('account.Swal.role.success.text'),
                icon: 'success',
                timer: 1500,
            }).then(() => {
                props.getTaiKhoan();
            })
        } else {
            Swal.fire({
                title: t('account.Swal.role.fail.title'),
                text: t('account.Swal.role.fail.text'),
                icon: 'error',
                timer: 1500,
            })
        }
    } catch (error) {
        Swal.fire({
            title: t('account.Swal.error.title'),
            text: t('account.Swal.error.text'),
            icon: 'error',
            timer: 1500,
        })
    }
};


const closePopup = () => {
    showPopup.value = false;
};


const btnChangeStatus_click = async (item) => {
    try {
        const formData = reactive({
            username: item.userName,
            enabled: item.enabled

        })

        const response = await put('/api/v1/users/updateStatus', formData)
        if (response.success) {
            Swal.fire({
                title: t('account.Swal.status.success.title'),
                text: t('account.Swal.status.success.text'),
                icon: 'success',
                timer: 1500,
            })
        } else {
            Swal.fire({
                title: t('account.Swal.status.fail.title'),
                text: t('account.Swal.status.dail.text'),
                icon: 'error',
                timer: 1500,
            })
        }
    } catch (error) {
        Swal.fire({
            title: t('account.Swal.error.title'),
            text: t('account.Swal.error.text'),
            icon: 'error',
            timer: 1500,
        })
    }
}

onMounted(async () => {
    createSlimSelect()
})

</script>

<template>
    <div class="table-responsive">
        <table class="table table-hover table-striped table-bordered text-center text-nowrap">
            <thead class="">
                <!-- Tiêu đề bảng -->
                <tr>
                    <th scope="col">{{ $t('account.table.no') }}</th>
                    <th scope="col">{{ $t('account.table.username') }}</th>
                    <th scope="col">{{ $t('account.table.staffid') }}</th>
                    <th scope="col">{{ $t('account.table.fullname') }}</th>
                    <th scope="col">{{ $t('account.table.phone') }}</th>
                    <th scope="col">{{ $t('account.table.role') }}</th>
                    <th scope="col">{{ $t('account.table.status') }}</th>
                    <th scope="col">{{ $t('account.table.tool') }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="listTaiKhoan.length === 0" style="text-align: center; font-style: italic">
                    <td colspan="9">{{ $t('account.table.search') }}</td>
                </tr>
                <!-- Dữ liệu bảng -->
                <tr class="align-middle" v-for="(item, index) in filteredAccounts" :key="index">
                    <td>{{ (currentPage - 1) * pageSize + index + 1 }}</td>
                    <td>{{ item.userName }}</td>
                    <td>{{ item.maNhanVien }}</td>
                    <td>{{ item.tenNhanVien }}</td>
                    <td>{{ item.dienThoai }}</td>
                    <td>{{ item.role.roleName }}</td>
                    <td>
                        <div class="form-check form-switch d-flex justify-content-center ">
                            <input class="form-check-input" type="checkbox" role="switch" :checked="item.enabled"
                                v-model="item.enabled" @change="btnChangeStatus_click(item)">
                        </div>
                    </td>
                    <td>
                        <button class="btn btn-warning me-1" @click="openPopup(item)">
                            <i class="fa-solid fa-pen-to-square"></i>
                            {{ $t('account.editrole') }}
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div :class="['popup', { show: showPopup }]" tabindex="-1">
        <div class="popup-content modal-dialog">
            <div class="modal-content p-4">
                <h2 class="modal-title border-bottom mb-4">
                    {{ $t('account.title_update') }}
                </h2>
                <div class="modal-body">
                    <div class="container-fluid">
                        <div class="mb-3">
                            <label for="userName" class="form-label">
                                {{ $t('account.table.username') }}
                            </label>
                            <input v-model="selectedItem.userName" type="text" id="userName" class="form-control"
                                readonly />
                        </div>
                        <div class="mb-3">
                            <label for="roleSelect1" class="form-label">
                                {{ $t('account.table.role') }}
                            </label>
                            <div class="w-100">
                                <select v-model="selectedItem.roleId" id="roleSelect1" class="form-select">
                                    <option v-for="role in listRole" :key="role.roleId" :value="role.roleId">
                                        {{ role.roleName }}
                                    </option>
                                </select>
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
                    <i @click="closePopup" class="text-danger fs-3 fa-solid fa-circle-xmark"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import url('https://cdn.jsdelivr.net/npm/slim-select@latest/dist/slimselect.min.css');

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

.form-check-input:checked {
    background-color: #0d6efd !important;
    border-color: #0d6efd !important;
}
</style>
