<template>
    <div class="container">
        <div class="row d-flex justify-content-center mt-3">
            <div class="col-12">
                <SalaryOfEmployeeInYear />
            </div>
        </div>
        <div class="row d-flex justify-content-center mt-3">
            <div class="col-6">
                <BirthDay />
            </div>
            <div class="col-6">
                <NewStaff />
            </div>
        </div>
    </div>
</template>

<script setup>
import BirthDay from '@/components/dashboard/BirthDay.vue'
import NewStaff from '@/components/dashboard/NewStaff.vue'
import SalaryOfEmployeeInYear from '@/components/dashboard/SalaryOfEmployeeInYear.vue'
</script>
