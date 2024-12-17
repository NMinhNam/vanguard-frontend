<template>
    <div>
        <Aside />
        <article>
            <!--  Start Header  -->
            <Header />
            <!--  End Header  -->
            <!--  Start Main  -->
            <main>
                <router-view></router-view>
            </main>
            <!--  End Main  -->
        </article>
        <!--  End Home  -->
    </div>
</template>
<script setup>
import Header from '@/components/main/Header.vue';
import Aside from '@/components/main/Aside.vue';
</script>
<style scoped>

</style>
