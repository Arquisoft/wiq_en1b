import "../../custom.css";

export default function AskEmailUsername({ title, email, setEmail, username, setUsername, t, showErrors }) {
    return (
      <>
        <h1>{t(title)}</h1>
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
      </>
    );
  }