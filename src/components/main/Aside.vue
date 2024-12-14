<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

const emit = defineEmits(['toggle-sidebar'])
const isShow = ref(true)
const btnControlSidebar_Click = () => {
    isShow.value = !isShow.value
    emit('toggle-sidebar', isShow.value)
}
emit('toggle-sidebar', isShow.value)

const authStore = useAuthStore()

const currentFeature = ref([])
const featureAdmin = [
    {
        path: '/admin/calendar',
        icon: 'fa-calendar-days',
        text: 'home.menu_item_admin.calendar',
    },
    {
        path: '/admin/staff',
        icon: 'fa-user',
        text: 'home.menu_item_admin.staff',
    },
    {
        path: '/admin/departments',
        icon: 'fa-building',
        text: 'home.menu_item_admin.departments',
    },
    {
        path: '/admin/approve',
        icon: 'fa-person-circle-check',
        text: 'home.menu_item_admin.approve',
    },
    {
        path: '/admin/payroll',
        icon: 'fa-dollar-sign',
        text: 'home.menu_item_admin.payroll',
    },
    {
        path: '/admin/chart',
        icon: 'fa-sitemap',
        text: 'home.menu_item_admin.chart',
    },
    {
        path: '/admin/recruitment',
        icon: 'fa fa-users',
        text: 'home.menu_item_admin.recruitment',
    },
    {
        path: '/admin/contract',
        icon: 'fa fa-file-contract',
        text: 'home.menu_item_admin.contract',
    },{
        path: '/admin/meeting',
        icon: 'fa fa-file-contract',
        text: 'home.menu_item_admin.meeting',
    }
]
const featureManager = [
    {
        path: '/manager/staff',
        icon: 'fa-user',
        text: 'Thông tin cá nhân',
    },
]
const featureUser = [
    {
        path: '/user/information',
        icon: 'fa-user',
        text: 'home.menu_item_user.information',
    },
    {
        path: '/user/checkin',
        icon: 'fa-right-to-bracket',
        text: 'home.menu_item_user.checkin',
    },
    {
        path: '/user/timeoff',
        icon: 'fa-tasks',
        text: 'home.menu_item_user.timeoff',
    },
    {
        path: '/user/rewardanddiscipline',
        icon: 'fa-bookmark',
        text: 'home.menu_item_user.rewar_discipline',
    },
    {
        path: '/user/payroll',
        icon: 'fa-dollar-sign',
        text: 'home.menu_item_user.payroll',
    },
]
onMounted(() => {
    if (sessionStorage.getItem('role') === 'ADMIN') {
        currentFeature.value = featureAdmin
    } else if (sessionStorage.getItem('role') === 'MANAGER') {
        currentFeature.value = featureManager
    } else {
        currentFeature.value = featureUser
    }
})
</script>
<template>
    <aside class="position-fixed top-0 start-0 border-0" :class="{ close: !isShow }">
        <header class="position-relative">
            <div class="image-text d-flex align-items-center">
                <span class="image d-flex align-items-center">
                    <img class="bg-white rounded-circle" src="@/assets/images/logo.png" alt="VanguardHRM" />
                </span>
                <div class="text header-text d-flex flex-column">
                    <span class="name text-white">VANGUARD</span>
                    <span class="slogan text-white">HRM - Final project</span>
                </div>
            </div>
            <i
                class="fa-solid fa-arrow-left toggle"
                :class="{ 'fa-rotate-180': !isShow }"
                @click="btnControlSidebar_Click"
            ></i>
        </header>
        <main>
            <div class="menu">
                <ul class="menu-links p-0 m-0">
                    <li class="nav-link-sidebar" v-for="item in currentFeature" :key="item.path">
                        <router-link :to="{ path: item.path }">
                            <i class="fa-solid" :class="item.icon"></i>
                            <span class="text nav-text">{{ $t(item.text) }}</span>
                        </router-link>
                    </li>
                </ul>
            </div>
            <div class="bottom">
                <ul class="p-0 m-0">
                    <li class="nav-link-sidebar">
                        <router-link :to="{ path: '/' }">
                            <i class="fa-solid fa-right-from-bracket"></i>
                            <span class="text nav-text" @click="authStore.clearToken">{{
                                $t('home.buttons.logout')
                            }}</span>
                        </router-link>
                    </li>
                </ul>
            </div>
        </main>
    </aside>
</template>
<style scoped>
aside {
    height: 100%;
    width: 16%;
    padding: 0.88rem 0.88rem;
    background-color: var(--color-sidebar);
    transition: var(--tran-05);
    z-index: 100;
}

aside .text {
    transition: var(--tran-04);
    white-space: nowrap;
    opacity: 1;
}

aside.close {
    width: 6%;
}

aside.close .text {
    opacity: 0;
    display: none;
}

aside.close .toggle {
    transform: translateY(-50%) rotate(180deg);
}

aside header .image-text img {
    width: 60px;
    height: 60px;
}

aside header .image {
    min-width: 70px;
}

aside header .image-text .header-text .name {
    font-weight: 800;
    font-size: 1.25rem;
}

aside header .image-text .header-text .slogan {
    font-size: 0.85rem;
}

aside header .toggle {
    position: absolute;
    top: 50%;
    right: -32px;
    transform: translateY(-50%);
    height: 30px;
    width: 30px;
    background-color: var(--color-background);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    color: black;
    font-size: 1.15rem;
    cursor: pointer;
    transition: var(--tran-03);
    border: 2px solid var(--color-border);
}

aside main {
    margin-top: 10px;
    height: calc(100% - 65px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

aside main ul li {
    height: 50px;
    margin-top: 10px;
    list-style: none;
    display: flex;
    align-items: center;
}

aside main li .fa-solid {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    min-width: 60px;
}

aside main li .fa-solid,
aside main li .text {
    transition: var(--tran-02);
    color: #bbbdc0;
}

aside main li a {
    text-decoration: none;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    transition: all var(--tran-02);
    border-radius: 0.8rem;
}

aside main li a:hover {
    background-color: #ffd831;
}

aside main li a:hover .fa-solid,
aside main li a:hover .text {
    color: #1c212d !important;
    font-weight: 600;
}

aside main .menu ul li .router-link-active {
    background-color: #ffd831 !important;
    color: #1c212d !important;
    font-weight: 600;
}

aside main .menu ul li .router-link-active .fa-solid,
aside main .menu ul li .router-link-active .text {
    color: #1c212d !important;
}

aside main .menu ul li .router-link-active:before {
    content: '';
    height: 100%;
    width: 0.5rem;
    border-radius: 5px;
    transition: var(--tran-02);
}

aside.close main .menu ul li .router-link-active {
    background-color: var(--color-background);
}

aside.close main .menu ul li .router-link-active::before {
    width: 0rem;
}

@media screen and (max-width: 768px) {
    .nav-text {
        display: none;
    }
    aside {
        width: 85px;
    }
}
</style>
