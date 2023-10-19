import {createRouter, createWebHistory} from 'vue-router'
import Login from "@/components/Login.vue";
import Register from "@/components/register.vue";
import Dashboard from "@/components/dashboard.vue";
import ConfirmRegisterAccepted from "@/components/confirmRegisterAccepted.vue";
import ResetPasswordEmail from "@/components/resetPasswordEmail.vue";
import ResetPassword from "@/components/resetPassword.vue";
import Start from "@/components/start.vue";
import Rules from "@/components/rules.vue";



const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path:'/test',
            component: Rules
        },
        {
            path: '/',
            component:Start
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/register',
            component: Register
        },
        {
            path: '/dashboard',
            component : Dashboard
        },
        {
            path:'/register/accepted',
            component: ConfirmRegisterAccepted
        },
        {
            path:'/reset/email',
            component: ResetPasswordEmail
        },
        {
            path:'/reset/password/:token/email/:email',
            component: ResetPassword
        }
    ]
})

export default router
