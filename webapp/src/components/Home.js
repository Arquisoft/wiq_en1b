import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import AddUser from './AddUser';
import Login from './Login';
import './Home.css';

function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [showHome, setShowHome] = useState(true);

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowHome(false);
  };

  const handleRegisterClick = () => {
    setShowHome(false); // Ocultar Home
    setShowLogin(false); // Ocultar Login si estaba visible
  };


  return (
    <div>
      {!showLogin && showHome && (
        <div>
          <Typography variant="h3" align="center">Welcome to WIQ!</Typography>
          <Button variant="contained" onClick={handleLoginClick}>Login</Button>
          <p></p>
          <Link name="gotoregister" component="button" variant="body2" onClick={handleRegisterClick}>
            Don't have an account? Register here.
          </Link>
        </div>
      )}
      {showLogin && !showHome && <Login />}
      {!showLogin && !showHome && <AddUser />} 
    </div>
  );
}

export default Home;
