import "../../custom.css";
import InputEmailAndUsername from "../loginAndRegistration/InputEmailAndUsername"

export default function AskEmailUsername({ email, setEmail, username, setUsername, t, handleSubmit, showErrors }) {
    return (
      <form className="form" onSubmit={handleSubmit}>
        < InputEmailAndUsername title={"forgotPassword.enter_email"} email={email} setEmail={setEmail} username={username} setUsername={setUsername} showErrors={showErrors} t={t}/>
        <button type="submit">{t("forgotPassword.enter_email_button")}</button>
        <br />
      </form>
    );
  }