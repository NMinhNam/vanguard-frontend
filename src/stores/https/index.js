import axios from 'axios'
import { useAuthStore } from '../auth'
import router from '@/router'

const url = [{ dev: 'http://localhost:1688' }, { prod: 'https://vanguardhrm.io.vn' }, { test: '' }]

const env = [{ 1: 'dev' }, { 2: 'prod' }, { 3: 'test' }]
const environment = 1

const https = axios.create({
    baseURL: 'http://localhost:1688',
    timeout: 20000
})

let isRefreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error)
        } else {
            prom.resolve(token)
        }
    })
    failedQueue = []
}

https.interceptors.request.use(
    (config) => {
        const authStore = useAuthStore()
        const token = authStore.accessToken
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    },
)

https.interceptors.response.use(
    (response) => {
        return response.data
    },
    async (error) => {
        const authStore = useAuthStore()
        const originalRequest = error.config

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                try {
                    const token = await new Promise((resolve, reject) => {
                        // Kiểm tra để tránh lặp lại các yêu cầu trong hàng chờ
                        if (!failedQueue.find((req) => req === originalRequest)) {
                            failedQueue.push({ resolve, reject })
                        }
                    })
                    originalRequest.headers.Authorization = 'Bearer ' + token
                    return await axios(originalRequest)
                } catch (err) {
                    return Promise.reject(err)
                }
            }

            originalRequest._retry = true
            isRefreshing = true

            const refreshToken = authStore.refreshToken
            if (!refreshToken) {
                authStore.clearToken()
                await router.push('/login')
                return Promise.reject(error)
            }

            return new Promise((resolve, reject) => {
                post('/api/v1/auth/refresh', { refreshToken })
                    .then(({ accessToken }) => {
                        authStore.setToken(accessToken, refreshToken)
                        https.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken
                        originalRequest.headers.Authorization = 'Bearer ' + accessToken
                        processQueue(null, accessToken)
                        resolve(axios(originalRequest))
                    })
                    .catch(async (err) => {
                        processQueue(err, null)
                        await authStore.clearToken()
                        await router.push('/login')
                        reject(err)
                    })
                    .finally(() => {
                        isRefreshing = false
                    })
            })
        }

        return Promise.reject(error)
    },
)

export const get = (url, params = {}) => {
    return https.get(url, { params })
}

// export const post = (url, data) => {
//     return https.post(url, data)
// }

export const post = async (url, data) => {
    try {
        const response = await https.post(url, data);
        return response; // Trả về kết quả khi thành công
    } catch (error) {
        // Kiểm tra lỗi phản hồi từ server
        if (error.response) {
            // Bắt status và lỗi từ server trả về
            return Promise.reject({
                status: error.response.status,
                data: error.response.data,
            });
        } else {
            // Lỗi mạng hoặc lỗi khác
            return Promise.reject({
                message: 'Unexpected error occurred',
                error,
            });
        }
    }
};

export const put = (url, data) => {
    return https.put(url, data)
}

export const del = (url) => {
    return https.delete(url)
}

export const getPDF = async (url, params = {}) => {
    try {
        // Gửi yêu cầu API để tải file PDF với phản hồi kiểu blob
        const response = await https.get(url, {
            params,
            responseType: 'blob', // Quan trọng: Đảm bảo phản hồi là kiểu blob để xử lý file
        });

        // Tạo một URL tạm thời cho file PDF
        const pdfBlob = new Blob([response], { type: 'application/pdf' });
        const pdfUrl = window.URL.createObjectURL(pdfBlob);

        // Tạo một liên kết và kích hoạt tải xuống
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.setAttribute('download', 'Thongtinnhanvien.pdf'); // Đặt tên file khi tải về
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // Xóa liên kết sau khi tải xong

        return response;
    } catch (error) {
        console.error('Có lỗi khi tải PDF:', error);
        throw error; // Ném lỗi để có thể xử lý nếu cần
    }
};

