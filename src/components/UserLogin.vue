<template>
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>Sign Up</h1>
    <div class="register">
        <input type="text" v-model="email" placeholder="Enter Email" />
        <input type="text" v-model="password" placeholder="Enter Password" />
        <button v-on:click="authenticate">Login</button>
        <button v-on:click="signUp">Sign Up</button>
    </div>
</template>
<script>
    import {apiMixins} from '../mixins/apiMixins.js'
    export default {
        name :'UserLogin',
        data(){
            return {
                email:'',
                password:'',
            }
        },
        methods: {
            async authenticate()
            {
                await apiMixins.authenticate(this.email, this.password);

                if(localStorage.getItem("user-token")){
                    await this.$router.push({name:'HomePage'});
                }
            },

            async signUp()
            {
                await this.$router.push({name:'UserRegister'});
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

