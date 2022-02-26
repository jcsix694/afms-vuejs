<template>

        <b-nav tabs v-if="!$route.meta.hideNavbar">
            <b-nav-item active role="button">Home</b-nav-item>
            <b-nav-item role="button">Checkouts</b-nav-item>
            <b-nav-item v-on:click="logout" role="button">Logout</b-nav-item>
        </b-nav>

    <router-view />
</template>

<script>
    import {apiMixins} from "./mixins/apiMixins";

    export default {
        name: 'App',
        methods: {
            logout()
            {
                localStorage.clear();
                this.$router.push({name: "UserLogin"});
            },

            async getUser()
            {
                if(!await apiMixins.getUser()){
                    await this.$router.push({name: "UserLogin"});
                }
            },
        },
        async mounted() {
            if (localStorage.getItem("user-token")) {
                await this.getUser()
            } else {
                await this.$router.push({name: "UserLogin"});
            }
        }
    }
</script>
