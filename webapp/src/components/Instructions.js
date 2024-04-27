import React from 'react';
import '../custom.css';
import {useTranslation} from "react-i18next";




function Instructions() {

  const[t] = useTranslation("global");

  return (
    <div className='instrucions_container'>
      
      <h1 className='instructions_title'>{t("instructions.title")}</h1>
     <section>   
      <article>
            <ul className='ins_ul'><p>{t("instructions.objective")}</p>
              <li>
              {t("instructions.objective_p1")}
              </li>
            </ul>
      </article>   
      <article>
            <ul className='ins_ul'><p>{t("instructions.how_to_play")}</p>
                    <li>
                    {t("instructions.how_to_play_p1")}
                    </li>
                    <li>
                    {t("instructions.how_to_play_p2")}
                    </li>
                    <li>
                    {t("instructions.how_to_play_p3")}
                    </li>
                    <li>
                    {t("instructions.how_to_play_p4")}
                    </li>
                    <li>
                    {t("instructions.how_to_play_p5")}
                    </li>
            </ul>
      </article>
      <article>
            <ul className='ins_ul'><p>{t("instructions.personalization")}</p>
                    <li>
                    {t("instructions.personalization_p1")}
                    </li>
                    <li>
                    {t("instructions.personalization_p2")}
                    </li>
            </ul>
      </article>
      <article>
            <ul className='ins_ul'><p>{t("instructions.guest")}</p>
                    <li>
                    {t("instructions.guest_p1")}
                    </li>
                    <li>
                    {t("instructions.guest_p2")}
                    </li>
                    <li>
                    {t("instructions.guest_p3")}
                    </li>
            </ul>
      </article>
      <article>
      <ul className='ins_ul'><p>{t("instructions.scoring")}</p><li>
      {t("instructions.scoring_p1")}</li>
              <li>
              {t("instructions.scoring_p2")}
              </li>
            </ul>
      </article>
          <article>
          <ul className='ins_ul'><p>{t("instructions.time_limit")}</p><li>
          {t("instructions.time_limit_p1")}
              </li></ul>
          </article>
          <article>
            <ul className='ins_ul'><p>{t("instructions.voice")}</p>
              <li>
              {t("instructions.voice_p1")}
              </li>
              <li>
              {t("instructions.voice_p2")}
              </li>
              <li>
              {t("instructions.voice_p3")}
              </li>
              <li>
              {t("instructions.voice_p4")}
              </li>
            </ul>
            </article>
            <article>
            <ul className='ins_ul'><p>{t("instructions.have_fun")}</p>
              <li>
              {t("instructions.have_fun_p1")}
              </li>
            </ul>
            </article>
            
      </section>
 
    </div>
    
  );
}


export default Instructions;
