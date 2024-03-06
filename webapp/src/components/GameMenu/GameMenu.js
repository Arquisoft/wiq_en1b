import './GameMenu.css';
import { Link } from "react-router-dom";
import QuestionView from '../questionView/QuestionView';
export default function GameMenu() {
  return (
    <div className="divMenu">
      <h2>Game Menu</h2>
      <ButtonHistoricalData />
      <ButtonNewGame />
    </div>
  );
  }
  
  function ButtonHistoricalData() {
    function handleClick() {
      //ir a la vista de historical data
      alert("Historical Data");
    }
    return <button className="menuButton" onClick={handleClick}> View Historical Data</button>;
  }
  
  function ButtonNewGame() {
    return (
      <>
        <Link className="menuButton" to="/questions">
        <button >Create New Game</button>
        </Link>
      </>
      );
  }
  