<template>
    <div class="p-4">
        <div class="row row-cols-1 row-cols-md-3 g-4">
            <div class="col" v-for="Position in listPositon" :key="Position.maChucVu">
                <div class="card h-100">
                    <div class="card-body d-flex p-0">
                        <div class="px-3 py-2 flex-grow-1 p-3">
                            <div class="d-flex justify-content-between align-items-start mb-3">
                                <h5 class="card-title">{{ Position.maChucVu }}</h5>
                                <span class="status-indicator">:</span>
                            </div>
                            <div>
                                <h4>{{ Position.tenChucVu }} Chức vụ</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    listPositon: Array,
})
</script>