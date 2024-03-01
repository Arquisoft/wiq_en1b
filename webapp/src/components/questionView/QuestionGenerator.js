class QuestionGenerator{

    constructor(){
        this.apiUrl = "http://localhost:8090/test";
        this.questions = [];
        
    }

    generateQuestions(){
        //Deberíamos recoger el json
        fetch(this.apiUrl)
            .then(response => response.json()) // Convertir la respuesta a JSON
            .then(receivedQuestions => { // La respuesta convertida a JSON se pasa como argumento
                let i = 0;
                for(const question in receivedQuestions){//To have a condition, no legth or size
                    this.questions[i] = new Question(receivedQuestions[i]);
                    i += 1;
                }
            });
    }

}

var q = new QuestionGenerator();
q.generateQuestions();

