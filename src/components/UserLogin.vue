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
                    <b-card title="Login" sub-title="">
                        <b-form @submit="authenticate">
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
                            <b-button type="submit" variant="primary">Submit</b-button>
                        </b-form>
                        <div>
                            <br>
                            <b-link v-on:click="signUp">Sign Up</b-link>
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
