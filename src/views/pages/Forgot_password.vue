<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useValidation } from '@/stores/mixin/validate_form'
import { useAuthStore } from '@/stores/auth'
import { post } from '@/stores/https'
import { useCookie } from '@/stores/mixin/cookie'
import router from '@/router'

const { t, locale } = useI18n()
const { validateForm } = useValidation()
const { getCookie, setCookie } = useCookie()
const authStore = useAuthStore()

const language = ref('vn')

const error = reactive({
    email: '',
})

const email = ref('')
const otp = ref('')
const newPass = ref('')
const showPassword = ref(false);
const otpTrue = ref(false)

const countdown = ref(0)
let countdownTimer = null

const selectLanguage_Change = () => {
    locale.value = language.value
    setCookie('HRMWebSuitLanguage', language.value, 30)
}

const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
};

const btnValidateOTP_Click = async () => {
    try {
        const otpValidate = reactive({
            email: email.value,
            otp: otp.value
        })

        const response = await post('/api/v1/otp/validate', otpValidate)

        if (response.success) {
            return otpTrue.value = true
        } else {
            await Swal.fire({
                title: 'Mã OTP không hợp lệ',
                text: 'Sai OTP',
                icon: 'error',
                timer: 1500,
            })
            return otpTrue.value = false
        }
    } catch (error) {
        await Swal.fire({
            title: 'Lỗi hệ thống',
            text: 'Error',
            icon: 'error',
            timer: 1500,
        })
        console.log("Lỗi", error)
        return otpTrue.value = false
    }
}

const validate = () => {
    const formRule = {
        email: {
            required: true,
            email: true,
        },
    }
    const formData = {
        email: email.value,
    }
    Object.assign(error, validateForm(formRule, formData))
    for (let key in error) {
        if (error[key] !== false) return false
    }
    return true
}

const errorPass = reactive({
    newPass: ''
})

const validatePass = () => {
    const formRule = {
        newPass: {
            required: true,
        }
    }
    const formData = {
        newPass: newPass.value
    }
    Object.assign(errorPass, validateForm(formRule, formData))
    for (let key in errorPass) {
        if (errorPass[key] !== false) return false
    }
    return true
}

const sendCode = async () => {
    if (!validate()) return

    countdown.value = 60
    countdownTimer = setInterval(() => {
        countdown.value--
        if (countdown.value <= 0) {
            clearInterval(countdownTimer)
        }
    }, 1000)

    try {
        const sendEmail = reactive({
            email: email.value
        })

        const response = await post('/api/v1/auth/forgot-password', sendEmail)

        if (response.success) {
            await Swal.fire({
                title: 'Mã đã được gửi',
                text: 'Đã gửi mã',
                icon: 'success',
                timer: 1500,
            })
        } else {
            await Swal.fire({
                title: 'Gửi mã thất bại',
                text: 'Email không tồn tại',
                icon: 'error',
                timer: 1500,
            })
        }
    } catch (error) {
        await Swal.fire({
            title: 'Gửi mã thất bại',
            text: 'Lỗi hệ thống',
            icon: 'error',
            timer: 1500,
        })
        console.log("Lỗi", error)
    }
}

const resetPassword = async () => {
    if (!validatePass()) return
    try {
        const reset = reactive({
            email: email.value,
            newPassword: newPass.value
        })
        const response = await post('/api/v1/auth/reset-password', reset)

        if (response.success) {
            await Swal.fire({
                title: 'Thay đổi mât khẩu thành công',
                text: 'Đã thay đổi',
                icon: 'success',
                timer: 1500,
            })

            return router.push('/pages/login')
        } else {
            await Swal.fire({
                title: 'Thay đổi mât khẩu thất bại',
                text: 'Không thay đổi',
                icon: 'error',
                timer: 1500,
            })
        }
    } catch (error) {
        await Swal.fire({
            title: 'Thay đổi mât khẩu thất bại',
            text: 'Lỗi hệ thống',
            icon: 'error',
            timer: 1500,
        })
    }
}

onMounted(() => {
    const lang = getCookie('HRMWebSuitLanguage')
    language.value = lang || 'vn'
    locale.value = lang || 'vn'
})
</script>

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
        <div class="row h-100 m-0 d-flex justify-content-center align-items-center">
            <div class="col-lg-6 col-md-5 col-sm-7 pe-0 w-25">
                <div class="p-4 shadow-lg row d-flex justify-content-center align-items-center">
                    <div class="col" v-if="otpTrue">
                        <div class="w-100 d-flex justify-content-center">
                            <img src="@/assets/images/logo.png" class="w-25" alt="Logo" />
                        </div>
                        <h2 class="text-center mb-4 fw-bold">Quên mật khẩu</h2>
                        <div class="row">
                            <div class="mb-3">
                                <label for="email" class="form-label fw-bold">Email</label>
                                <div
                                    class="col-sm-12 gap-2 d-flex flex-row m-0 justify-content-center align-items-center">
                                    <div class="col-sm-9">
                                        <input type="text" class="form-control" :class="{ 'is-invalid': error.email }"
                                            id="email" v-model="email" placeholder="Vui lòng nhập email" />
                                        <div class="invalid-feedback">
                                            Email không hợp lệ
                                        </div>
                                    </div>
                                    <div class="col-sm-3">
                                        <a v-if="!countdown" href="javascript:void(0)" class="text-decoration-none"
                                            @click="sendCode">
                                            Gửi mã
                                        </a>
                                        <span class="text-primary" v-else>{{ countdown + 's' }}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="otp" class="form-label fw-bold">Mã khôi phục</label>
                                <input type="text" class="form-control w-50" id="otp" v-model="otp" />
                            </div>
                            <div class="d-flex justify-content-center align-items-center">
                                <button class="btn btn-primary w-50" @click="btnValidateOTP_Click">Xác nhận</button>
                            </div>
                        </div>
                    </div>
                    <div class="col" v-if="!otpTrue">
                        <div class="w-100 d-flex justify-content-center">
                            <img src="@/assets/images/logo.png" class="w-25" alt="Logo" />
                        </div>
                        <h2 class="text-center mb-4 fw-bold">Đổi mật khẩu mới</h2>
                        <div class="row">
                            <div class="mb-3">
                                <label for="newPass" class="form-label fw-bold">Mật khẩu mới:</label>
                                <div class="input-group">
                                    <input :type="showPassword ? 'text' : 'password'" class="form-control rounded-2"
                                        :class="{ 'is-invalid': errorPass.newPass }" id="newPass" v-model="newPass"
                                        placeholder="Vui lòng nhập mật khẩu mới" />
                                    <button type="button" class="btn btn-outline-secondary eye_icon"
                                        @click="togglePasswordVisibility">
                                        <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                                    </button>
                                    <div class="invalid-feedback">Mật khẩu không được để trống</div>
                                </div>
                            </div>
                            <div class="d-flex justify-content-center align-items-center">
                                <button class="btn btn-primary w-50" @click="resetPassword">Đổi mật khẩu</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.eye_icon {
    position: absolute;
    right: 10px; 
    top: 50%; 
    transform: translateY(-50%); 
    background: none; 
    border: none; 
    cursor: pointer;
}
.eye_icon:hover {
    color: black;
    background: none;
}
</style>
