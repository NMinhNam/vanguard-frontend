<template>
    <div class="container text-center mt-5">
        <h1 class="display-1 text-danger">404</h1>
        <p class="lead">Oops! The page you are looking for does not exist.</p>
        <button class="btn btn-primary mt-3" @click="goHome">Go Back to Home</button>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const userRole = sessionStorage.getItem('role')?.toLowerCase()

const goHome = () => {
    router.push(`/${userRole}`)
}
</script>

<style scoped>
.container {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
</style>
