import { Link } from "react-router-dom";

export default function BackButton({t}){
    return(
      <Link className="linkButtonHistorical" to="/menu">
        <h3>⬅ {t("gameMenu.back")}</h3>
      </Link>
    );
  }