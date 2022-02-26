import HomePage from './components/HomePage.vue'
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
        name:'HomePage',
        component:HomePage,
        path:'/home'
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
