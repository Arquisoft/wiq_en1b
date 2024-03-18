import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "../../custom.css";
import { useTranslation } from "react-i18next";

function Home() {
  const { t, i18n } = useTranslation("global");
  const [language, setLanguage] = useState("en"); 

  const changeLanguage = () => {
    const languages = ["en", "es", "tk"]; 
    const currentIndex = languages.indexOf(language);
    const nextIndex = (currentIndex + 1) % languages.length; 
    const nextLanguage = languages[nextIndex]; 
    i18n.changeLanguage(nextLanguage); 
    setLanguage(nextLanguage); 
    alert(`${t("home.language")}`);
  };

  return (
    <div>
      <input className='input-home' type="radio" name="toggle" id="toggleOpen" value="toggleOpen" />
      <input className='input-home' type="radio" name="toggle" id="toggleClose" value="toggleClose" />
      <figure id="welcomeMessage">
        <figcaption>
          <h1>
            <label htmlFor="toggleOpen" title="Click to Open"></label>
            <label htmlFor="toggleClose" title="Click to Close">✖</label>
            <b>
              W
              <Link to="/instructions" title="How to play">
                <img src="/instrucciones.png" alt="Instructions" style={{ width: "100%", height: "100%" }} />
              </Link>
            </b>
            <b>
              I
              <Link to="/login" title="Login">
              <img src="/login.png" alt="Login" style={{ width: "100%", height: "100%" }} />
              </Link>
            </b>
            <b>
              Q
              <Link to="/addUser" title="Register">
              <img src="/signup.png" alt="Add user" style={{ width: "100%", height: "100%" }} />
              </Link>
            </b>
            <b>
              !
              <Link>
                <img src="/idioma.png" alt="Language" style={{ width: "100%", height: "100%" }} onClick={changeLanguage} />
              </Link>
            </b>
          </h1>
        </figcaption>
      </figure>
    </div>
  );
}

export default Home;

