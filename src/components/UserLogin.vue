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
                    <div v-show="showSuccess">
                        <b-alert class="pre-formatted" variant="success" id="show-sucess-text" show>{{messageSuccess}}</b-alert>
                    </div>
                    <div v-show="showError">
                        <b-alert class="pre-formatted" variant="danger" id="show-error-text" show>{{messageError}}</b-alert>
                    </div>
                    <b-overlay :show="showLoader" rounded="sm">
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
                    </b-overlay>
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
                showSuccess:false,
                showError:false,
                messageError:'',
                messageSuccess:'',
                showLoader: false,
            }
        },
        methods: {
            async authenticate()
            {
                this.showError = false;
                this.showSuccess = false;
                this.showLoader = true;

                let auth = await apiMixins.authenticate(this.email, this.password);

                if(localStorage.getItem("user-token")){
                    await this.$router.push({name:'PortalHome'});
                }

                if(auth.status !== 200){
                    this.showError = true;
                    this.messageError = auth.response.data.message;
                }

                this.showLoader = false;
            },

            async signUp()
            {
                await this.$router.push({name:'UserRegister'});
            }
        },
        async mounted(){
            if(localStorage.getItem("user-token")){
                await this.$router.push({name:"PortalHome"});
            }
        }
    }
</script>
