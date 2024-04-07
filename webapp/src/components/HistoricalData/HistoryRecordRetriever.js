import axios from 'axios';

class HistoryRecordRetriever{

    constructor(){
        this.apiUrl = (process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000') + "/record";
        
    }

    async getRecords(user) {
        try {
            const response = await axios.get(this.apiUrl + '/' + user);
            const receivedRecords = await response.data;
            return receivedRecords.record;
        } catch (error) {
            throw new Error(error);
        }
    }

}

export default HistoryRecordRetriever;

