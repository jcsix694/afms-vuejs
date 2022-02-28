import axios from "axios";

export const apiMixins = {
    async userToken(){
        return JSON.parse(localStorage.getItem("user-token"));
    },

    async authenticate(email, passwrd){
        let data = null;
        await axios.post(process.env.VUE_APP_AFMS_API_BASE + process.env.VUE_APP_AFMS_API_URI_AUTH,{
            email:email,
            password:passwrd,
        }).then(response => {
            data = response;
            localStorage.setItem("user-token",JSON.stringify(response.data));
        }).catch(reason => {
            data = reason;
        });

        return data;
    },

    async getUser(){
        let userToken = await this.userToken();
        let data = null;
        await axios.get(process.env.VUE_APP_AFMS_API_BASE + process.env.VUE_APP_AFMS_API_URI_USERS + process.env.VUE_APP_AFMS_API_URI_ME,{
            headers: {
                Authorization: userToken.tokenType + " " + userToken.accessToken,
            }}).then(response => {
            localStorage.setItem("user",JSON.stringify(response.data.data));
            data = response;
        }).catch(reason => {
            data = reason;
            localStorage.clear();
        });

        return data;
    },

    async register(email, password, name, surname){
        let data = null;

        await axios.post(process.env.VUE_APP_AFMS_API_BASE + process.env.VUE_APP_AFMS_API_URI_USERS,{
            email:email,
            password:password,
            name:name,
            surname:surname
        }).then(response => {
            data = response
        }).catch(reason => {
            data = reason;
        });

        return data;
    },

    async createCheckout(amount, reference){
        let userToken = await this.userToken();
        let data = null;
        await axios.post(process.env.VUE_APP_AFMS_API_BASE + process.env.VUE_APP_AFMS_API_URI_CHECKOUTS,{
            amount:amount,
            reference:reference,
        }, {
            headers: {
                Authorization: userToken.tokenType + " " + userToken.accessToken,
            }
        }).then(response => {
            data = response;
        }).catch(reason => {
            data = reason
        });
        return data;
    },

    async getCheckout(checkoutId){
        let userToken = await this.userToken();
        let data = null;
        await axios.get(process.env.VUE_APP_AFMS_API_BASE + process.env.VUE_APP_AFMS_API_URI_CHECKOUTS + '/' + checkoutId,{
            headers: {
                Authorization: userToken.tokenType + " " + userToken.accessToken,
            }}).then(response => {
            data = response;
        }).catch(reason => {
            data = reason;
        });
        return data;
    },

    async getCheckouts(page){
        let userToken = await this.userToken();
        let data = null;
        await axios.get(process.env.VUE_APP_AFMS_API_BASE + process.env.VUE_APP_AFMS_API_URI_CHECKOUTS + '?page=' + page,{
            headers: {
                Authorization: userToken.tokenType + " " + userToken.accessToken,
            }}).then(response => {
            data = response;
        }).catch(reason => {
            data = reason;
        });
        return data;
    }
};
