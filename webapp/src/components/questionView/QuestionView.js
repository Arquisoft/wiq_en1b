import Question from './Question';
import QuestionGenerator from './QuestionGenerator';
import { useState } from 'react';

const questionGenerator = new QuestionGenerator();
var questions = questionGenerator.generateQuestions();

function QuestionView(){
    const [numQuestion, setnumQuestion] = useState(0);

    function handleClick(){
        setnumQuestion(numQuestion + 1);
    }
    return (<div>
        {/*Nav*/}
        <QuestionComponent numQuestion={numQuestion} handleClick={handleClick}/>

    </div>);
}

function QuestionComponent({numQuestion, handleClick}){
    return (
        <div>
        <p>questions[numQuestion].getQuestion()</p>
        {questions[numQuestion].getAnswers().map((item, index) => (
            <Answer key={index} text={item} onClick={handleClick}/>
        ))}
        </div>
    );
}

function Answer({text, handleClick}){
    return (
        <button onClick={handleClick}>{text}</button>
    );
}

export default QuestionView;