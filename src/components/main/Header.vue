<template>
    <header>
        <div class="row w-100 h-100 d-flex align-items-center justify-content-end">
            <div class="col-auto p-0 ms-3">
                <div class="border border-dark rounded-circle">
                    <i class="fa-solid fa-user p-2 fs-5 rounded-circle"></i>
                </div>
            </div>
            <div class="col-auto p-0 ms-3">
                <div class="border border-dark rounded-circle position-relative">
                    <i class="fa-solid fa-bell p-2 fs-5 rounded-circle"></i>
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        99+
                    </span>
                </div>
            </div>
            <div class="col-auto p-0 ms-3">
                <div class="border border-dark rounded-circle">
                    <i
                        class="fa-solid fa-gear p-2 fs-5 rounded-circle"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                    ></i>
                </div>
            </div>
        </div>
    </header>
    <!-- MODAL -->
    <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <Setting />
            </div>
        </div>
    </div>
</template>
<script setup>
import Setting from './Setting.vue'
</script>
<style scoped>
article {
    position: relative;
    height: 100vh;
    background-color: white;
    left: 260px;
    width: calc(100% - 260px);
    transition: var(--tran-05);
}

aside.close ~ article {
    left: 90px;
    width: calc(100% - 90px);
}

article > header {
    padding: 0.88rem 1rem;
    width: 100%;
    background-color: var(--color-header);
    height: calc(60px + 0.88rem * 2);
    border: 1px solid var(--color-border);
}

article .fa-solid {
    cursor: pointer;
}

article .fa-solid:hover {
    background-color: var(--color-component);
}

article main {
    padding: 0.88rem 1rem;
    width: 100%;
    position: relative;
    height: calc(100% - 60px - 0.88rem * 2);
    background-color: var(--color-main);
    transition: var(--tran-05);
    border: 1px solid var(--color-border);
}
</style>
