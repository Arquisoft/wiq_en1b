import React from 'react';
import '../custom.css';
import {useTranslation} from "react-i18next";
import { Link } from "react-router-dom";




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
            <ul className='ins_ul'><p>{t("instructions.have_fun")}</p>
              <li>
              {t("instructions.have_fun_p1")}
              </li>
            </ul>
            </article>
           
      </section>
      {/* <Link to="/Home" className="buttonb" variant="body2">
          <button class="button-back">
            
  <div class="button-box">
    <span class="button-elem">
      <svg viewBox="0 0 46 40" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"
        ></path>
      </svg>
    </span>
    <span class="button-elem">
      <svg viewBox="0 0 46 40">
        <path
          d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"
        ></path>
      </svg>
    </span>
  </div>
</button>
            </Link> */}
    </div>
    
  );
}


export default Instructions;
