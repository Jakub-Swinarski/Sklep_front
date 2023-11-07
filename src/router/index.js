import {createRouter, createWebHistory} from 'vue-router'
import Login from "@/components/auth/Login.vue";
import Register from "@/components/auth/register.vue";
import Dashboard from "@/components/user/AccountSettings.vue";
import ConfirmRegisterAccepted from "@/components/auth/confirmRegisterAccepted.vue";
import ResetPasswordEmail from "@/components/auth/resetPasswordEmail.vue";
import ResetPassword from "@/components/auth/resetPassword.vue";
import Start from "@/components/start.vue";
import AdminPanel from "@/components/SettingsPanel.vue";
import SideSettingsPanel from "@/components/SettingsPanel.vue";
import EditProduct from "@/components/admin/EditProduct.vue";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path:'/edit/product/:id',
            component: EditProduct
        },
        {
            path: '/test',
            component: SideSettingsPanel
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
