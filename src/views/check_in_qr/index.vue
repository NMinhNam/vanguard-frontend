<template>
    <div>
        <article>

            <main :class="{ close: !isShow }">
                <CheckInQR />
            </main>
            <!--  End Main  -->
        </article>
        <!--  End Home  -->
    </div>
</template>

<script setup>
import { ref } from 'vue'
import CheckInQR from '@/components/check_in_qr/CheckInQR.vue'

const isShow = ref(true)

const handleToggleSidebar = (show) => {
    isShow.value = show
}
</script>

<style scoped>

</style>
