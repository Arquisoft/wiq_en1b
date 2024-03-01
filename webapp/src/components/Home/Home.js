import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from 'react-router-dom';

import "./Home.css";

function Home() {

  return (
    <div>
      <Typography variant="h3" align="center">
        Welcome to WIQ!
      </Typography>
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


}


function ButtonHowToPlay() {
  return (
    <Link to="/instructions" className="button-instructions">
        <Button variant="contained">
        How to play?
      </Button>
      </Link>
  );

}

function ButtonLogin() {
  return (
    <Link to="/login" className="button-login">
        <Button variant="contained">Login</Button>
      </Link>
  );

}

function LinkRegister() {
  return (
    <Link
        to="/addUser"
        component="button"
        variant="body2"
      >
        Don't have an account? Register here.
      </Link>
  );

}
export default Home;
