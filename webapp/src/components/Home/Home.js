import React from "react";
import Button from "@mui/material/Button";
import { Link } from 'react-router-dom';
import "../../custom.css";
import {useTranslation} from "react-i18next";


function Home() {

  const[t, i18n] = useTranslation("global");

  return (
    <div className="wrapper">
      <h1 variant="h3" align="center" className="title-home">
        {t("home.welcome")}
      </h1>
      <div className="buttons-home">
        <ButtonHowToPlay />
        <p></p>
        {/* Button to the login view */}
        <ButtonLogin />
        <p></p>
        {/* Link to the registration view */}
        <LinkRegister />
        <p></p>
      </div>
      
    </div>
  );


  function ButtonHowToPlay() {
    return (
      <Link to="/instructions" className="button-instructions">
        <button class="button type1">
          <span class="btn-txt">  {t("home.how_to_play")}</span>
        </button>
      </Link>
    );
  
  }

  
function ButtonLogin() {
  return (
    <Link to="/login" className="button-login">
        <button class="button type1">
          <span class="btn-txt"> {t("home.login")}</span>
        </button>
      </Link>
  );

}

function LinkRegister() {
  return (
    <Link
        to="/addUser"
        component="button-register"
        variant="body2"
      >
        {t("home.register")}
      </Link>
  );

}
}


export default Home;
