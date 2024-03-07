import Question from './Question';
import QuestionGenerator from './QuestionGenerator';
import { useEffect, useState } from 'react';
import './QuestionView.css';
import React from "react";
import Countdown from "react-countdown";
import {useTranslation} from "react-i18next";

function QuestionView(){
    const questionGenerator = new QuestionGenerator();
    const [numQuestion, setnumQuestion] = useState(-1);
    const [questions, setQuestions] = useState([]);
    const[t, i18n] = useTranslation("global");

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
        <QuestionComponent t={t} questions={questions} numQuestion={numQuestion} handleClick={handleClick}/> :
        <h1>Please Wait a bit...</h1> }
    </div>);
}

function QuestionComponent({questions, numQuestion, handleClick, t}){
    const renderer = ({seconds, completed }) => {
        if (completed) {
            
            return <span>{t("questionView.end_countdown")}</span>; // Rendered when countdown completes
        } else {
            return <span>{seconds} {t("questionView.seconds")}</span>; // Render countdown
        }
    };
    
    return (
        <>
        <div className='topPanel'>
            <h2>{questions[numQuestion].getQuestion()}</h2>
                <div className="countdown">
                            <Countdown date={Date.now() + 10000} renderer={renderer} />
                </div>
        </div>
        <div className="answerPanel">
            {questions[numQuestion].getAnswers().map((item, index) => (
                <Answer key={index} text={item} onClick={handleClick}/>
            ))}
                
        </div>
        <p>{t("questionView.question_counter")} {numQuestion}</p>
        </>
    );
}

function Answer({text, onClick}){
    return (
        <button className="answerButton" onClick={onClick}>{text}</button>
    );
}

export default QuestionView;