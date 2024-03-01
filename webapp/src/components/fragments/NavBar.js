// NavBar.js
import React from 'react';
import Typography from "@mui/material/Typography";
import { Link } from 'react-router-dom';
import "./NavBar.css";

function Navbar() {
  return (
    <div className="navbar-container">
      <Profile />
      <Typography variant="h6" gutterBottom className="navbar-text">
        Know and Win!
      </Typography>
      <Help />
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
