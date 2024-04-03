import React, { useState } from 'react';
import Typography from "@mui/material/Typography";
import { Link } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import "../../custom.css";
import { useTranslation } from "react-i18next";

function Navbar() {

  const [t, i18n] = useTranslation("global");
  const [anchorEl, setAnchorEl] = useState(null);

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
