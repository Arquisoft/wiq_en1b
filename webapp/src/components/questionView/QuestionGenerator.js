import Question from './Question';
import axios from 'axios'

class QuestionGenerator{

    constructor(){
        this.apiUrl = (process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000') + "/questions";
        
    }

    async generateQuestions(lang) {
        
        // try {
        //     //const response = await fetch(this.apiUrl);
        //     //const receivedQuestions = await response.json();

        //     //Mockup
        //     // console.log("type: "+type+" amount: "+amount)
        //     const receivedQuestions = JSON.parse('{"0":{"question":"¿Cuál es la población de Oviedo?","answers":["225089","191325","220587","121548"]},'+
        //     '"1":{"question":"¿Which is the population of Gijon?","answers":["275274","159658","233982","305554"]},'+
        //     '"2":{"question":"¿Cuál es la población de Avilés?","answers":["82568","115595","41284","122200"]},'+
        //     '"3":{"question":"¿Cuál es la capital de Asturias?","answers":["Ciudad de Oviedo","a","b","c"]},'+
        //     '"4":{"question":"¿Cuál es la capital de España?","answers":["Madrid","a","b","c"]},'+
        //     '"5":{"question":"¿Cuál es la capital de Turquía?","answers":["Ankara","a","b","c"]}}')
            
        //     let i = 0;
        //     var questions = [];
        //     for (const key in receivedQuestions) {
        //         questions[i] = new Question(receivedQuestions[key]);
        //         i += 1;
        //     }
        //     console.log(questions);
        //     return questions;
        // } catch (error) {
        //     throw new Error(error);
        // }
        
        
        
        try {
            const response = await axios.get(this.apiUrl + '/' + lang);
            const receivedQuestions = await response.data;
            let i = 0;
            var questions = [];
            for (const key in receivedQuestions) {
                questions[i] = new Question(receivedQuestions[key]);
                i += 1;
            }
            return questions;
        } catch (error) {
            throw new Error(error);
        }
        
    }

}

export default QuestionGenerator;