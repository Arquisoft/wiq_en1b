import Question from 'Question.js';


class QuestionGenerator{

    QuestionGenerator(){
        apiUrl = "http://localhost:8090/test";
        questions = [];
        generateQuestions();
    }

    generateQuestions(){
        //Deberíamos recoger el json
        fetch(this.apiUrl).then(response =>{
            receivedQuestions = JSON.parse(response);
            let i = 0;
            for(const question in receivedQuestions){
                this.questions[i] = new Question(question.question);
                i += 1;
            }
        });
    }

}

