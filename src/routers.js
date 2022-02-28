import PortalHome from './components/PortalHome.vue'
import PortalCheckout from './components/PortalCheckout.vue'
import PortalCheckouts from './components/PortalCheckouts.vue'
import PortalRefund from './components/PortalRefund.vue'
import UserRegister from "./components/UserRegister.vue";
import UserLogin from "./components/UserLogin.vue";
import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        name:'UserLogin',
        component:UserLogin,
        path:'/',
        meta: {
            hideNavbar: true,
        }
    },
    {
        name:'UserRegister',
        component:UserRegister,
        path:'/register',
        meta: {
            hideNavbar: true,
        }
    },
    {
        name:'PortalHome',
        component:PortalHome,
        path:'/home',
    },
    {
        name:'PortalCheckouts',
        component:PortalCheckouts,
        path:'/checkouts',
    },
    {
        name:'PortalCheckout',
        component:PortalCheckout,
        path:'/checkout',
    },
    {
        name:'PortalRefund',
        component:PortalRefund,
        path:'/payment/:id/refund',
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
