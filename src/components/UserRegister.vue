<template>
    <b-container class="bv-example-row">
        <b-row>
            <br>
            <br>
        </b-row>
        <b-row>
            <b-col>
            </b-col>
            <b-col cols="7">
                <div>
                    <b-card title="Sign Up" sub-title="">
                        <b-form @submit="signUp">
                            <b-form-group id="input-group-1" label="Email:" label-for="input-email">
                                <b-form-input
                                        id="input-email"
                                        type="email"
                                        placeholder="Enter email"
                                        v-model="email"
                                        required
                                ></b-form-input>
                            </b-form-group>
                            <b-form-group id="input-group-2" label="Password:" label-for="input-password">
                                <b-form-input
                                        id="input-password"
                                        type="password"
                                        placeholder="Enter password"
                                        v-model="password"
                                        required
                                ></b-form-input>
                            </b-form-group>
                            <b-form-group id="input-group-3" label="Name:" label-for="input-name">
                                <b-form-input
                                        id="input-name"
                                        type="text"
                                        placeholder="Enter name"
                                        v-model="name"
                                        required
                                ></b-form-input>
                            </b-form-group>
                            <b-form-group id="input-group-4" label="Surname:" label-for="input-surname">
                                <b-form-input
                                        id="input-surname"
                                        type="text"
                                        placeholder="Enter surname"
                                        v-model="surname"
                                        required
                                ></b-form-input>
                            </b-form-group>
                            <b-button type="submit" variant="primary">Submit</b-button>
                        </b-form>
                        <div>
                            <br>
                            <b-link v-on:click="login">Login</b-link>
                        </div>
                    </b-card>
                </div>
            </b-col>
            <b-col>
            </b-col>
        </b-row>
    </b-container>
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
            await this.$router.push({name:"PortalHome"});
        }
    }
}
</script>
