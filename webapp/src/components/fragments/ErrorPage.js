import React from 'react';
import {useTranslation} from "react-i18next";

const ErrorPage = () => {
  const{t}= useTranslation("global");
  

  return (
    <div>
      <h1 className='error'>{t("error.error")}</h1>
      <p className='sorry'>{t("error.sorry")}</p>
      <img src="/gatotriste5.jpg" alt="Cat crying"  />    
   
    </div>
  );
}

export default ErrorPage;
