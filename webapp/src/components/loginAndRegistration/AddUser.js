import React from "react";
import "../../custom.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import zxcvbn from "zxcvbn";

const AddUser = () => {
  const navigate = useNavigate();
  const apiUrl = (process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000') + "/adduser";
  const { t } = useTranslation("global");

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [passwordStrengthText, setPasswordStrengthText] = useState('');
  const [submitErrors, setSubmitErrors] = useState([]);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newSubmitErrors = []; 
    
    //Validations

    if(!validateEmail(email)){
      //User put a wrong format email
      newSubmitErrors.push("addUser.error_wrong_email_format")
    }

    if(password !== repeatPassword){
      //User put the same password
      newSubmitErrors.push("addUser.error_passwords_no_match");
    }
    if(/\s/.test(password)){
      //User put spaces in password
      newSubmitErrors.push("addUser.error_password_spaces");
    }
    if(password.length < 8){
      //Password too short
      newSubmitErrors.push("addUser.error_password_minimum_length");
    }

    if(password.length > 64){
      //Password too long
      newSubmitErrors.push("addUser.error_password_maximum_length");
    } 

    if(/\s/.test(username)){
      //Spaces in username
      newSubmitErrors.push("addUser.error_username_spaces");
    }

    setSubmitErrors(newSubmitErrors);

    if (newSubmitErrors.length === 0) {
      try {
        const response = await axios.post(apiUrl, { email, username, password });
        navigate('/login');
      } catch (error) {
        if (error.response.data.error === "Username already in use") {
          setSubmitErrors(["addUser.error_username_in_use"]);
        }
        console.error("Error adding user:", error);
      }
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    const newStrength = zxcvbn(newPassword);

    switch(newStrength.score){
      case 0:
        setPasswordStrengthText("addUser.very_weak_password");
        break;
      case 1:
        setPasswordStrengthText("addUser.very_weak_password");
        break;
      case 2:
        setPasswordStrengthText("addUser.weak_password");
        break;
      case 3:
        setPasswordStrengthText("addUser.good_password");
        break;
      case 4:
        setPasswordStrengthText("addUser.strong_password");
        break;
      default:
        setPasswordStrengthText("addUser.very_weak_password");
        break;
    }
    setPasswordStrength(newStrength);
  };

  const showErrors = () => {
    if (submitErrors.length > 0) {
      return submitErrors.map((error, index) => (
        <p key={index} style={{ color: 'red', margin: 0 }}>{t(error)}</p>
      ));
    }
    return null;
  };

  return (
    <div className="general">
      <div className="card">
        <div className="card2">
          <form className="form" onSubmit={handleSubmit}>
            <h1>{t("addUser.title")}</h1>
            {showErrors()}
            <div className="input-box">
              <p>{t("addUser.email_placeholder")}: </p>
              <input
                name="email"
                type="text"
                placeholder={t("addUser.email_placeholder")}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-box">
              <p>{t("addUser.username_placeholder")}: </p>
              <input
                name="username"
                type="text"
                placeholder={t("addUser.username_placeholder")}
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input-box-password-register">
              <p>{t("addUser.password_placeholder")}: </p>
              <input
                name="password"
                type="password"
                placeholder={t("addUser.password_placeholder")}
                required
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="password-strength-meter">
              <span>{t(passwordStrengthText)}</span>
              <progress
                value={passwordStrength ? passwordStrength.score : 0}
                max="4"
              />
            </div>
            <div className="input-box">
              <p>{t("addUser.repeat_password_placeholder")}: </p>
              <input
                name="repeat_password"
                type="password"
                placeholder={t("addUser.repeat_password_placeholder")}
                required
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
              />
            </div>
            <button type="submit">{t("addUser.register_button")}</button>

            <LinkLogin />
          </form>
        </div>
      </div>
    </div>
  );
};

function LinkLogin() {
  const { t } = useTranslation("global");
  return (
    <Link to="/login" className="button-login">
      {t("addUser.login_link")}
    </Link>
  );
}

export default AddUser;
