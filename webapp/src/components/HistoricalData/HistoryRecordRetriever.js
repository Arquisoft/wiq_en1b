import axios from 'axios';

class HistoryRecordRetriever{

    constructor(){
        this.apiUrl = (process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000') + "/record";
        
    }

    async getRecords(user) {
        
        try {
            const response = await axios.get(this.apiUrl + '/' + user);
            const receivedRecords = await response.data;
            return receivedRecords.record;
        } catch (error) {
            console.log(error)
            throw new Error(error);
            
        }
        /*
        return {
            userId: user,
            games: [
                {
                    questions: [
                        {
                            question: "¿Cuál es la capital de Francia?",
                            answers: ["Madrid", "París", "Londres", "Roma"],
                            answerGiven: "París",
                            correctAnswer: "París"
                        },
                        {
                            question: "¿En qué año comenzó la Segunda Guerra Mundial?",
                            answers: ["1939", "1945", "1914", "1941"],
                            answerGiven: "1939",
                            correctAnswer: "1939"
                        },
                        {
                            question: "¿Quién escribió 'Don Quijote de la Mancha'?",
                            answers: ["Miguel de Cervantes", "Gabriel García Márquez", "Federico García Lorca", "Jorge Luis Borges"],
                            answerGiven: "Miguel de Cervantes",
                            correctAnswer: "Miguel de Cervantes"
                        }
                    ],
                    points: 3000,
                    date: "01/02/24"
                },
                {
                    questions: [
                        {
                            question: "¿Cuál es el río más largo del mundo?",
                            answers: ["Nilo", "Amazonas", "Yangtsé", "Misisipi"],
                            answerGiven: "Amazonas",
                            correctAnswer: "Amazonas"
                        },
                        {
                            question: "¿Cuál es el elemento más abundante en la corteza terrestre?",
                            answers: ["Hierro", "Oxígeno", "Silicio", "Aluminio"],
                            answerGiven: "Oxígeno",
                            correctAnswer: "Oxígeno"
                        }
                    ],
                    points: 2500,
                    date: "02/02/24"
                },
                {
                    questions: [
                        {
                            question: "¿Quién pintó la Mona Lisa?",
                            answers: ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Rembrandt"],
                            answerGiven: "Leonardo da Vinci",
                            correctAnswer: "Leonardo da Vinci"
                        },
                        {
                            question: "¿Cuál es el planeta más grande del sistema solar?",
                            answers: ["Júpiter", "Saturno", "Neptuno", "Urano"],
                            answerGiven: "Júpiter",
                            correctAnswer: "Júpiter"
                        }
                    ],
                    points: 3500,
                    date: "03/02/24"
                }
            ]
        };*/
    }
    
    

}

export default HistoryRecordRetriever;

