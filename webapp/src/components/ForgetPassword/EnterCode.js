export default function EnterCode({ t, obtainCode, showErrors }) {
    return (
      <div className="code">
        <form className="form" onSubmit={obtainCode}>
          <h1>{t("forgotPassword.enter_code")}</h1>
          {showErrors()}
          <div className="codeGrid">
            <input maxLength="1" className="input" type="text" placeholder="X"/>
            <input maxLength="1" className="input" type="text" placeholder="X"/>
            <input maxLength="1" className="input" type="text" placeholder="X"/>
            <input maxLength="1" className="input" type="text" placeholder="X"/>
            <input maxLength="1" className="input" type="text" placeholder="X"/>
            <input maxLength="1" className="input" type="text" placeholder="X"/>
          </div>
          <button type="submit">{t("forgotPassword.send_code")}</button>
          <br />
        </form>
      </div>
    );
  }