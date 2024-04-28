export default function RestorePassword({
    email,
    username,
    passwordStrength,
    passwordStrengthText,
    newPassword,
    handlePasswordChange,
    repeatPassword,
    setRepeatPassword,
    handleSubmit,
    t,
    showErrors
  }) {
    return (
      <form className="form" onSubmit={handleSubmit}>
        <h1>{t("forgotPassword.enter_password")}</h1>
        {showErrors()}
        <div className="input-box">
          <p>{t("addUser.email_placeholder")}: </p>
          <input
            name="email"
            type="text"
            required
            value={email}
            readOnly
          />
        </div>
        <div className="input-box">
          <p>{t("addUser.username_placeholder")}: </p>
          <input
            name="username"
            type="text"
            required
            value={username}
            readOnly
          />
        </div>
        <div className="input-box-password-register">
          <p>{t("addUser.password_placeholder")}: </p>
          <input
            name="password"
            type="password"
            required
            value={newPassword}
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
            required
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </div>
        <button type="submit">{t("forgotPassword.enter_password_button")}</button>
        <br />
      </form >
    );
  }
  