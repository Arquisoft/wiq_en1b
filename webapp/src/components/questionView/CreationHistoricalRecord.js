class CreationHistoricalRecord{
    
    constructor() {
        this.record = {
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

    
    async sendRecord(user) {
        const apiUrl = (process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000') + "/record";
      
        const body = {
          user:user,
          game:this.record.game
        }
        console.log(body)
        try {
          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
          });
      
          if (!response.ok) {
            throw new Error('Error al enviar el registro');
          }
      
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.error('Error:', error);
        }
      }

}
export default CreationHistoricalRecord;
/*
// Ejemplo de uso:
const userId = "userIdentifier";
const record = new CreationHistoricalRecord(userId);

record.addQuestion(
    "¿Cuál es el río más largo del mundo?",
    ["Nilo", "Amazonas", "Yangtsé", "Misisipi"],
    "Amazonas",
    "Amazonas"
);

record.addQuestion(
    "¿Cuál es el elemento más abundante en la corteza terrestre?",
    ["Hierro", "Oxígeno", "Silicio", "Aluminio"],
    "Oxígeno",
    "Oxígeno"
);

record.setPoints(2500);
record.setDate("02/02/24");

const recordRecord = record.getRecord();
console.log(recordRecord);*/