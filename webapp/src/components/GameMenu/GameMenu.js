import "../../custom.css";
import { Link } from "react-router-dom";
import {useTranslation} from "react-i18next";
import ButtonHistoricalData from "../HistoricalData/ButtonHistoricalData";

export default function GameMenu() {
  const[t] = useTranslation("global");

  return (
    <div className="divMenu">
      <h2>{t("gameMenu.title")}</h2>
      <ButtonNewGame t={t}  />
      <ButtonHistoricalData t={t} />
    </div>
  );
  }
  
  
  function ButtonNewGame({ t }) {
    return (
      <Link className="linkButton" to="/questions">
        <h3>{t("gameMenu.new_game_button")}</h3>
      </Link>
    );
  }

  