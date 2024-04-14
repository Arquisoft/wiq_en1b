import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import "../../custom.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


function Navbar() {
  const navigate = useNavigate();
  const [t, i18n] = useTranslation("global");
  const [anchorEl, setAnchorEl] = useState();
  const [anchorUser, setAnchorUser] = useState();

  const handleLanguageMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setAnchorEl(null);
  };

  const handleUserMenuOpen = (event) => {
    setAnchorUser(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorUser(null);
  };

  const removeCookie = () => {
    Cookies.remove('user');
    navigate('/home')
  };

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    handleLanguageMenuClose();
  };

  return (
    <div className="navbar-container">
      <div className='left-nav'>
      <Profile />
        <h1 className='navbar-text'>{t("navBar.title")}</h1>
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

        {Cookies.get('user') ? (
          <>
          <button className="user-button" onClick={handleUserMenuOpen}>{ JSON.parse(Cookies.get('user')).username}</button>
          <Menu
            anchorUser={anchorUser}
            open={Boolean(anchorUser)}
            onClose={handleUserMenuClose}
          >
            <MenuItem onClick={() => removeCookie()}> {t("navBar.logout")}</MenuItem>
          </Menu>
          </>
        ) : null}
        
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
