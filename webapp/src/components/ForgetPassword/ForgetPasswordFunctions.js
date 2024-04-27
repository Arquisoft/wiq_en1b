import axios from 'axios';

class ForgetPasswordFunctions{

    constructor(){
        this.apiUrl = (process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000');
        this.token;
    }

    async sendEmail(email, username){
        try {
            const response = await axios.post(this.apiUrl + '/forgetPassword', { email, username});
            return !!response.text;
        } catch (error) {
            console.log(error)
            return false;
        }
    }

    async tokenFromCode(code){
        try{
            const response = await axios.get(this.apiUrl+'/tokenFromCode/'+code)
            this.token=response.data.token;
            return response.data.token;
        }catch (error) {
            console.log(error)
            return "Invalid Token";
        }
    }
    async changePassword(email, username, password, repeatPassword){
        try{
            const response = await axios.post(this.apiUrl+'/changePassword',
            {
                email,
                username,
                password,
                repeatPassword 
              },
              {
                headers: {
                  'token': this.token
                }
              }
            )
            return response;
        }catch (error) {
            console.log(error)
            return "Invalid Token";
        }
    }

}

export default ForgetPasswordFunctions;
