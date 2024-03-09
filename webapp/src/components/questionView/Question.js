import "../../custom.css";

class Question{
    constructor(json){
        this.question = json.question;
        this.answers = json.answers;
        this.correctAnswer = json.answers[0];
    }

    getQuestion(){
        return this.question;
    }

    getAnswers() {
        return this.answers;
    }
    
}

export default Question;