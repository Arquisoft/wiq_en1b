import './GameMenu.css';
export default function GameMenu() {
  return (
    <div>
      <h2>Game</h2>
      <ButtonHistoricalData />
      <ButtonNewGame />
    </div>
  );
  }
  
  function ButtonHistoricalData() {
    function handleClick() {
      //ir a la vista de historical data
      alert("Historical DAta");
    }
    return <button onClick={handleClick}>Historical Data</button>;
  }
  
  function ButtonNewGame() {
    function handleClick() {
      //ir a  la vista de la primera pregunta
      alert("New game");
    }
    return <button onClick={handleClick}>Create New Game</button>;
  }
  