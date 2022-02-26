<template>
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>Sign Up</h1>
    <div class="register">
        <input type="text" v-model="email" placeholder="Enter Email" />
        <input type="text" v-model="password" placeholder="Enter Password" />
        <input type="text" v-model="name" placeholder="Enter Name" />
        <input type="text" v-model="surname" placeholder="Enter Surname" />
        <button v-on:click="signUp">Sign Up</button>
        <button v-on:click="login">Login</button>
    </div>
</template>
<script>
import {apiMixins} from "../mixins/apiMixins";
export default {
    name :'UserRegister',
    data(){
        return {
            name:'',
            surname:'',
            email:'',
            password:'',
        }
    },
    methods: {
        async signUp()
        {
            await apiMixins.register(this.email, this.password, this.name, this.surname);
        },

        async login()
        {
            await this.$router.push({name:'UserLogin'});
        }
    },

    async mounted(){
        if(localStorage.getItem("user-token")){
            await this.$router.push({name:"HomePage"});
        }
    }
}
</script>

<style>
    .register input{
        display: block;
        padding-left: 40px;
        margin-bottom: 10px;
        height: 40px;
        margin-left: auto;
        margin-right: auto;
        width: 300px;
    }

    .register button{
        height: 40px;
        width: 320px;
        cursor: pointer;
    }
</style>

