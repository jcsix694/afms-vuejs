<template>

        <b-nav tabs v-if="!$route.meta.hideNavbar">
            <b-nav-item v-on:click="home" active role="button">Home</b-nav-item>
            <b-nav-item v-on:click="checkouts" role="button">Checkouts</b-nav-item>
            <b-nav-item v-on:click="logout" role="button">Logout</b-nav-item>
        </b-nav>

    <router-view />
</template>

<script>
    import {apiMixins} from "./mixins/apiMixins";

    export default {
        name: 'App',
        methods: {
            home()
            {
                localStorage.clear();
                this.$router.push({name: "PortalHome"});
            },

            checkouts()
            {
                localStorage.clear();
                this.$router.push({name: "PortalCheckouts"});
            },

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
