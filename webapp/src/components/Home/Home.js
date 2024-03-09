import React from "react";
import Button from "@mui/material/Button";
import { Link } from 'react-router-dom';
import "../../custom.css";
import {useTranslation} from "react-i18next";


function Home() {

  const[t, i18n] = useTranslation("global");

  return (
    <div className="wrapper">
      <h1 variant="h3" align="center">
        {t("home.welcome")}
      </h1>
      <ButtonHowToPlay />
      <p></p>
      {/* Button to the login view */}
      <ButtonLogin />
      <p></p>
      {/* Link to the registration view */}
      <LinkRegister />
      <p></p>
    </div>
  );


  function ButtonHowToPlay() {
    return (
      <Link to="/instructions" className="button-instructions">
          <Button>
          {t("home.how_to_play")}
        </Button>
        </Link>
    );
  
  }

  
function ButtonLogin() {
  return (
    <Link to="/login" className="button-login">
        <Button> {t("home.login")}</Button>
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
