import Question from './Question';
import axios from 'axios'

class QuestionGenerator{

    constructor(){
        this.apiUrl = (process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000') + "/questions";
        
    }

    async generateQuestions(lang, token) {
        try {
            const response = await axios.get(this.apiUrl + '/' + lang, {headers : {'token':token}});
            console.log(response)
            const receivedQuestions = await response.data;
            let i = 0;
            var questions = [];
            for (const key in receivedQuestions) {
                questions[i] = new Question(receivedQuestions[key]);
                i += 1;
            }
            return questions;
        } catch (error) {
            throw new Error(error);
        }
    }

}

export default QuestionGenerator;

