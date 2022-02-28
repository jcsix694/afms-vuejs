<template>
    <b-container class="bv-example-row">
        <b-row>
            <br>
            <br>
        </b-row>
        <b-row>
            <b-col cols="12">
                <div id="app" v-show="showTable">
                    <p class="mt-3">Current Page: {{ currentPage }}</p>
                    <b-pagination size="md" :total-rows="totalItems" v-model="currentPage" :per-page="perPage"></b-pagination>
                    <b-overlay :show="showLoader" rounded="sm">
                    <b-table show-empty :items="items" :fields="fields" :current-page="currentPage" :per-page="0"></b-table>
                    </b-overlay>
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
                showTable:false,
                currentPage: 0,
                perPage: 0,
                totalItems: 0,
                showLoader: false,
                fields: [
                    {
                        key: 'id',
                        label: 'ID'
                    },
                    {
                        key: 'reference',
                        label: 'Reference'
                    },
                    {
                        key: 'status',
                        label: 'Status',
                    },
                    {
                        key: 'amount',
                        label: 'Amount',
                    },
                    {
                        key: 'currency',
                        label: 'Currency',
                    },
                    {
                        key: 'code',
                        label: 'Code',
                    },
                    {
                        key: 'description',
                        label: 'Description',
                    },
                    {
                        key: 'completedAt',
                        label: 'Completed At',
                    }

                ],
                items: [
                ]
            }
        },
        watch: {
            'currentPage'(newPage) {
                this.getCheckouts(newPage);
            }
        },
        methods: {
            async getCheckouts(page)
            {
                this.showLoader = true;

                let checkouts = await apiMixins.getCheckouts(page);

                this.showLoader = false;

                if(checkouts.status === 200) {
                    this.items = checkouts.data.data;

                    this.currentPage = checkouts.data.meta.current_page;
                    this.perPage = checkouts.data.meta.per_page;
                    this.totalItems = checkouts.data.meta.total;

                    // eslint-disable-next-line no-unused-vars
                    for (const [key, value] of Object.entries(this.items)) {
                        if(!value.responsePayment) {
                            this.items[key].amount = null;
                            this.items[key].currency = null;
                            this.items[key].code = null;
                            this.items[key].description = null;
                        } else {
                            this.items[key].amount = value.responsePayment.amount;
                            this.items[key].currency = value.responsePayment.currency;
                            this.items[key].code = value.responsePayment.result.code;
                            this.items[key].description = value.responsePayment.result.description;
                        }
                    }
                    this.showTable = true;
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
            this.showLoader = true;

            if (localStorage.getItem("user-token")) {
                await this.getUser();
                await this.getCheckouts(this.currentPage);
            } else {
                localStorage.clear();
                await this.$router.push({name: "UserLogin"});
            }
        },
    }
</script>
