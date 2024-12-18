<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <CardDashboardAdmin />
            </div>
        </div>
        <div class="row d-flex justify-content-center mt-3">
            <div class="col-12">
                <div class="chart-container h-100"><PersonnelDynamicsDashboard /></div>
            </div>
        </div>

        <div class="row d-flex justify-content-center mt-3">
            <div class="col-6">
                <div class="chart-container h-100"><SalaryByDepartmentDashboard /></div>
            </div>
            <div class="col-6">
                <div class="chart-container h-100"><EmployeeByDepartmentDashboard /></div>
            </div>
        </div>

        <div class="row d-flex justify-content-center mt-3">
            <div class="col-6">
                <div class="chart-container h-100"><ChartHopDong /></div>
            </div>
            <div class="col-6">
                <div class="chart-container h-100"><EmployeeSalaryDashboard /></div>
            </div>
        </div>

        <div class="row d-flex justify-content-center mt-3">
            <div class="col-6">
                <div class="chart-container h-100"><ChartGender /></div>
            </div>
            <div class="col-6">
                <div class="chart-container h-100"><EducationLevelEmployeeDashboard /></div>
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
import ChartDonYeuCau from '@/components/dashboard/ChartDonYeuCau.vue'
import ChartDonYeuCauThang from '@/components/dashboard/ChartDonYeuCauThang.vue'
import ChartGender from '@/components/dashboard/ChartGender.vue'
import BirthDay from '@/components/dashboard/BirthDay.vue'
import NewStaff from '@/components/dashboard/NewStaff.vue'
import SalaryByDepartmentDashboard from '@/components/dashboard/SalaryByDepartmentDashboard.vue'
import CardDashboardAdmin from '@/components/dashboard/CardDashboardAdmin.vue'
import EmployeeByDepartmentDashboard from '@/components/dashboard/EmployeeByDepartmentDashboard.vue'
import PersonnelDynamicsDashboard from '@/components/dashboard/PersonnelDynamicsDashboard.vue'
import EmployeeSalaryDashboard from '@/components/dashboard/EmployeeSalaryDashboard.vue'
import EducationLevelEmployeeDashboard from '@/components/dashboard/EducationLevelEmployeeDashboard.vue'
import SalaryOfEmployeeInYear from '@/components/dashboard/SalaryOfEmployeeInYear.vue'
import ChartHopDong from '@/components/dashboard/ChartHopDong.vue'
</script>
