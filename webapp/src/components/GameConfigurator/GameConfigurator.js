import React, { useState } from 'react';

import {useTranslation} from "react-i18next";
import { Link } from "react-router-dom";
import QuestionView from '../questionView/QuestionView'

function GameConfigurator(){
    const [tipoPregunta, setTipoPregunta] = useState('POPULATION');
    const [numeroPreguntas, setNumeroPreguntas] = useState(5);
    const [clickedForNewGame, setClickedForNewGame]= useState(false);
    const[t, i18n] = useTranslation("global");

    function handleClick() {
      setClickedForNewGame(true);
    }
    return (
      clickedForNewGame ? <QuestionView type={tipoPregunta} amount={numeroPreguntas} /> :
      <div>
        <h1>{t("gameConfigurator.game_config")}</h1>
        
        <label>{t("gameConfigurator.type_quest")}</label>
        <select value={tipoPregunta} onChange={(e) => setTipoPregunta(e.target.value)}>
          <option value="POPULATION">{t("gameConfigurator.option_population")}</option>
          <option value="CAPITAL">{t("gameConfigurator.option_capital")}</option>
          <option value="LANGUAGE">{t("gameConfigurator.option_language")}</option>
          <option value="SIZE">{t("gameConfigurator.option_size")}</option>
        </select>
        <br></br>
  
        <label>{t("gameConfigurator.num_quest")}</label>
        {/* Spinner para seleccionar el número de preguntas */}
        <input 
          type="number" 
          value={numeroPreguntas} 
          onChange={(e) => setNumeroPreguntas(e.target.value)} 
          min="1" max="20"
        />
        <br></br>
        <ButtonCustomized t={t} handleClick={handleClick}/>
        <br></br>
        <p>{t("gameConfigurator.rules_competi")}</p>
        {/* Botones para jugar un juego personalizado o competitivo */}
        <ButtonCompetitive t={t} />
      </div>
    );
}


function ButtonCustomized({t,handleClick}) {
  
  return (
    <button onClick={handleClick}>{t("gameConfigurator.play_custom")}</button>
  );
}


function ButtonCompetitive({t}){
     //llamar setTipoPregunta COMPETITIVE
     return (
      <Link className="linkButton" to="/questions">
        <h3>{t("gameConfigurator.play_competi")}</h3>
      </Link>
    );
}


export default GameConfigurator;
