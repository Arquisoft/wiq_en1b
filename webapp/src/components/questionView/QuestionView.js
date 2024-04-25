import QuestionGenerator from './QuestionGenerator';
import CreationHistoricalRecord from './CreationHistoricalRecord';
import "../../custom.css";
import React, { useState, useEffect } from "react";
import Countdown from 'react-countdown';
import {useTranslation} from "react-i18next";
import $ from 'jquery'; 
import RecordList from '../HistoricalData/RecordList';
import ButtonHistoricalData from "../HistoricalData/ButtonHistoricalData";
import Cookies from 'js-cookie'
import BackButtonToGameMenu from '../fragments/BackButtonToGameMenu';

const creationHistoricalRecord = new CreationHistoricalRecord();
const questionGenerator = new QuestionGenerator();
var points = 0;
function QuestionView({type= "COMPETITIVE", amount=5}){
    const [numQuestion, setnumQuestion] = useState(-1);
    const [questions, setQuestions] = useState(null);
    const[t, i18n] = useTranslation("global");
    const cookie = JSON.parse(Cookies.get('user'))    
    // const [audio] = useState(new Audio('/tictac.mp3'));


    //To stop tiktak sound when changing of page
    // useEffect(() => {
    //     return () => {
    //         audio.pause(); 
    //     };
    // }, []);

    const generateQuestions = async (numQuestion) => {
        if (numQuestion < 0) {
            try {
                
                var generatedQuestions = await questionGenerator.generateQuestions(i18n.language, type, amount, cookie.token);
                setQuestions(generatedQuestions);
                points=0;
                setnumQuestion(0);
            } catch (error) {
                //Como hacer que funcione esto
                console.log(error);
            }
            
        }
    }

    function revealColorsForAnswers(correctAnswer, answerGiven){
        let colorCorrectAnswer = '#6EF26E'; // verde
        let colorIncorrectAnswer = '#FF6666'; // rojo
        let audioCorrect = new Audio('/correct.mp3'); 
        let audioIncorrect = new Audio('/incorrect.mp3'); 
    
        $('.answerButton').each(function() {
            var dataValue = $(this).attr('data-value');
            if (dataValue === false || dataValue === "false") {
                $(this).css('background-color', colorIncorrectAnswer); // Cambia el color de fondo del botón actual a rojo
            } else {
                $(this).css({
                    'background-color': colorCorrectAnswer,
                    'text-decoration': 'underline' // Subraya el texto del botón para respuestas correctas
                });
            }
            if(answerGiven===correctAnswer){
                // audio.pause();
                audioCorrect.play(); // Reproduce el sonido de respuesta incorrecta
            }
            else{
                // audio.pause();
                audioIncorrect.play(); // Reproduce el sonido de respuesta correcta
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
        if(answerGiven===correctAnswer){
            points+=100;
            // audio.pause();
        }else if(points-50>=0){
            points-=50;
            // audio.pause();
        }else{
            points = 0;
        }
    }
    function handleClick(text){
        // Detener el síntesis de voz
        if(window.speechSynthesis.speaking)
            window.speechSynthesis.cancel();
    
        //create the record to record the response
        creationHistoricalRecord.addQuestion(questions[numQuestion].getQuestion(),
                                        questions[numQuestion].getAnswers(),
                                        text,
                                        questions[numQuestion].getCorrectAnswer(),
                                        numQuestion);
        //compute the points for the answer given
        computePointsForQuestion(questions[numQuestion].getCorrectAnswer(), text);
        
        //reveal answer to user for 1 sec
        revealColorsForAnswers(questions[numQuestion].getCorrectAnswer(), text);
        setTimeout(function() {
            //after one second set colors back to normal
            setColorsBackToNormal();
            //sum one to the number of questions
            setnumQuestion(numQuestion + 1);
            
            //Last question sends the record
            if(!(numQuestion < questions.length - 1)){
                // audio.pause();
                creationHistoricalRecord.setCompetitive(type === 'COMPETITIVE');
                creationHistoricalRecord.setDate(Date.now());
                creationHistoricalRecord.setPoints(points);
                creationHistoricalRecord.sendRecord(cookie.username, cookie.token);
            }
        }, 1000);
        
    }
    
    if(questions === null)
        generateQuestions(numQuestion)

    
    return (
    <div className="question-view-container">
        {numQuestion >= 0 ? 
        <QuestionComponent t={t} questions={questions} numQuestion={numQuestion} handleClick={handleClick} points={points} /*audio = {audio}*/ language={i18n.language}/> :
        <h1>{t("questionView.no_questions_message")}</h1> }
    </div>);
}

function QuestionComponent({questions, numQuestion, handleClick, t, points, /*audio,*/ language}){

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === 's') {
                speakQuestionAndAnswers();
            } else {
                const answerIndex = parseInt(event.key) - 1;
                if (!isNaN(answerIndex) && answerIndex >= 0 && answerIndex < questions[numQuestion].getAnswers().length) {
                
                    handleClick(questions[numQuestion].getAnswers()[answerIndex]);
                }
            }
        };

        window.addEventListener("keypress", handleKeyPress);
        
        return () => {
            window.removeEventListener("keypress", handleKeyPress);
        };
    }, [numQuestion, questions, handleClick]);

    //To stop the voice when changing of page
    useEffect(() => {
        const handleBeforeUnload = () => {
            if(window.speechSynthesis.speaking)
                window.speechSynthesis.cancel();
        };
    
        window.addEventListener("beforeunload", handleBeforeUnload);
    
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);
    const speakQuestionAndAnswers = () => {
        // speakQuestion(questions[numQuestion].getQuestion());
        speakAnswers(questions[numQuestion].getAnswers());
    };

    

    const speakAnswers = (answers) => {
        const speech = new SpeechSynthesisUtterance();
        speech.lang = language;
        let concatenatedAnswers = Array.isArray(answers) ? answers.map((answer, index) => `${index + 1}. ${answer}`).join(". ") : ''; 

        getVoicesForLanguage(language)
            .then(voices => {
                // const voice = voices.find(voice => voice.lang === language);
                // speech.voice = voice || voices[0]; // If there is no voice for the lang, choose the first one
                speech.text = concatenatedAnswers;
                window.speechSynthesis.speak(speech);
            })
            .catch(error => {
                console.error("Error al obtener las voces para el idioma:", error);
            });
    };
    
    // Función para obtener las voces disponibles para un idioma
    const getVoicesForLanguage = (language) => {
        return new Promise((resolve, reject) => {
            const speech = new SpeechSynthesisUtterance();
            speech.text = questions[numQuestion].getQuestion();
            speech.lang = language;
    
            speech.addEventListener("error", reject); 
    
            speech.addEventListener("end", () => {
                const voices = window.speechSynthesis.getVoices();
                if (voices.length > 0) 
                    resolve(voices);
            });
    
            window.speechSynthesis.speak(speech); 
        });
    };
    
    

    const renderer = ({seconds, completed }) => {
        if (completed) {
            // audio.pause();
            return <span>{t("questionView.end_countdown")}</span>; // Rendered when countdown completes
        } else {
            // if (audio.paused) {
            //     audio.loop = true; // Loop of tiktak
            //     audio.play();
            // }
            return <span>{seconds} {t("questionView.seconds")}</span>; // Render countdown
        }
    };
    
    return (
        <>
            {numQuestion < questions.length ? (
                <div className='questionContainer'>
               
                    <div className='topPanel'>
                        <h2>{questions[numQuestion].getQuestion()} <button className="altavoz" onClick={speakQuestionAndAnswers}>🔊</button></h2>
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
                    <BackButtonToGameMenu t={t}/>
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