<template>
    <div>
        <Aside @toggle-sidebar="handleToggleSidebar" />
        <article>
            <!--  Start Header  -->
            <Header />
            <!--  End Header  -->
            <!--  Start Main  -->
            <main :class="{ close: !isShow }">
                <div class="row m-0 g-1">
                    <div class="col-sm-3">
                        <BirthDay />
                    </div>
                    <div class="col-sm-3">
                        <NewStaff />
                    </div>
                    <div class="col-sm-6">
                        <ChartGender />
                    </div>
                </div>
                <ChartHopDong />
                
                <ChartDonYeuCau />
                <ChartDonYeuCauThang />
            </main>
            <!--  End Main  -->
        </article>
        <!--  End Home  -->
    </div>
</template>

<script setup>
import Header from '@/components/main/Header.vue'
import Aside from '@/components/main/Aside.vue'
import PersonnelDynamicsDashboard from '@/components/dashboard/PersonnelDynamicsDashboard.vue';
import EmployeeDashboard from '@/components/dashboard/EmployeeDashboard.vue';
import ChartGender from '@/components/dashboard/ChartGender.vue';
import ChartHopDong from '@/components/dashboard/ChartHopDong.vue';
import ChartDonYeuCau from '@/components/dashboard/ChartDonYeuCau.vue';
import ChartDonYeuCauThang from '@/components/dashboard/ChartDonYeuCauThang.vue';
import BirthDay from '@/components/dashboard/BirthDay.vue';
import NewStaff from '@/components/dashboard/NewStaff.vue';
import { ref } from 'vue'

const isShow = ref(true)

const handleToggleSidebar = (show) => {
    isShow.value = show
}
</script>

<style scoped>
main {
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 18.5%;
    width: 80%;
    display: inline-block;
    transition: var(--tran-04);
}

main.close {
    margin-left: 6.5%;
    width: 92%;
    display: inline-block;
    transition: var(--tran-05);
}
</style>