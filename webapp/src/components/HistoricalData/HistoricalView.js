import React, { useState } from 'react';
import {useTranslation} from "react-i18next";
import HistoryRecordRetriever from './HistoryRecordRetriever';
import Cookies from 'js-cookie'
import BackButtonToGameMenu from '../fragments/BackButtonToGameMenu';

import RecordList from './RecordList';

const retriever = new HistoryRecordRetriever();


export default function HistoricalView() {
  const [records, setRecords]= useState(null);
  const[t] = useTranslation("global");

  const getRecords = async ()=>{
        try {
          let cookie = JSON.parse(Cookies.get('user'))
          var jsonRecords = await retriever.getRecords(cookie.username, cookie.token); 
          var recordsArray = jsonRecords.games;
          setRecords(recordsArray);
        } catch (error) {
        }
  }

  if(records === null)
    getRecords();

  return (
    <div className='globalHistoricalView'>
      <BackButtonToGameMenu t={t}/>
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

