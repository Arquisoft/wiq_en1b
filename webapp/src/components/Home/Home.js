import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from 'react-router-dom';
import "./Home.css";


import "./Home.css";

function Home() {

  return (
    <div className="wrapper">
      <h1 variant="h3" align="center">
        Welcome to WIQ!
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


}


function ButtonHowToPlay() {
  return (
    <Link to="/instructions" className="button-instructions">
        <Button>
        How to play?
      </Button>
      </Link>
  );

}

function ButtonLogin() {
  return (
    <Link to="/login" className="button-login">
        <Button>Login</Button>
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
        Don't have an account? Register here.
      </Link>
  );

}
export default Home;
