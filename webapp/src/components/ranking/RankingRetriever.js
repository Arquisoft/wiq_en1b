import axios from 'axios';

class RankingRetriever{

    constructor(){
        this.apiUrl = (process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000')+ "/record/ranking";
        
    }

    async getTopTen(token) {
       
        try {
            const response = await axios.get(this.apiUrl + '/top10', {headers : {'token':token}});//finding the top ten
            const receivedTopTenRanking = await response.data;
            return receivedTopTenRanking;
        } catch (error) {
            throw new Error(error);
            
        }
    }
    async getUser(user, token){
      
        try {
            const response = await axios.get(this.apiUrl + '/'+user, {headers : {'token':token}});//finding the top ten
            const receivedMyRanking = await response.data;
            return receivedMyRanking.userCompetitiveStats;
        } catch (error) {
            throw new Error(error);
            
        }
    }
    
    

}

export default RankingRetriever;

