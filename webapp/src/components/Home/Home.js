import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import AddUser from '../AddUser';
import Login from '../Login';
import Instructions from '../Instructions';
import './Home.css';

function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [showHome, setShowHome] = useState(true);
  const [showInstructions, setShowInstructions] = useState(false);



  const handleLoginClick = () => {
    setShowLogin(true);
    setShowHome(false);
  };

  const handleRegisterClick = () => {
    setShowHome(false); 
    setShowLogin(false); 
  };

  const handleInstructions = () => {
    setShowHome(false); 
    setShowLogin(false); 
    setShowInstructions(true);
  };


  return (
    <div>
      {!showLogin && showHome && !showInstructions &&(
        <div>
          <Typography variant="h3" align="center">Welcome to WIQ!</Typography>
          <Button variant="contained" onClick={handleInstructions}>How to play?</Button>
          <p></p>
          {/* Button to the login view */}
          <Button variant="contained" onClick={handleLoginClick}>Login</Button>
          <p></p>
          {/* Link to the registration view */}
          <Link name="gotoregister" component="button" variant="body2" onClick={handleRegisterClick}>
            Don't have an account? Register here.
          </Link>
          <p></p>
        </div>
      )}
      {/* Show login and do not show home  */}
      {showLogin && !showHome && !showInstructions && <Login />}
      {/* Show addUser and do not show home neither addUser*/}
      {!showLogin && !showHome && !showInstructions && <AddUser />} 
      {/* Show instructions*/}
      {!showLogin && !showHome && showInstructions && <Instructions />} 
    </div>
  );
}

export default Home;
