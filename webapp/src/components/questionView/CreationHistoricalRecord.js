class CreationHistoricalRecord{
    
    constructor() {
        this.record = {
            user: "a",
            game: {
                questions: []
            }
        };
    }

    addQuestion(statement, answers, answerGiven, correctAnswer, numQuestion) {
        if(this.record.game.questions.length == numQuestion){
            this.record.game.questions.push({
                question: statement,
                answers: answers,
                answerGiven: answerGiven,
                correctAnswer: correctAnswer
            });
        }
    }

    setPoints(points) {
        this.record.game.points = points;
    }

    setDate(date) {
        this.record.game.date = date;
    }

    getRecord() {
        return this.record;
    }

}
export default CreationHistoricalRecord;
