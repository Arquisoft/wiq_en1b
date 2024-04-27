import { Link } from "react-router-dom";
export default function ButtonHistoricalData({ t }) {
  return (
    <Link className="linkButton" id="historical" to="/historical">
      <h3>{t("gameMenu.history_button")}</h3>
    </Link>
  );
}