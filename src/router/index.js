import {createRouter, createWebHistory} from 'vue-router'
import Login from "@/components/Login.vue";
import Register from "@/components/register.vue";
import Dashboard from "@/components/AccountSettings.vue";
import ConfirmRegisterAccepted from "@/components/confirmRegisterAccepted.vue";
import ResetPasswordEmail from "@/components/resetPasswordEmail.vue";
import ResetPassword from "@/components/resetPassword.vue";
import Start from "@/components/start.vue";
import AdminPanel from "@/components/SetingsPanel.vue";
import allUsers from "@/components/allUsers.vue";
import SideSetingsPanel from "@/components/SetingsPanel.vue";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/test',
            component: SideSetingsPanel
        },
        {
            path: '/',
            component: Start
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
            component: Dashboard
        },
        {
            path: '/register/accepted',
            component: ConfirmRegisterAccepted
        },
        {
            path: '/reset/email',
            component: ResetPasswordEmail
        },
        {
            path: '/reset/password/:token/email/:email',
            component: ResetPassword
        },
        {
            path: '/adminPanel',
            component: AdminPanel
        },
    ]
})

export default router
