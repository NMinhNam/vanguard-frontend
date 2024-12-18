<template>
    <div>
        <article>
            <main :class="{ close: !isShow }">
                <CheckOutQR />
            </main>
            <!--  End Main  -->
        </article>
        <!--  End Home  -->
    </div>
</template>

<script setup>
import { ref } from 'vue'
import CheckOutQR from '@/components/check_out_qr/CheckOutQR.vue'

const isShow = ref(true)

const handleToggleSidebar = (show) => {
    isShow.value = show
}
</script>

<style scoped>
</style>
