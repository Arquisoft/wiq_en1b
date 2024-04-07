import QuestionGenerator from './QuestionGenerator';
import CreationHistoricalRecord from './CreationHistoricalRecord';
import { useEffect, useState } from 'react';
import "../../custom.css";
import React from "react";
import Countdown from 'react-countdown';
import {useTranslation} from "react-i18next";
import $ from 'jquery'; 
import RecordList from '../HistoricalData/RecordList';
import ButtonHistoricalData from "../HistoricalData/ButtonHistoricalData";
import { useUserContext } from '../loginAndRegistration/UserContext'; 

const creationHistoricalRecord = new CreationHistoricalRecord();
const questionGenerator = new QuestionGenerator();
var points = 0;
function QuestionView(){
    const [numQuestion, setnumQuestion] = useState(-1);
    const [questions, setQuestions] = useState([]);
    const[t, i18n] = useTranslation("global");
    const {user} = useUserContext();

    const generateQuestions = async (numQuestion) => {
        if (numQuestion < 0) {
            try {
                var generatedQuestions = await questionGenerator.generateQuestions(i18n.language);
                setQuestions(generatedQuestions);
                setnumQuestion(0);
            } catch (error) {
                //Como hacer que funcione esto
                console.log(error);
            }
            
        }
    }

    function revealColorsForAnswers(){
        let colorCorrectAnswer='#6EF26E';//green
        let colorIncorrectAnswer='#FF6666'; //red
        $('.answerButton').each(function() {
            var dataValue = $(this).attr('data-value');
            if (dataValue === false || dataValue === "false")
                $(this).css('background-color', colorIncorrectAnswer); // Cambia el color de fondo del botón actual a rojo

            else{
                $(this).css({
                    'background-color': colorCorrectAnswer,
                    'text-decoration': 'underline'// Underline the text of the button for correct answers
                });
            }
            $(this).css('pointer-events', 'none');
            });

    }
    function setColorsBackToNormal() {
        let colorOriginal = '#9f97ff';
        $('.answerButton').each(function() {
            $(this).css({
                'background-color': colorOriginal,
                'text-decoration': 'none', // Remove underline
                'pointer-events': 'auto'
            });
        });
    }
    function computePointsForQuestion(correctAnswer, answerGiven){
        if(answerGiven==correctAnswer){
            points+=100;
        }else if(points-50>=0){
            points-=50;
        }else{
            points = 0;
        }
    }
    function handleClick(text){
        //create the record to record the response
        creationHistoricalRecord.addQuestion(questions[numQuestion].getQuestion(),
                                        questions[numQuestion].getAnswers(),
                                        text,
                                        questions[numQuestion].getCorrectAnswer(),
                                        numQuestion);
        //compute the points for the answer given
        computePointsForQuestion(questions[numQuestion].getCorrectAnswer(), text);
        
        //reveal answer to user for 1 sec
        revealColorsForAnswers();
        setTimeout(function() {
            //after one second set colors back to normal
            setColorsBackToNormal();
            //sum one to the number of questions
            setnumQuestion(numQuestion + 1);
            
            //Last question sends the record
            if(!(numQuestion < questions.length - 1)){
                creationHistoricalRecord.setDate(Date.now());
                creationHistoricalRecord.setPoints(points);
                creationHistoricalRecord.sendRecord(user.username);
            }
        }, 1000);
        
    }

    useEffect(() => {generateQuestions(numQuestion)}, []);
    
    return (
    <div className="question-view-container">
        {numQuestion >= 0 ? 
        <QuestionComponent t={t} questions={questions} numQuestion={numQuestion} handleClick={handleClick} points={points}/> :
        <h1>{t("questionView.no_questions_message")}</h1> }
    </div>);
}

function QuestionComponent({questions, numQuestion, handleClick, t, points}){


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
                <div className='questionContainer'>
               
                    <div className='topPanel'>
                        <h2>{questions[numQuestion].getQuestion()}</h2>
                        <div className="countdown">
                            <Countdown key={numQuestion} date={Date.now()+10000} renderer={renderer} onComplete={handleClick.bind(this,"no-answer")} />
                        </div>
                    </div>
                    <div className="answerPanel">
                        {questions[numQuestion].getAnswers().map((item, index) => (
                            <Answer key={index} text={item} onClick={handleClick.bind(this,item)} dataValue={questions[numQuestion].isCorrect(item)}/>
                        ))}
                    </div>
                    <div className='bottomPanel'>
                        <p>{t("questionView.question_counter")} {numQuestion+1}</p>
                        <p>{points} {t("questionView.point")}</p>
                    </div>
                 </div>
                
            ) : (
                <>
                    <h2>{t("questionView.finished_game")} </h2>
                    <p>{points} {t("questionView.point")}</p>
                    <ul>< RecordList record={creationHistoricalRecord.getRecord().game}/></ul>
                    <ButtonHistoricalData t={t} />
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