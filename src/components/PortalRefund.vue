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
                <div v-show="showSuccess">
                    <b-alert class="pre-formatted" variant="success" id="show-sucess-text" show>{{messageSuccess}}</b-alert>
                </div>
                <div v-show="showError">
                    <b-alert class="pre-formatted" variant="danger" id="show-error-text" show>{{messageError}}</b-alert>
                </div>
                <b-overlay :show="showLoader" rounded="sm">
                <div id="div-create-checkout-form" v-show="showForm">
                    <b-card title="Refund" sub-title="">
                        <b-form @submit="createRefund">
                            <b-form-group id="input-group-1" label="Amount:" label-for="input-amount">
                                <b-form-input
                                        id="input-amount"
                                        type="number"
                                        step="0.01"
                                        placeholder="Enter amount"
                                        v-model="amount"
                                        required
                                ></b-form-input>
                            </b-form-group>
                            <b-button type="submit" variant="primary">Submit</b-button>
                        </b-form>
                    </b-card>
                </div>
                </b-overlay>
            </b-col>
            <b-col>
            </b-col>
        </b-row>
    </b-container>
</template>
<script>
    import {apiMixins} from "../mixins/apiMixins";

    export default {
        name :'PortalRedfund',
        data(){
            return {
                amount:'',
                paymentId:'',
                showForm: true,
                showSuccess:false,
                showError:false,
                messageError:'',
                messageSuccess:'',
                showLoader: false,
            }
        },
        methods: {
            async createRefund()
            {
                this.showError = false;
                this.showSuccess = false;
                this.showLoader = true;

                let checkout = await apiMixins.createRefund(this.amount, this.paymentId);

                this.showLoader = false;

                if(checkout.status === 201){
                    this.showSuccess = true;
                    this.messageSuccess = "A refund of " + this.amount + " has been processed";
                }else{
                    if(checkout.response.data.status) {
                        this.showError = true;
                        this.messageError = checkout.response.data.message;
                    }else{
                        let registerErrors = '';
                        // eslint-disable-next-line no-unused-vars
                        for (const [errorKey, errorValue] of Object.entries(checkout.response.data.errors)) {
                            registerErrors += errorValue + "\n\n";
                        }
                        registerErrors = registerErrors.substring(0, registerErrors.length - 2);
                        this.messageError = registerErrors;
                        this.showError = true;
                    }
                }
            },

            async getUser()
            {
                let user = await apiMixins.getUser();

                if(user.status !== 200){
                    alert('You have been logged out, please log back in');
                    localStorage.clear();
                    await this.$router.push({name: "UserLogin"});
                }
            },
        },
        async mounted() {
            this.paymentId = this.$route.params.id;
            if (localStorage.getItem("user-token")) {
                await this.getUser();
            } else {
                localStorage.clear();
                await this.$router.push({name: "UserLogin"});
            }
        }
    }
</script>
