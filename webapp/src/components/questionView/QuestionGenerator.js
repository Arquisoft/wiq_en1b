import Question from './Question';
import "../../custom.css";
class QuestionGenerator{

    constructor(){
        this.apiUrl = (process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000') + "/questions";
        
    }

    async generateQuestions() {
        try {
            //const response = await fetch(this.apiUrl);
            //const receivedQuestions = await response.json();

            //Mockup
            const receivedQuestions = JSON.parse('{"0":{"question":"¿Cuál es la población de Oviedo?","answers":["225089","191325","220587","121548"]},'+
            '"1":{"question":"¿Cuál es la población de Gijón?","answers":["275274","159658","233982","305554"]},'+
            '"2":{"question":"¿Cuál es la población de Avilés?","answers":["82568","115595","41284","122200"]},'+
            '"3":{"question":"¿Cuál es la capital de Asturias?","answers":["Ciudad de Oviedo","a","b","c"]},'+
            '"4":{"question":"¿Cuál es la capital de España?","answers":["Madrid","a","b","c"]},'+
            '"5":{"question":"¿Cuál es la capital de Turquía?","answers":["Ankara","a","b","c"]},'+
            '"6":{"question":"¿Cuál es el área (km cuadrados) de España?","answers":["505990","a","b","c"]},'+
            '"7":{"question":"¿Cuál es el área (km cuadrados) de Gijón?","answers":["184.31","a","b","c"]},'+
            '"8":{"question":"¿Cuál es el área (km cuadrados) de Asturias?","answers":["10603.57","a","b","c"]},'+
            '"9":{"question":"¿Cuál es el idioma oficial de España?","answers":["español","a","b","c"]},'+
            '"10":{"question":"¿Cuál es el idioma oficial de Turquía?","answers":["turco","a","b","c"]},'+
            '"11":{"question":"¿Cuál es el idioma oficial de Asturias?","answers":["español","a","b","c"]},'+
            '"12":{"question":"Whats the population of Oviedo?","answers":["225089","216085","285863","243096"]}}')
            
            let i = 0;
            var questions = [];
            for (const key in receivedQuestions) {
                questions[i] = new Question(receivedQuestions[key]);
                i += 1;
            }
            console.log(questions);
            return questions;
        } catch (error) {
            throw new Error(error);
        }
    }

}

export default QuestionGenerator;

