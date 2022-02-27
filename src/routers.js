import PortalHome from './components/PortalHome.vue'
import PortalCheckouts from './components/PortalCheckouts.vue'
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
        path:'/home'
    },
    {
        name:'PortalCheckouts',
        component:PortalCheckouts,
        path:'/checkouts'
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
