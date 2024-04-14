import React, { useState } from 'react';
import {useTranslation} from "react-i18next";
import HistoryRecordRetriever from './HistoryRecordRetriever';
import { useUserContext } from '../loginAndRegistration/UserContext'; 
import { Link } from "react-router-dom";

import RecordList from './RecordList';

const retriever = new HistoryRecordRetriever();


export default function HistoricalView() {
  const [records, setRecords]= useState(null);
  const[t] = useTranslation("global");
  const {user} = useUserContext();

  const getRecords = async ()=>{
        try {
            var jsonRecords = await retriever.getRecords(user.username); 
            var recordsArray = jsonRecords.games;
            setRecords(recordsArray);
        } catch (error) {
            console.log(error);
        }
  }

  if(records === null)
    getRecords();

  return (
    <div className='globalHistoricalView'>
      <BackButton />
      {(records && records.length !== 0) ? records.map((record, index) => (
        <HistoricalGameElement key={index} record={record} t={t} />
      )): <p>{t("historicalView.no_games_played")}</p>}
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
      <button className="historicalButton" onClick={handleClick}>{t("historicalView.game")} : {
      (new Date(parseInt(record.date))).toLocaleDateString()} - {record.points} {t("historicalView.points")} </button>
      <ul style={{ display: toggle ? 'block' : 'none' }}>
        <RecordList record={record}/>
      </ul>
    </div>
  );
}

function BackButton({t}){
  return(
    <Link className="linkButton" to="/menu">
      <h3>⬅️{t("gameMenu.back")}</h3>
    </Link>
  );
}