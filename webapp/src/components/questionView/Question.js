class Question{
    Question(json){
        question = "";
        answers = [];
        parseQuestion(json)
    }

    parseQuestion(json){
        this.question = json.question;
        for(const answer in json.answers){
            this.answers[0] = answer.correct;
            for(let i = 0; i < answer.wrong.length; i++)
                this.anwers[i + 1] = answer.wrong[i];
        }
    }

    getQuestion(){
        return this.question;
    }

    getAnswers() {
        return this.answers;
    }
    
}