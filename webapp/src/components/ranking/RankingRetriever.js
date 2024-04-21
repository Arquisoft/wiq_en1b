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
            console.log(error)
            throw new Error(error);
            
        }
        /*
        return  {
          "usersCompetitiveStats": [
            {
              "_id": "user",
              "totalPoints": 1000,
              "totalCompetitiveGames": 4
            },
            {
              "_id": "user2",
              "totalPoints": 900,
              "totalCompetitiveGames": 2
            },
            {
              "_id": "user3",
              "totalPoints": 800,
              "totalCompetitiveGames": 3
            },
            {
              "_id": "user4",
              "totalPoints": 700,
              "totalCompetitiveGames": 5
            },
            {
              "_id": "user5",
              "totalPoints": 600,
              "totalCompetitiveGames": 6
            },
            {
              "_id": "user6",
              "totalPoints": 500,
              "totalCompetitiveGames": 7
            },
            {
              "_id": "user7",
              "totalPoints": 400,
              "totalCompetitiveGames": 8
            },
            {
              "_id": "user8",
              "totalPoints": 300,
              "totalCompetitiveGames": 9
            },
            {
              "_id": "user9",
              "totalPoints": 200,
              "totalCompetitiveGames": 10
            },
            {
              "_id": "user10",
              "totalPoints": 100,
              "totalCompetitiveGames": 11
            }
          ]
        }*/
    }
    async getUser(user, token){
      
        try {
            const response = await axios.get(this.apiUrl + '/'+user, {headers : {'token':token}});//finding the top ten
            const receivedMyRanking = await response.data;
            return receivedMyRanking.userCompetitiveStats;
        } catch (error) {
            console.log(error)
            throw new Error(error);
            
        }
        /*
        return {
          "_id": "myUser",
          "totalPoints": 250,
          "totalCompetitiveGames": 1
        };*/
    }
    
    

}

export default RankingRetriever;

