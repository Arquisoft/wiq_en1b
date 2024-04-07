import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import "../../custom.css";

function Home() {
  const { t } = useTranslation("global");
  const [textContainerVisible, setTextContainerVisible] = useState(true);

  const handleToggleOpen = () => {
    setTextContainerVisible(false);
  };

  const handleToggleClose = () => {
    setTextContainerVisible(true);
  };

  return (
    <div className="general">
      <div className={`text-container ${textContainerVisible ? 'visible' : 'hidden'}`}>
        <p>{t("home.msg1")}</p>
        <p>{t("home.msg2")}</p>
      </div>
      <input className='input-home' type="radio" name="toggle" id="toggleOpen" value="toggleOpen" onChange={handleToggleOpen} />
      <input className='input-home' type="radio" name="toggle" id="toggleClose" value="toggleClose" onChange={handleToggleClose} />
      <figure id="welcomeMessage">
        <figcaption>
          <h1>
            <label htmlFor="toggleOpen" title={t("home.clickOpen")} id={t("home.clickOpen")}></label>
            <label htmlFor="toggleClose" title={t("home.clickClose")} id={t("home.click")}>✖</label>
            <b>
              W
              <Link to="/instructions" title={t("home.how_to_play")}>
                <img src="/instrucciones.png" alt="Instructions" style={{ width: "100%", height: "100%" }} />
              </Link>
            </b>
            <b>
              I
              <Link to="/login" title={t("home.login")}>
              <img src="/login.png" alt="Login" style={{ width: "100%", height: "100%" }} />
              </Link>
            </b>
            <b>
              Q
              <Link to="/addUser" title={t("addUser.title")}>
              <img src="/signup.png" alt="Add user" style={{ width: "100%", height: "100%" }} />
              </Link>
            </b>
          </h1>
        </figcaption>
      </figure>
    </div>
  );
}

export default Home;
