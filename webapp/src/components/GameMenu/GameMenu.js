import "../../custom.css";
import { Link } from "react-router-dom";
import {useTranslation} from "react-i18next";

export default function GameMenu() {
  const[t, i18n] = useTranslation("global");

  return (
    <div className="divMenu">
      <h2>{t("gameMenu.title")}</h2>
      <ButtonHistoricalData t={t} />
      <ButtonNewGame t={t}  />
    </div>
  );
  }
  
  function ButtonHistoricalData({ t }) {
    return (
      <Link className="menuButton linkButton" to="/historical">
        <h3>{t("gameMenu.history_button")}</h3>
      </Link>
    );
  }
  
  function ButtonNewGame({ t }) {
    return (
      <Link className="menuButton linkButton" to="/questions">
        <h3>{t("gameMenu.new_game_button")}</h3>
      </Link>
    );
  }