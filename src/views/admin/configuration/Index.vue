<template>
    <div>
        <Aside @toggle-sidebar="handleToggleSidebar" />
        <article>
            <!--  Start Header  -->
            <Header />
            <!--  End Header  -->
            <!--  Start Main  -->
            <main :class="{ close: !isShow }">
                <div class="container">
                    <ul class="p-2 nav nav-tabs border-0">
                        <li class="nav-item">
                            <a class="nav-link active" data-bs-toggle="tab" href="#loaiCongTab">{{
                                $t('configuration.tabs.work_type')
                            }}</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-bs-toggle="tab" href="#ngayLeTab">{{
                                $t('configuration.tabs.holiday')
                            }}</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-bs-toggle="tab" href="#phuCapTab">{{
                                $t('configuration.tabs.allowance')
                            }}</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-bs-toggle="tab" href="#viPhamTab">{{
                                $t('configuration.tabs.violation')
                            }}</a>
                        </li>
                    </ul>

                    <div class="tab-content px-2">
                        <div class="tab-pane container active p-0" id="loaiCongTab">
                            <WorkType />
                        </div>
                        <div class="tab-pane container p-0" id="ngayLeTab">
                            <Holiday />
                        </div>
                        <div class="tab-pane container p-0" id="phuCapTab">
                            <Allowance />
                        </div>
                        <div class="tab-pane container p-0" id="viPhamTab">
                            <Violation />
                        </div>
                    </div>
                </div>
            </main>
            <!--  End Main  -->
        </article>
        <!--  End Home  -->
    </div>
</template>

<script setup>
import Header from '@/components/main/Header.vue'
import Aside from '@/components/main/Aside.vue'
import Holiday from '@/components/admin/Holiday/Holiday.vue'
import Allowance from '@/components/admin/Allowance/Allowance.vue'
import Violation from '@/components/admin/Violation/Violation.vue'
import WorkType from '@/components/admin/WorkType/WorkType.vue'
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
