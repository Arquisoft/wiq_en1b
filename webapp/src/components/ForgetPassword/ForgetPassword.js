import "../../custom.css";
import {useTranslation} from "react-i18next";
import { useState } from 'react';
import ForgetPasswordFunctions from "./ForgetPasswordFunctions";

const ForgetPasswordFunctions = new ForgetPasswordFunctions();
export default function ForgotPassword() {
  const[t] = useTranslation("global");
  const[emailStatus, setEmailStatus] = useState("ASK_EMAIL");
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [code, setCode]=useState(0);
  const[newPassword, setNewPassword]=useState('');
  const[repeatPassword, setRepeatPassword]=useState('');
  let componentToRender ;
  const handleSubmitStateToPending =()=>{
    setEmailStatus("PENDING");
  }
  const sendEmail =()=>{
    const received = ForgetPasswordFunctions.sendEmail(email, username);
    if(received){
        setEmailStatus("RECEIVED");
    }else{
        console.log("not received")
    }
  }

  function obtenerCodigo() {
    // Obtener todos los inputs con la clase "input"
    const inputs = document.querySelectorAll('.password .input');
    let codigo = '';
    // Recorrer cada input y concatenar su valor al código si no es "X"
    inputs.forEach(input => {
        if (input.value !== "X") {
            codigo += input.value;
        }
    });
    // Convertir el código a un número entero
    const codigoNumerico = parseInt(codigo, 10);
    console.log("codigo obtenido: "+codigoNumerico)
    setCode(codigoNumerico);
    ForgetPasswordFunctions.tokenFromCode(code);
    setEmailStatus("VERIFIED");
  }

  function restorePassword(){
    let oneHourAfter = new Date().getTime() + (1 * 60 * 60 * 1000)
            Cookies.set('user', JSON.stringify({username : response.data.username, token : response.data.token})
                        , {expires:oneHourAfter});
            navigate('/menu');
            window.location.reload();
  }


  if(emailStatus==="ASK_EMAIL"){
    componentToRender=<AskEmailUsername t={t} 
        setEmail={setEmail} setUsername={setUsername}
        handleSubmit={handleSubmitStateToPending}/>
  }
  else if(emailStatus==="PENDING"){
    componentToRender= <PendingComponent t={t}/>
    sendEmail();
  }else if(emailStatus==="RECEIVED"){
    componentToRender=<EnterCode obtainCode={obtenerCodigo} t={t} />
  }else{
    componentToRender=<ForgotPassword setRepeatPassword={setRepeatPassword} setNewPassword={setNewPassword} t={t} />
  }

  
  return (
    <div className="forgotPassword">
        {componentToRender}
    </div>
  );
  }
  
  export default function AskEmailUsername({t, handleSubmit}){
    <div className="general">
    <form className="form" onSubmit={handleSubmit}>
            <h1>{t("forgotPassword.enter_email")}</h1>
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
            <button type="submit">{t("addUser.register_button")}</button>
          </form>
          </div>
  } 

  export default function PendingComponent({t}){
    return (
        <div>
            <h2>{t("forgotPassword.sending_title")}</h2>
            <p>{t("forgotPasswor.sending_paragraph")}</p>
        </div>
    );
  }


  export default function EnterCode({t,obtainCode}){
    return (
        <div className="password">
            <h2>{t("forgotPassword.enter_code")}</h2>
            <input maxlength="1" value="X" class="input" name="text" type="text" />
            <input maxlength="1" value="X" class="input" name="text" type="text" />
            <input maxlength="1" value="X" class="input" name="text" type="text" />
            <input maxlength="1" value="X" class="input" name="text" type="text" />
            <input maxlength="1" value="X" class="input" name="text" type="text" />
            <input maxlength="1" value="X" class="input" name="text" type="text" />
          {obtainCode()}        
        </div>
        
    );
  }

  export default function RestorePassword({t}){
    return(
      <div className="general">
        <div className="input-box-password-register">
              <p>{t("addUser.password_placeholder")}: </p>
              <input
                name="password"
                type="password"
                placeholder={t("addUser.password_placeholder")}
                required
                value={password}
                onChange={(e) => setNewPassword(e.target.value)}
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
      </div>
    );
  }
  

  