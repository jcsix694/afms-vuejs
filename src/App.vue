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
            async home()
            {
                await this.$router.push({name: "PortalHome"});
            },

            async checkouts()
            {
                await this.$router.push({name: "PortalCheckouts"});
            },

            async logout()
            {
                localStorage.clear();
                await this.$router.push({name: "UserLogin"});
            },

            async getUser()
            {
                let user = await apiMixins.getUser();

                if(user.status !== 200){
                    alert('You have been logged out, please log back in');
                    await this.logout();
                }
            },
        }
    }
</script>
<style>
    .pre-formatted {
        white-space: pre-wrap;
    }
</style>
