import "../../custom.css";

class Question{
    constructor(json){
        this.question = json.question;
        this.correctAnswer = json.answers[0];
        this.answers = this.shuffleArray(json.answers);
        
    }

    getQuestion(){
        return this.question;
    }

    getAnswers() {
        return this.answers;
    }
    getCorrectAnswer(){
        return this.correctAnswer;
    }
    isCorrect(answer){
        return answer===this.correctAnswer;
    }

    shuffleArray(array) {
        let innerArray = [...array]; // Copies array
        for (let i = innerArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // Generate a random index between 0 and i
            const temp = innerArray[i]; // Swap innerArray[i] and innerArray[j]
            innerArray[i] = innerArray[j];
            innerArray[j] = temp;
        }
        return innerArray;
    }
    
}

export default Question;