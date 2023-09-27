import {createRouter, createWebHistory} from 'vue-router'
import Login from "@/components/Login.vue";
import Register from "@/components/register.vue";
import Dashboard from "@/components/dashboard.vue";
import ConfirmRegisterAccepted from "@/components/confirmRegisterAccepted.vue";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
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
        }
    ]
})

export default router
