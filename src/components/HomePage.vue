<template>
    <h1>Hello User</h1>
    <div class="register">
        <button v-on:click="logout">Logout</button>
    </div>
</template>
<script>
    import {apiMixins} from "../mixins/apiMixins";

    export default {
        name :'HomePage',
        methods: {
            async getUser(userToken)
            {
                if(!await apiMixins.getUser(userToken)){
                    await this.$router.push({name: "UserLogin"});
                }
            },

            logout()
            {
                localStorage.clear();
                this.$router.push({name: "UserLogin"});
            }
        },
        async mounted() {
            if (localStorage.getItem("user-token")) {
                let userToken = JSON.parse(localStorage.getItem("user-token"));
                await this.getUser(userToken)
            } else {
                await this.$router.push({name: "UserLogin"});
            }
        }
    }
</script>
