import React from 'react';
import '../custom.css';
import {useTranslation} from "react-i18next";



function Instructions() {

  const[t, i18n] = useTranslation("global");

  return (
    <div>
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
    </div>
  );
}


export default Instructions;
