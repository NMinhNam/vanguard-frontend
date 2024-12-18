<template>
    <div class="container-fluid">
        <div class="border-0">
            <div class="head-menu col-12">
                <div class="d-flex align-items-center mb-4">
                    <div class="input-group">
                        <input
                            type="file"
                            ref="fileInput"
                            @change="handleFileUpload"
                            accept=".xlsx, .xls"
                            class="form-control"
                        />
                    </div>
                </div>
                <div class="d-flex justify-content-end">
                    <button class="btn btn-success" @click="saveStaffs">
                        {{ $t('addstaffbyfileexcelcomponent.buttons.save') }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { onMounted, ref } from 'vue'
import { get } from '@/stores/https'
import axios from 'axios'
import * as XLSX from 'xlsx'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const loading = ref(false)
const fileInput = ref(null)
const data = ref([])
const listStaff = ref([])
const MAX_FILE_SIZE = 5 * 1024 * 1024

onMounted(async () => {
    await getAllStaff()
})

const getAllStaff = async () => {
    const response = await get('/api/v1/employees')
    listStaff.value = response.data
}

const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file.size > MAX_FILE_SIZE) {
        Swal.fire({
            title: t('addstaffbyfileexcelcomponent.swal.big_file.title'),
            text: `${t('addstaffbyfileexcelcomponent.swal.big_file.text')} ${MAX_FILE_SIZE / (1024 * 1024)} MB.`,
            icon: 'warning',
            timer: 2000,
        })
        event.target.value = ''
        return
    }

    if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
            const excelData = new Uint8Array(e.target.result)
            const workbook = XLSX.read(excelData, { type: 'array' })
            const worksheet = workbook.Sheets[workbook.SheetNames[0]]
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })
            const headers = jsonData[0]
            const rows = jsonData.slice(1)
            const objects = rows.map((row) => {
                const obj = {}
                headers.forEach((header, index) => {
                    let value = row[index] || null
                    if (header === 'Giới tính') {
                        value = value === 'nam'
                    }
                    obj[header] = value
                })
                return obj
            })
            data.value = objects
        }
        reader.readAsArrayBuffer(file)
    }
}

const saveStaffs = async () => {
    if (await isExist()) {
        resetFileInput()
        return
    }
    if (isExistInExcel()) {
        resetFileInput()
        return
    }

    const file = fileInput.value?.files[0]
    if (file) {
        loading.value = true
        const formData = new FormData()
        formData.append('file', file)
        try {
            const responseData = await axios.post('http://localhost:1688/api/v1/upload-file/employees', formData)
            Swal.fire({
                title: t('addstaffbyfileexcelcomponent.swal.save.success.title'),
                text: t('addstaffbyfileexcelcomponent.swal.save.success.text'),
                icon: 'success',
                timer: 1500,
            })
        } catch (error) {
            console.error(error)
            Swal.fire({
                title: t('addstaffbyfileexcelcomponent.swal.save.fail.title'),
                text: t('addstaffbyfileexcelcomponent.swal.save.fail.text'),
                icon: 'error',
                timer: 1500,
            })
        } finally {
            loading.value = false
            resetFileInput()
        }
    } else {
        Swal.fire({
            title: t('addstaffbyfileexcelcomponent.swal.save.error.title'),
            text: t('addstaffbyfileexcelcomponent.swal.save.error.text'),
            icon: 'error',
            timer: 1500,
        })
    }
}

const isExist = async () => {
    await getAllStaff()
    data.value = data.value.filter((record) => record?.CCCD)
    const staffCCCDSet = new Set(listStaff.value.map((staff) => staff.cccd))
    const duplicateRecords = data.value
        .filter((record) => record?.CCCD) // Lọc bỏ các bản ghi không có CCCD
        .filter((record) => staffCCCDSet.has(String(record.CCCD).trim()))
    if (duplicateRecords.length > 0) {
        Swal.fire({
            title: t('addstaffbyfileexcelcomponent.swal.isExist.title'),
            text: t('addstaffbyfileexcelcomponent.swal.isExist.text'),
            icon: 'warning',
            timer: 2000,
        })
        return true
    }
}

const resetFileInput = () => {
    fileInput.value.value = null
}

const isExistInExcel = () => {
    const seenCCCD = new Set()
    const isDuplicateInExcel = data.value.some((record) => {
        if (seenCCCD.has(record.CCCD)) {
            return true
        }
        seenCCCD.add(record.CCCD)
        return false
    })

    if (isDuplicateInExcel) {
        Swal.fire({
            title: t('addstaffbyfileexcelcomponent.swal.isDuplicateInExcel.title'),
            text: t('addstaffbyfileexcelcomponent.swal.isDuplicateInExcel.text'),
            icon: 'warning',
            timer: 2000,
        })
        return true
    }
}
</script>
