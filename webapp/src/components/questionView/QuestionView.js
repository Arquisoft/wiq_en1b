import QuestionGenerator from './QuestionGenerator';
import CreationHistoricalRecord from './CreationHistoricalRecord';
import { useEffect, useState } from 'react';
import "../../custom.css";
import React from "react";
import Countdown from 'react-countdown';
import {useTranslation} from "react-i18next";
import $ from 'jquery'; 

function QuestionView(){
    const questionGenerator = new QuestionGenerator();
    const creationHistoricalRecord = new CreationHistoricalRecord();
    const [numQuestion, setnumQuestion] = useState(-1);
    const [questions, setQuestions] = useState([]);
    const[t] = useTranslation("global");


    const generateQuestions = async (numQuestion) => {
        if (numQuestion < 0) {
            try {
                var generatedQuestions = await questionGenerator.generateQuestions();
                setQuestions(generatedQuestions);
                setnumQuestion(0);
            } catch (error) {
                //Como hacer que funcione esto
                console.log(error.response);
            }
            
        }
    }

    function revealColorsForAnswers(){
        let colorCorrectAnswer='green';
        let colorIncorrectAnswer='red'; 
        $(document).ready(function() {
            $('.answerButton').each(function() {
                var dataValue = $(this).data('value');
                if (dataValue === false || dataValue === "false")
                    $(this).css('background-color', colorIncorrectAnswer); // Cambia el color de fondo del botón actual a rojo
                else{
                    $(this).css('background-color', colorCorrectAnswer);
                }
                });
        });

    }
    function setColorsBackToNormal() {
        let colorOriginal = '#9f97ff';
        $(document).ready(function() {
            $('.answerButton').each(function() {
                $(this).css('background-color', colorOriginal);
            });
        });
    }
    
    function handleClick(item){
        //addQuestion(statement, answers, answerGiven, correctAnswer) {
        creationHistoricalRecord.addQuestion(questions[numQuestion].getQuestion(),
                                             questions[numQuestion].getAnswers(),
                                            item,
                                            questions[numQuestion].getCorrectAnswer());
        console.log(creationHistoricalRecord.getRecord());
        revealColorsForAnswers();
        setTimeout(function() {
            setColorsBackToNormal();
            setnumQuestion(numQuestion + 1);
        }, 1000);
        
    }

    useEffect(() => {generateQuestions(numQuestion)}, []);
    
    return (
    <div className="question-view-container">
        {/*Nav*/}
        {numQuestion >= 0 ? 
        <QuestionComponent t={t} questions={questions} numQuestion={numQuestion} handleClick={handleClick} /> :
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
            {numQuestion < questions.length ? (
                <>
                    <div className='topPanel'>
                        <h2>{questions[numQuestion].getQuestion()}</h2>
                        <div  className="countdown">
                            <Countdown key={numQuestion} date={Date.now()+4000} renderer={renderer} onComplete={handleClick("no-answer")} />
                        </div>
                    </div>
                    <div className="answerPanel">
                        {questions[numQuestion].getAnswers().map((item, index) => (
                            <Answer key={index} text={item} onClick={handleClick(item)} dataValue={questions[numQuestion].isCorrect(item)}/>
                        ))}
                    </div>
                    <p>{t("questionView.question_counter")} {numQuestion}</p>
                </>
            ) : (
                <>
                    <h2>{t("questionView.finished_game")} </h2>
                    <p>500 Points</p>
                    
                </>
            )}
        </>
    );
    
}

function Answer({text, onClick, dataValue}){
    return (
        <button className="answerButton" onClick={onClick} data-value={dataValue}>{text}</button>
    );
}

export default QuestionView;