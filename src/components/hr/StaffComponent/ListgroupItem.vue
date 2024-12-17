<template>
    <div class="vh-100 p2 border-0 border-end border-secondary-subtle rounded-0 mx-0 p-1">
        <div class="list-group">
            <h6 class="mt-3 ms-2 text-uppercase fw-bold">
                <i class="fas fa-users"></i>{{ $t('staffManagement.items.department') }}
            </h6>
            <select
                id="phongBanSelect"
                v-model="departmentSelected"
                multiple
                class="slim-select"
                @change="$emit('filterStaffByDepartment', departmentSelected)"
            >
                <option v-for="department in departments" :key="department.maPhongBan" :value="department.maPhongBan">
                    {{ department.tenPhongBan }}
                </option>
            </select>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import SlimSelect from 'slim-select'
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()
const slimSelectInstance = ref('')
const departmentSelected = ref([])

const props = defineProps({
    departments: Array,
})
onMounted(async () => {
    createSlimSelect()
})

const createSlimSelect = () => {
    slimSelectInstance.value = new SlimSelect({
        select: '#phongBanSelect',
        closeOnSelect: false,
    })
}
</script>

<style scope>
@import url('https://cdn.jsdelivr.net/npm/slim-select@latest/dist/slimselect.min.css');
</style>