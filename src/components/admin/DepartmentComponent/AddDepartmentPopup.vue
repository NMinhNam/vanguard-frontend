<template>
    <div class="container-fluid">
        <div class="d-flex align-items-center mb-2">
            <label for="tenPhongBan" class="form-label me-2 text-nowrap" style="width: 12rem">
                {{ t('department.add.name') }}
            </label>
            <input
                v-model="phongBanInfo.tenPhongBan"
                type="text"
                class="form-control"
                id="tenPhongBan"
                placeholder="Tên phòng ban"
            />
        </div>

        <div class="row mb-3">
            <div class="d-flex align-items-center">
                <label for="superiorDepartmentSelect" class="form-label me-2 text-nowrap" style="width: 9rem">
                    {{ t('department.add.superior_department') }}
                </label>
                <div class="w-100">
                    <select v-model="phongBanInfo.maPhongBanCapTren" id="superiorDepartmentSelect" class="slim-select">
                        <option
                            v-for="department in superiorDepartments"
                            :key="department.maPhongBan"
                            :value="department.maPhongBan"
                        >
                            {{ department.tenPhongBan }}
                        </option>
                    </select>
                </div>
            </div>
        </div>

        <div class="row mb-3">
            <div class="d-flex align-items-center">
                <label for="truongPhongSelect" class="form-label me-2 text-nowrap" style="width: 9rem">
                    {{ t('department.add.head') }}
                </label>
                <div class="w-100">
                    <select v-model="phongBanInfo.truongPhong" id="truongPhongSelect" class="slim-select">
                        <option
                            v-for="leadStaff in listLeadStaff"
                            :key="leadStaff.maNhanVien"
                            :value="leadStaff.maNhanVien"
                        >
                            {{ leadStaff.hoTen }}
                        </option>
                    </select>
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-end">
            <button @click="saveDepartment()" class="btn btn-success">{{ t('department.save_btn') }}</button>
        </div>
    </div>
</template>
    
  <script setup>
import { onMounted, reactive, ref } from 'vue'
import { get, post } from '@/stores/https'
import SlimSelect from 'slim-select'
import { useI18n } from 'vue-i18n'

const props = defineProps({
    showPopup: Boolean,
    getDepartment: Function,
})

const { t, locale } = useI18n()

const listLeadStaff = ref([])
const slimSelectInstance = ref('')
const superiorDepartments = ref([])

const phongBanInfo = reactive({
    tenPhongBan: '',
    truongPhong: '',
    maPhongBanCapTren: '',
})

onMounted(async () => {
    await getListLeadStaff()
    await getSuperiorDepartments()
    createSlimSelect()
})

const saveDepartment = async () => {
    try {
        const response = await post('/api/v1/departments', phongBanInfo)
        if (response) {
            Swal.fire({
                title: t('department.swal.save.success.title'),
                text: t('department.swal.save.success.text'),
                icon: 'success',
                timer: 1500,
            })
        }
    } catch (error) {
        Swal.fire({
            title: t('department.swal.save.fail.title'),
            text: t('department.swal.save.fail.text'),
            icon: 'error',
            timer: 1500,
        })
        console.error(error)
    }
    loadData()
}

const emit = defineEmits(['closePopup'])
const loadData = () => {
    props.getDepartment()
    emit('closePopup')
}

const createSlimSelect = () => {
    slimSelectInstance.value = new SlimSelect({
        select: '#truongPhongSelect',
        closeOnSelect: false,
    })

    slimSelectInstance.value = new SlimSelect({
        select: '#superiorDepartmentSelect',
        closeOnSelect: false,
    })
}

const getSuperiorDepartments = async () => {
    try {
        const response = await get('/api/v1/departments')
        if (response) {
            superiorDepartments.value = response.data
        }
    } catch (error) {
        console.error(error)
    }
}

const getListLeadStaff = async () => {
    const response = await get('/api/v1/employees')
    listLeadStaff.value = response.data
}
</script>
    
<style>
@import url('https://cdn.jsdelivr.net/npm/slim-select@latest/dist/slimselect.min.css');
</style>