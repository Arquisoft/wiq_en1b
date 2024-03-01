class Question{
    constructor(json){
        this.question = "";
        this.answers = [];
        this.parseQuestion(json)
    }

    parseQuestion(json){
        this.question = json.question;
        this.answers[0] = json.answers.correct;
        for(let i = 0; i < json.answers.wrong.length; i++)
            this.answers[i + 1] = json.answers.wrong[i];
        
    }

    getQuestion(){
        return this.question;
    }

    getAnswers() {
        return this.answers;
    }
    
}