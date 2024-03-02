import Question from './Question';
class QuestionGenerator{

    constructor(){
        this.apiUrl = "http://localhost:8090/test";
        
    }

    generateQuestions(){
        //Deberíamos recoger el json
        fetch(this.apiUrl)
            .then(response => response.json()) 
            .then(receivedQuestions => { 
                let i = 0;
                var questions = [];
                for(const question in receivedQuestions){//To have a condition, no legth or size
                    questions[i] = new Question(receivedQuestions[i]);
                    i += 1;
                }
                return questions;
            });
    }

}

export default QuestionGenerator;

