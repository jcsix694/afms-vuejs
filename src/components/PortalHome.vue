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
                <div id="div-create-checkout-form">
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
            }
        },
        methods: {
            async createCheckout()
            {
                await apiMixins.createCheckout(this.amount, this.reference);
            },
        },
    }
</script>
