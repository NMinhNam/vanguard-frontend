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

export const post = (url, data) => {
    return https.post(url, data)
}

export const put = (url, data) => {
    return https.put(url, data)
}

export const del = (url) => {
    return https.delete(url)
}
