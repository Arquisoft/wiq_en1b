import React, { useState } from 'react';
import {useTranslation} from "react-i18next";
import { Link } from "react-router-dom";

function GameConfigurator(){
    const [tipoPregunta, setTipoPregunta] = useState('');
    const [numeroPreguntas, setNumeroPreguntas] = useState(5);
    const[t, i18n] = useTranslation("global");

    return (
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
          min="1" 
        />
        <br></br>
        <ButtonCustomized t={t} />
        <br></br>
        <p>{t("gameConfigurator.rules_competi")}</p>
        {/* Botones para jugar un juego personalizado o competitivo */}
        <ButtonCompetitive t={t} />
        
  
      </div>
    );
}

function ButtonCustomized({t, type, number}){
    return(
        <button onClick={() => alert('Jugar Juego Personalizado')}>{t("gameConfigurator.play_custom")}</button>
    );
}

function ButtonCompetitive({t}){
     //llamar setTipoPregunta COMPETITIVE
    return(
        <button onClick={() => alert('Jugar Juego Competitivo')}>{t("gameConfigurator.play_competi")}</button>
    );
}


export default GameConfigurator;
