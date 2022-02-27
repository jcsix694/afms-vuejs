<template>
    <b-container class="bv-example-row">
        <b-row>
            <br>
            <br>
        </b-row>
        <b-row>
            <b-col cols="12">
                <div id="div-get-checkout-table">
                    <b-card title="All Checkouts" sub-title="">

                    </b-card>
                </div>
            </b-col>
        </b-row>
    </b-container>
</template>
<script>
    import {apiMixins} from "../mixins/apiMixins";

    export default {
        name :'PortalCheckouts',
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
