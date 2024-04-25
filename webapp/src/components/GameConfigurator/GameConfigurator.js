import React, { useState } from 'react';

import {useTranslation} from "react-i18next";
import { Link } from "react-router-dom";
import QuestionView from '../questionView/QuestionView'
import BackButtonToGameMenu from '../fragments/BackButtonToGameMenu';

function GameConfigurator(){
    const [tipoPregunta, setTipoPregunta] = useState('POPULATION');
    const [numeroPreguntas, setNumeroPreguntas] = useState(5);
    const [clickedForNewGame, setClickedForNewGame]= useState(false);
    const[t] = useTranslation("global");

    function handleClick() {
      setClickedForNewGame(true);
    }

    function handleClickRandomize() {
      const options = ['ALL', 'POPULATION', 'CAPITAL', 'LANGUAGE', 'SIZE', 'HEAD_OF_GOVERMENT'];
      const randomOptionIndex = Math.floor(Math.random() * options.length);
      setTipoPregunta(options[randomOptionIndex]);
  
      const randomNumQuestions = Math.floor(Math.random() * 20) + 1; // Random number between 1 and 20
      setNumeroPreguntas(randomNumQuestions);
    }
    return (
      clickedForNewGame ? <QuestionView type={tipoPregunta} amount={numeroPreguntas} /> :
      <div className='GameConfiguratorDiv'>
        <BackButtonToGameMenu t={t} />
        <h1>{t("gameConfigurator.game_config")}</h1>
        <h2>{t("gameConfigurator.custo_game")}</h2>
        <ButtonRandomizeCustom t={t} handleClick={handleClickRandomize} />
        <label for="select">{t("gameConfigurator.type_quest")}</label>
        <select id="select" className="select-style" value={tipoPregunta} onChange={(e) => setTipoPregunta(e.target.value)}>
          <option value="ALL">{t("gameConfigurator.option_all")}</option>
          <option value="POPULATION">{t("gameConfigurator.option_population")}</option>
          <option value="CAPITAL">{t("gameConfigurator.option_capital")}</option>
          <option value="LANGUAGE">{t("gameConfigurator.option_language")}</option>
          <option value="SIZE">{t("gameConfigurator.option_size")}</option>
          <option value="HEAD_OF_GOVERMENT">{t("gameConfigurator.option_head_of_goverment")}</option>
        </select>
        <br></br>
  
        <label for="spinner">{t("gameConfigurator.num_quest")}</label>
        {/* Spinner para seleccionar el número de preguntas */}
        <input id="spinner" className='spinner-style'
          type="number" 
          value={numeroPreguntas} 
          onChange={(e) => setNumeroPreguntas(e.target.value)} 
          min="1" max="20"
        />
        <br></br>
        <ButtonCustomized t={t} handleClick={handleClick}/>
        <br></br>
        <hr class="hr-style"></hr>
        <br></br>
        <h2>{t("gameConfigurator.competi_game")}</h2>
        <p>{t("gameConfigurator.rules_competi")}</p>
        {/* Botones para jugar un juego personalizado o competitivo */}
        <ButtonCompetitive t={t} />
        
      </div>
    );
}

function ButtonRandomizeCustom({t,handleClick}){
  return (
    <button className="buttonRandomize" onClick={handleClick}>{t("gameConfigurator.randomize")}</button>
  );

}

function ButtonCustomized({t,handleClick}) {
  return (
    <button className="linkButton"  id="customized" onClick={handleClick}>{t("gameConfigurator.play_custom")}</button>
  );
}


function ButtonCompetitive({t}){

     return (
      <Link className="linkButton" id="competitive" to="/questions">
        <h3>{t("gameConfigurator.play_competi")}</h3>
      </Link>
    );
}


export default GameConfigurator;
