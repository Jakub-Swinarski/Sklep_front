import {createRouter, createWebHistory} from 'vue-router'
import Login from "@/components/auth/Login.vue";
import Register from "@/components/auth/register.vue";
import ConfirmRegisterAccepted from "@/components/auth/confirmRegisterAccepted.vue";
import ResetPasswordEmail from "@/components/auth/resetPasswordEmail.vue";
import ResetPassword from "@/components/auth/resetPassword.vue";
import Start from "@/components/start.vue";
import SideSettingsPanel from "@/components/SettingsPanel.vue";
import EditProduct from "@/components/admin/EditProduct.vue";
import AccountSettings from "@/components/user/AccountSettings.vue";
import YourOrders from "@/components/user/YourOrders.vue";
import YourRatings from "@/components/user/YourRatings.vue";
import YourDeliveryData from "@/components/user/YourDeliveryData.vue";
import AllUsers from "@/components/admin/allUsers.vue";
import AllOrders from "@/components/admin/allOrders.vue";
import AllProducts from "@/components/admin/allProducts.vue";
import CreateNewUser from "@/components/admin/CreateNewUser.vue";
import CreateNewAdmin from "@/components/admin/CreateNewAdmin.vue";
import EditOrder from "@/components/admin/EditOrder.vue";
import CreateNewProduct from "@/components/admin/createNewProduct.vue";
import Order from "@/components/Order.vue";
import Product from "@/components/Product.vue";
import Test from "@/test.vue";
import NewDeliveryData from "@/components/user/NewDeliveryData.vue";
import Logout from "@/components/auth/logout.vue";
import Cart from "@/components/Cart.vue";
import NewOrder from "@/components/NewOrder.vue";
import Accept from "@/components/Accept.vue";
import PageCreator from "@/components/admin/PageCreator.vue";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL), routes: [

        {
            path: '/edit/product/:id', component: EditProduct
        }, {
            path: '/settings', component: SideSettingsPanel, children: [{
                path: 'account', component: AccountSettings
            }, {
                path: 'yoursOrders', component: YourOrders
            }, {
                path: 'yoursRatings', component: YourRatings
            }, {
                path: 'dataToOrders', component: YourDeliveryData, children: [{
                    path: 'new', component: NewDeliveryData
                }]
            }, {
                path: 'allUsers', component: AllUsers
            }, {
                path: 'allOrders', component: AllOrders
            }, {
                path: 'allProducts', component: AllProducts
            }, {
                path: 'NewSide', component: PageCreator
            }, {
                path: 'createNewUser', component: CreateNewUser
            }, {
                path: 'createNewAdmin', component: CreateNewAdmin
            }, {
                path: ':id', component: EditOrder
            }, {
                path: 'newProduct', component: CreateNewProduct
            }]
        }, {
            path: '/o/:id', component: Order
        }, {
            path: '/p/:id', component: Product
        }, {
            path: '/', component: Start
        }, {
            path: '/login', component: Login
        }, {
            path:'/logout', component: Logout
        },{
            path:'/cart', component: Cart
        },{
            path:'/order', component: NewOrder
        },{
            path:'/accept', component: Accept
        }, {
            path: '/register', component: Register
        }, {
            path: '/register/accepted', component: ConfirmRegisterAccepted
        }, {
            path: '/reset/email', component: ResetPasswordEmail
        }, {
            path: '/reset/password/:token/email/:email', component: ResetPassword
        }, {
            path: '/test', component: Test
        }]
})

export default router
