import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import routes from './routes';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
})

const permitURL = ['/', '/pages/login', '/pages/autherror', '/pages/404error', '/recruitment', '/pages/forgot_password']

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()
    const isAuthenticated = !!authStore.accessToken

    // Nếu URL không được phép truy cập và người dùng chưa xác thực -> chuyển về trang đăng nhập
    if (!permitURL.includes(to.path) && !isAuthenticated) {
        return next('/pages/login')
    }

    // Đặt tiêu đề trang
    document.title = to.meta.title || 'HRM'

    // Điều hướng dựa trên vai trò người dùng nếu vai trò tồn tại
    const userRole = sessionStorage.getItem('role')?.toLowerCase()

    // Kiểm tra nếu điểm đến đã nằm trong danh sách đường dẫn được phép
    if (permitURL.includes(to.path)) {
        return next() // Cho phép điều hướng mà không cần kiểm tra tiếp
    }

    // Kiểm tra nếu đường dẫn chứa role không khớp
    if (userRole && !to.path.toLowerCase().startsWith(`/${userRole}`)) {
        return next('/pages/autherror') // Điều hướng đến trang lỗi nếu không phù hợp với vai trò
    }

    // Nếu tất cả điều kiện trên không xảy ra, cho phép điều hướng bình thường
    next()
})

export default router
