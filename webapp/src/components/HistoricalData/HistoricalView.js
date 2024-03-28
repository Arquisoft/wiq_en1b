import React, {useEffect, useState } from 'react';
import {useTranslation} from "react-i18next";
import HistoryRecordRetriever from './HistoryRecordRetriever';
const retriever = new HistoryRecordRetriever();


export default function HistoricalView() {
  const [records, setRecords]= useState([]);
  const[t] = useTranslation("global");

    const getRecords = async ()=>{
          try {
              var jsonRecords = await retriever.getRecords(); // Obtener el JSON de registros
              var recordsArray = jsonRecords['games'];
              setRecords(recordsArray);
          } catch (error) {
              //Como hacer que funcione esto
              console.log(error.response);
          }
  }
  useEffect(() => {getRecords()}, []);
  return (
    <div className='globalHistoricalView'>
      {records.map((record, index) => (
        <HistoricalGameElement key={index} record={record} t={t} />
      ))}
    </div>
  )
}


function HistoricalGameElement({record,t}){
  const [toggle, setToggle] = useState(false);

  function handleClick (){
    setToggle(!toggle);
  };
  
  return (
    <div className='centered-div'>
      <button className="historicalButton" onClick={handleClick}>{t("historicalView.game")} : {record.date.toLocaleDateString()} - {record.points} {t("historicalView.points")} </button>
      <ul style={{ display: toggle ? 'block' : 'none' }}>
      {record.questions.map((question, index) => (<li key={index}>
            <p>{question.question}</p>
            <ul>
              {question.answers.map((answer, answerIndex) => (
                <li key={answerIndex}>
                  {answer}
                  {question.answerGiven === answer && " 👈 "}
                  {question.correctAnswer === answer && " ✅ "}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}