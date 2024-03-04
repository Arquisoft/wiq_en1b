import Question from './Question';
class QuestionGenerator{

    constructor(){
        this.apiUrl = "http://localhost:8090/test";
        
    }

    async generateQuestions() {
        try {
            const response = await fetch(this.apiUrl);
            const receivedQuestions = await response.json();
            
            let i = 0;
            var questions = [];
            for (const question in receivedQuestions) {
                questions[i] = new Question(receivedQuestions[i]);
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

