import React, {useEffect, useState } from 'react';
import {useTranslation} from "react-i18next";
import HistoryRecordRetriever from './HistoryRecordRetriever';
import RecordList from './RecordList';

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
      <button className="historicalButton" onClick={handleClick}>{t("historicalView.game")} : <em>{record.date.toLocaleDateString()} </em> - {record.points} {t("historicalView.points")} </button>
      <ul style={{ display: toggle ? 'block' : 'none' }}>
        <RecordList record={record}/>
      </ul>
    </div>
  );
}