import Question from './Question';
import "../../custom.css";
class QuestionGenerator{

    constructor(){
        this.apiUrl = (process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000') + "/questions";
        
    }

    async generateQuestions() {
        try {
            const response = await fetch(this.apiUrl);
            const receivedQuestions = await response.json();
            
            let i = 0;
            var questions = [];
            for (const key in receivedQuestions) {
                questions[i] = new Question(receivedQuestions[key]);
                i += 1;
            }
            console.log(questions);
            return questions;
        } catch (error) {
            throw new Error(error);
        }
    }

}

export default QuestionGenerator;

