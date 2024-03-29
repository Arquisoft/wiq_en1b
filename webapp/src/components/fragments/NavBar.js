// NavBar.js
import React from 'react';
import Typography from "@mui/material/Typography";
import { Link } from 'react-router-dom';
import "../../custom.css";
import {useTranslation} from "react-i18next";

function Navbar() {

  const[t, i18n] = useTranslation("global");

  return (
    <div className="navbar-container">
      <Profile />
      <Typography variant="h6" gutterBottom className="navbar-text">
      {t("navBar.title")}
      </Typography>
      <div className='right-nav'>
        <button className="en-button" onClick={()=> i18n.changeLanguage("en")}>EN</button>
        <button className="es-button" onClick={()=> i18n.changeLanguage("es")}>ES</button>
        <Help />
      </div>
      
    </div>
  );
}

function Profile() {
  return <img src="/logo.jpg" alt="App logo" />;
}

function Help() {
  return (
    <Link to="/instructions" className="help-button">
      <img src="/help.png" alt="Help" />
    </Link>
  );
}

export default Navbar;
