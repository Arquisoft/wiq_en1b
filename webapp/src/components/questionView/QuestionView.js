import Question from './Question';
import QuestionGenerator from './QuestionGenerator';
import { useEffect, useState } from 'react';
import './QuestionView.css';


function QuestionView(){
    const questionGenerator = new QuestionGenerator();
    const [numQuestion, setnumQuestion] = useState(-1);
    const [questions, setQuestions] = useState([]);

    const generateQuestions = async (numQuestion) => {
        if (numQuestion < 0) {
            try {
                var generatedQuestions = await questionGenerator.generateQuestions();
                setQuestions(generatedQuestions);
                setnumQuestion(0);
            } catch (error) {
                //Como hacer que funcione esto
                console.log(error.response.data.error);
            }
            
        }
    }

    function handleClick(){
        setnumQuestion(numQuestion + 1);
    }

    useEffect(() => {generateQuestions(numQuestion)}, []);
    
    return (
    <div className="">
        {/*Nav*/}
        {numQuestion >= 0 ? 
        <QuestionComponent questions={questions} numQuestion={numQuestion} handleClick={handleClick}/> :
        <h1>Please Wait a bit...</h1> }
        

    </div>);
}

function QuestionComponent({questions, numQuestion, handleClick}){
    return (
        <>
            <h2>{questions[numQuestion].getQuestion()}</h2>
                <div className="answerPanel">
                    {questions[numQuestion].getAnswers().map((item, index) => (
                        <Answer key={index} text={item} onClick={handleClick}/>
                    ))}
                    <p>Question counter: {numQuestion}</p>
                </div>
        </>
    );
}

function Answer({text, onClick}){
    return (
        <button className="answerButton" onClick={onClick}>{text}</button>
    );
}

export default QuestionView;