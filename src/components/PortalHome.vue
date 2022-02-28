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
                <div id="div-create-checkout-form" v-show="showForm">
                    <b-card title="Checkout" sub-title="">
                        <b-form @submit="createCheckout">
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
                            <b-form-group id="input-group-2" label="Reference:" label-for="input-reference">
                                <b-form-input
                                        id="input-reference"
                                        type="text"
                                        placeholder="Enter reference"
                                        v-model="reference"
                                        required
                                ></b-form-input>
                            </b-form-group>
                            <b-button type="submit" variant="primary">Submit</b-button>
                        </b-form>
                    </b-card>
                </div>
                <div v-show="showPaymment">
                        <div id="div-create-payment-widget">
                            <form id="form-create-payment-widget" class="paymentWidgets" data-brands="VISA MASTER AMEX"></form>
                        </div>
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
        name :'PortalHome',
        data(){
            return {
                amount:'',
                reference:'',
                showForm: true,
                showPaymment: false,
                showSuccess:false,
                showError:false,
                messageError:'',
                messageSuccess:'',
            }
        },
        methods: {
            async createCheckout()
            {
                this.showError = false;
                this.showSuccess = false;

                let checkout = await apiMixins.createCheckout(this.amount, this.reference);

                if(checkout.status === 201){
                    this.showForm = false;
                    this.showPaymment = true;
                    document.getElementById('form-create-payment-widget').action = process.env.VUE_APP_BASE_URL + process.env.VUE_APP_URI_CHECKOUT;
                    let oppwaWidget = document.createElement('script');
                    oppwaWidget.setAttribute("src","https://eu-test.oppwa.com/v1/paymentWidgets.js?checkoutId=" + checkout.data.data.id);
                    document.getElementById('div-create-payment-widget').appendChild(oppwaWidget);
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
            if (localStorage.getItem("user-token")) {
                await this.getUser();
            } else {
                localStorage.clear();
                await this.$router.push({name: "UserLogin"});
            }
        }
    }
</script>
