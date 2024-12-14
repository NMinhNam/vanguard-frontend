<template>
    <div class="p-4 border-0 border-bottom border-secondary-subtle">
        <div class="head-menu col-12">
            <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center">
                    <button
            @click="saveContract"
            type="button"
            class="btn btn-success"
            :disabled="loading"
        >
            <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            <i v-if="!loading" class="fa-solid fa-save me-2"></i>
            Save
        </button>
                    <h5 class="mb-0">Contract</h5>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
defineProps(['saveContract', 'loading'])
</script>
<style scoped>  
.spinner-border {
    width: 1.2rem;
    height: 1.2rem;
}
</style>
