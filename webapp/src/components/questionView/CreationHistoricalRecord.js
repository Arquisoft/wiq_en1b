import axios from 'axios'

class CreationHistoricalRecord{
    
    constructor() {
        this.record = {
            game: {
                questions: []
            }
        };
    }

    addQuestion(statement, answers, answerGiven, correctAnswer, numQuestion) {
        if(this.record.game.questions.length === numQuestion){
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

    setCompetitive(isCompetitive){
      this.record.game.competitive = isCompetitive;
    }

    getRecord() {
        return this.record;
    }

    
    async sendRecord(user) {
      const apiUrl = (process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000') + "/record";
    
      const body = {
        user: user,
        game: this.record.game 
      };
    
      try {
          const response = await axios.post(apiUrl, body, {
              headers: {
                  'Content-Type': 'application/json'
              }
          });
        
          
          console.log('Registro enviado:', response.data);
      } catch (error) {
          console.error('Error al enviar el registro:', error.message); 
      }
  }

}
export default CreationHistoricalRecord;
