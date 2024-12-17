<template>
    <div>
        <Aside @toggle-sidebar="handleToggleSidebar" />
        <article>
            <!--  Start Header  -->
            <Header />
            <!--  End Header  -->
            <!--  Start Main  -->
            <main :class="{ close: !isShow }">
                <ContractDetail />
            </main>
            <!--  End Main  -->
        </article>
        <!--  End Home  -->
    </div>
</template>

<script setup>
import Header from '@/components/main/Header.vue'
import Aside from '@/components/main/Aside.vue'
import { ref } from 'vue'
import ContractDetail from '@/components/admin/ContractDetailComponent/ContractDetail.vue';

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