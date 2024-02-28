import React from 'react';
import Typography from '@mui/material/Typography';
import './NavBar.css'; 

function Navbar() {
  return (
    <div className="navbar-container"> 
      <Profile />
      <Typography variant="h6" gutterBottom className="navbar-text"> 
        Know and Win!
      </Typography>
    </div>
  );
}

function Profile() {
  return (
    <img
      src="/logo.jpg"
      alt="App logo"
    />
  );
}


export default Navbar;
