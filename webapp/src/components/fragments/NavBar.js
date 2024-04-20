import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import "../../custom.css";
import { useTranslation } from "react-i18next";
import { useUserContext } from '../loginAndRegistration/UserContext';


function Navbar() {

  const [t, i18n] = useTranslation("global");
  const [anchorEl, setAnchorEl] = useState(null);
  const { user } = useUserContext();

  const handleLanguageMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    handleLanguageMenuClose();
  };

  return (
    <div className="navbar-container">
      <div className='left-nav'>
      <Profile />
      <Link to="/home" className="home-button">
      <h1 className='navbar-text'>{t("navBar.title")}</h1>
      </Link>
      </div>
      <div className='right-nav'>
        <button className="language-button" onClick={handleLanguageMenuOpen}>{t("navBar.language")}</button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleLanguageMenuClose}
        >
          <MenuItem onClick={() => changeLanguage("en")}> {t("navBar.en")}</MenuItem>
          <MenuItem onClick={() => changeLanguage("es")}> {t("navBar.es")}</MenuItem>
          <MenuItem onClick={() => changeLanguage("tk")}> {t("navBar.tk")}</MenuItem>
        </Menu>
        <Help />
        {user != null ? (
          <p>{user.username}</p>
          ) : null}
      </div>
    </div>
  );
}

function Profile() {
  return (
    <Link to="/home" className="home-button">
      <img src="/logo.jpg" alt="App logo" />    
    </Link>
  );
}

function Help() {
  return (
    <Link to="/instructions" className="help-button">
      <img src="/help.png" alt="Help" />
    </Link>
  );
}

export default Navbar;
