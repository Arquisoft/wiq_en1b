import "../../custom.css";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import ForgetPasswordFunctions from "./ForgetPasswordFunctions";
import Cookies from "js-cookie";
import zxcvbn from "zxcvbn";
import { useNavigate } from "react-router-dom";

import { validateEmail, validatePasswords, validateUsername } from "../../utils/utils";
import AskEmailUsername from "./AskEmailUsername";
import PendingComponent from "./PendingComponent";
import EnterCode from "./EnterCode";
import RestorePassword from "./RestorePassword";

const forgetPasswordFunctions = new ForgetPasswordFunctions();
export default function ForgotPassword() {
  const navigate = useNavigate();
  const [t] = useTranslation("global");

  // Component state variables
  const [emailStatus, setEmailStatus] = useState("ASK_EMAIL");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState({});
  const [passwordStrengthText, setPasswordStrengthText] = useState("");
  const [submitErrors, setSubmitErrors] = useState([]);
  const [errors, setErrors] = useState([]);

  // Function to handle state transition and send email
  const handleSubmitStateToPending = async (event) => {
    event.preventDefault();

    const newSubmitErrors = [];

    validateEmail(newSubmitErrors, email);
    validateUsername(newSubmitErrors, username);

    setSubmitErrors(newSubmitErrors);

    if (newSubmitErrors.length === 0) {
      
      try {
        setEmailStatus("PENDING");
        await sendEmail();
        setSubmitErrors([])
      } catch (error) {
        setErrors([error.message])
      }
      
    }
  };

  // Function to send the email
  const sendEmail = async () => {
    try{
      const received = await forgetPasswordFunctions.sendEmail(email, username);
      if (received) {
        setEmailStatus("RECEIVED");
      } else {
        console.log("Email not received");
      }
    }
    catch(error){
      setErrors([error.message])
    }
  };

  // Function to obtain the code from input fields
  async function obtenerCodigo(event) {
    event.preventDefault();
    let inputs = document.querySelectorAll(".codeGrid input");
    let codigo = "";
    let inputsNotEmpty = false;
    inputs.forEach((input) => {
        codigo += input.value; 
        inputsNotEmpty = inputsNotEmpty || input.value === ""
    });

    if(!inputsNotEmpty){
      try {
        const codigoNumerico = parseInt(codigo, 10);
        await forgetPasswordFunctions.tokenFromCode(codigoNumerico);
        setEmailStatus("RESTORE_PASSWORD");
      } catch (error) {
        setErrors([error.message])
      }
    }

  }

  // Function to restore the password
  async function restorePassword(event) {
    event.preventDefault();

    const newSubmitErrors = [];

    validatePasswords(newSubmitErrors, newPassword, repeatPassword);

    setSubmitErrors(newSubmitErrors);

    if (newSubmitErrors.length === 0) {

      const response = await forgetPasswordFunctions.changePassword(
        email,
        username,
        newPassword,
        repeatPassword
      );

      const oneHourAfter = new Date().getTime() + 1 * 60 * 60 * 1000;
      Cookies.set(
        "user",
        JSON.stringify({
          username: response.data.username,
          token: response.data.token,
        }),
        { expires: oneHourAfter }
      );

      navigate("/menu");
      window.location.reload();
    }
  }

  // Function to show errors
  const showErrors = () => {
    if (submitErrors.length > 0) {
      return submitErrors.map((error, index) => (
        <p key={index} style={{ color: "red", margin: 0 }}>
          {t(error)}
        </p>
      ));
    }
    else{
      if(errors.length > 0){
        return errors.map((error, index) => (
          <p key={index} style={{ color: "red", margin: 0 }}>
            {t(error)}
          </p>
        ));
      } else
          return null;
    }
  };

  // Function to handle password change and determine strength
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setNewPassword(newPassword);

    const newStrength = zxcvbn(newPassword);

    switch (newStrength.score) {
      case 0:
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

  // Main component return block with conditional rendering
  return (
    <div className="forgotPassword">
      <div className="general">
        <div className="card">
          <div className="card2">
            {(() => {
              switch (emailStatus) {
                case "ASK_EMAIL":
                  return (
                    <AskEmailUsername
                      email={email}
                      setEmail={setEmail}
                      username={username}
                      setUsername={setUsername}
                      t={t}
                      handleSubmit={handleSubmitStateToPending}
                      showErrors={showErrors}
                    />
                  );
                case "PENDING":
                  return (<PendingComponent t={t} />);
                case "RECEIVED":
                  return (<EnterCode obtainCode={obtenerCodigo} t={t} showErrors={showErrors}/>);
                case "RESTORE_PASSWORD":
                  return (
                    <RestorePassword
                      email={email}
                      username={username}
                      passwordStrength={passwordStrength}
                      passwordStrengthText={passwordStrengthText}
                      newPassword={newPassword}
                      handlePasswordChange={handlePasswordChange}
                      repeatPassword={repeatPassword}
                      setRepeatPassword={setRepeatPassword}
                      t={t}
                      handleSubmit={restorePassword}
                      showErrors={showErrors}
                    />
                  );
                default:
                  return <div className="form"><p>There has been an error</p></div>;
              }
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}
