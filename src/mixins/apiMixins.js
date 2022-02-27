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
            data = response.data;
            localStorage.setItem("user-token",JSON.stringify(data));
        }).catch(reason => {
            data = reason.response.data;

            if(reason.response.status === 422){
                // reason.response.data.errors
                alert(reason.response.data.message)
            }else{
                alert(reason.response.data.message);
            }
        });

        return false;
    },

    async getUser(){
        let userToken = await this.userToken();
        let data = null;
        await axios.get(process.env.VUE_APP_AFMS_API_BASE + process.env.VUE_APP_AFMS_API_URI_USERS + process.env.VUE_APP_AFMS_API_URI_ME,{
            headers: {
                Authorization: userToken.tokenType + " " + userToken.accessToken,
            }}).then(response => {
            localStorage.setItem("user",JSON.stringify(response.data.data));
            data = true;
        }).catch(reason => {
            data = false;
            if(reason.response.status === 401){
                alert('Please log back in again');
            }
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
            alert(response.data.message);
            data = true;
        }).catch(reason => {
            if(reason.response.status === 422){
                alert(reason.response.data.message);
            }else{
                alert(reason.message);
            }
            data = false;
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
            data = response.data.data.id;
        }).catch(reason => {
            if(reason.response.status === 422){
                alert(reason.response.data.message);
            }else{
                alert(reason.message);
            }
            data = false
        });
        return data;
    },
}
