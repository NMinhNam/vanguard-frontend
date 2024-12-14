<template>
    <div class="container-fluid h-100">
        <div class="position-fixed top-0 end-0 p-4">
            <div class="row g-3 align-items-center">
                <div class="col-auto">
                    <label for="language" class="col-form-label">{{ $t('common.select_lang') }}</label>
                </div>
                <div class="col-auto">
                    <select class="form-select" id="language" v-model="language" @change="selectLanguage_Change">
                        <option value="vn" selected>Tiếng Việt</option>
                        <option value="en">English</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="row h-100 d-flex justify-content-center align-items-center">
            <div class="col-lg-6 col-md-5 col-sm-7 pe-0">
                <div class="p-4 shadow-lg row d-flex justify-content-center align-items-center">
                    <div class="col">
                        <div class="w-100 d-flex justify-content-center">
                            <img src="@/assets/images/logo.png" class="w-25" alt="Logo" />
                        </div>
                        <h2 class="text-center mb-4 fw-bold">{{ $t('login.title') }}</h2>
                        <div class="row g-3">
                            <div class="mb-3">
                                <label for="username" class="form-label fw-bold">{{
                                    $t('login.input_text.username')
                                }}</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    :class="{ 'is-invalid': error.username }"
                                    id="username"
                                    v-model="username"
                                    :placeholder="$t('login.input_text.username_placeholder')"
                                />
                                <div class="invalid-feedback">
                                    {{ $t('login.messages.validate.username_required') }}
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label fw-bold">{{
                                    $t('login.input_text.password')
                                }}</label>
                                <div class="input-group">
                                    <input
                                        :type="showPassword ? 'text' : 'password'"
                                        class="form-control"
                                        :class="{ 'is-invalid': error.password }"
                                        id="password"
                                        v-model="password"
                                        :placeholder="$t('login.input_text.password_placeholder')"
                                        @keypress.enter="btnLogin_Click"
                                    />
                                    <button type="button" class="btn btn-outline-secondary eye_icon"
                                        @click="togglePasswordVisibility">
                                        <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                                    </button>
                                </div>
                                
                                <div class="invalid-feedback">
                                    {{ $t('login.messages.validate.password_required') }}
                                </div>
                            </div>
                            <div class="row d-flex justify-content-center align-items-center">
                                <button type="button" class="btn btn-primary w-50" @click="btnLogin_Click">
                                    {{ $t('login.buttons.login') }}
                                </button>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <router-link to="/pages/forgot_password" class="text-center text-decoration-none">
                                {{ $t('login.buttons.forgot_password') }}
                            </router-link>
                        </div>
                    </div>
                    <div class="col-sm-0 col-md-6">
                        <img src="@/assets/images/banner.png" class="w-100" alt="Banner" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useValidation } from '@/stores/mixin/validate_form'
import { useAuthStore } from '@/stores/auth'
import router from '@/router'
import { post } from '@/stores/https'
import { useCookie } from '@/stores/mixin/cookie'

const { t, locale } = useI18n()
const { validateForm } = useValidation()
const { getCookie, setCookie } = useCookie()
const authStore = useAuthStore()

const username = ref('')
const password = ref('')
const language = ref('vn')
const showPassword = ref(false)

const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value
}

const error = reactive({
    username: '',
    password: '',
})

const btnLogin_Click = async () => {
    if (!validate()) {
        await Swal.fire({
            title: t('login.messages.login_fail.title'),
            text: t('login.messages.login_fail.text'),
            icon: 'error',
            timer: 1500,
        })
        return
    }
    try {
        const loginInfo = {
            username: username.value,
            password: password.value,
        }
        const response = await post('/api/v1/auth/login', loginInfo)
        if (response.success) {
            sessionStorage.setItem('user', username.value)
            authStore.setToken(response.data.accessToken, response.data.refreshToken)
            authStore.setRole(response.data.role)
            Swal.fire({
                title: t('login.messages.login_success.title'),
                text: t('login.messages.login_success.text'),
                icon: 'success',
                timer: 1500,
            })
            response.data.role === 'ADMIN'
                ? router.push('/admin')
                : response.data.role === 'MANAGER'
                ? router.push('/manager')
                : router.push('/user/information')
        } else {
            Swal.fire({
                title: t('login.messages.login_fail.title'),
                text: t('login.messages.login_fail.text'),
                icon: 'error',
                timer: 1500,
            })
        }
    } catch (error) {
        await Swal.fire({
            title: t('login.messages.login_fail_server.title'),
            text: t('login.messages.login_fail_server.text'),
            icon: 'error',
            timer: 1500,
        })
        console.error('Error during login:', error)
    }
}
const selectLanguage_Change = () => {
    locale.value = language.value
    setCookie('HRMWebSuitLanguage', language.value, 30)
}
const validate = () => {
    const formRule = {
        username: {
            required: true,
        },
        password: {
            required: true,
        },
    }
    const formData = {
        username: username.value,
        password: password.value,
    }
    Object.assign(error, validateForm(formRule, formData))
    for (let key in error) {
        if (error[key] !== false) return false
    }
    return true
}
onMounted(() => {
    const lang = getCookie('HRMWebSuitLanguage')
    language.value = lang || 'vn'
    locale.value = lang || 'vn'
})
</script>
<style scoped>
.eye_icon {
    position: absolute;
    right: 0px; 
    top: 50%; 
    transform: translateY(-50%); 
    background: none; 
    border: none; 
    cursor: pointer;
}

.eye_icon:hover {
    background: none;
    color: black;
}</style>
