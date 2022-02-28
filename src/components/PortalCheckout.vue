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
                <div id="div-completed-checkout-card" v-show="showCheckout">
                    <b-card title="" header-tag="header" footer-tag="footer">
                        <template #header>
                            <h6 class="mb-0">{{checkoutId}}</h6>
                        </template>
                        <b-card-text>Status: {{checkoutStatus}}</b-card-text>
                        <b-card-text>Amount: {{checkoutAmount}}</b-card-text>
                        <b-card-text>Currency: {{checkoutCurrency}}</b-card-text>
                        <b-card-text>Reference: {{checkoutReference}}</b-card-text>
                        <b-card-text>Code: {{checkoutCode}}</b-card-text>
                        <b-card-text>Description: {{checkoutDescription}}</b-card-text>
                        <template #footer>
                            <em>Completed At: {{checkoutCompletedAt}}</em>
                        </template>
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
        name :'PortalCheckout',
        data(){
            return {
                checkoutId:'',
                checkoutStatus:'',
                checkoutAmount:'',
                checkoutReference:'',
                checkoutCurrency:'',
                checkoutCompletedAt:'',
                checkoutCode:'',
                checkoutDescription:'',
                showCheckout: false,
                showSuccess:false,
                showError:false,
                messageError:'',
                messageSuccess:'',
                showLoader: false,
            }
        },
        methods: {
            async getCheckout()
            {
                return await apiMixins.getCheckout(this.checkoutId);
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
          async mounted(){
              this.showLoader = true;
              if (localStorage.getItem("user-token")) {
                  await this.getUser();

                  let urlParams = new URLSearchParams(window.location.search);
                  this.checkoutId = urlParams.get('id');
                  let checkout = await this.getCheckout();

                  this.showLoader = false;

                  if(checkout.status === 200){
                      this.checkoutStatus = checkout.data.data.status;
                      this.checkoutAmount = checkout.data.data.payment.amount;
                      this.checkoutReference = checkout.data.data.reference;
                      this.checkoutCurrency = checkout.data.data.payment.currency;
                      this.checkoutCompletedAt = checkout.data.data.payment.completedAt;
                      this.checkoutCode = checkout.data.data.payment.code;
                      this.checkoutDescription = checkout.data.data.payment.description;
                      this.showCheckout = true;
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
              } else {
                  localStorage.clear();
                  await this.$router.push({name: "UserLogin"});
              }
          }
    }
</script>
