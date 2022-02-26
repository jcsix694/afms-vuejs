import HomePage from './components/HomePage.vue'
import UserRegister from "./components/UserRegister.vue";
import UserLogin from "./components/UserLogin.vue";
import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        name:'UserLogin',
        component:UserLogin,
        path:'/'
    },
    {
        name:'UserRegister',
        component:UserRegister,
        path:'/register'
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
