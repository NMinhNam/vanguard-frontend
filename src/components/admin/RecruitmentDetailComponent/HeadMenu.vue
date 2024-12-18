<template>
    <div class="p-4 border-0 border-bottom border-secondary-subtle">
        <div class="head-menu col-12">
            <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center">
                    <h5 class="mb-0">Recruitment</h5>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    loading: Boolean,
    recruitment: Object,
})
</script>

<style scoped>
.spinner-border {
    width: 1.2rem;
    height: 1.2rem;
}
</style>
