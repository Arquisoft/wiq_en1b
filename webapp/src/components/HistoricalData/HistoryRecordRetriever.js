import axios from 'axios';

class HistoryRecordRetriever{

    constructor(){
        this.apiUrl = (process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000') + "/record";
        
    }

    async getRecords(user, token) {
        try {
            const response = await axios.get(this.apiUrl + '/' + user, { headers : {'token':token}});
            const receivedRecords = await response.data;
            console.log(receivedRecords)
            console.log(receivedRecords[0])
            return receivedRecords.record;
        } catch (error) {
            console.log(error)
            throw new Error(error);
            
        }
    }

}

export default HistoryRecordRetriever;

