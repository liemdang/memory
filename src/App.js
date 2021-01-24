import './App.css';
import Cards from './components/Cards'
import { useState } from "react"
import Header from './components/Header'

function App() {
  const [selectNumber, setSelectNumber] = useState(0)
  function handleChange(e) {
      setSelectNumber(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  }
  const [playerTurn, setPlayerTurn] = useState("Spieler 1")
  const [player1Score, setPlayer1Score] = useState(0)
  const [player2Score, setPlayer2Score] = useState(0)
  const [disableSelect, setDisableSelect] = useState(false)
  const [runningGame, setRunningGame] = useState(false)
  function incrementScore1()  {
    setPlayer1Score(player1Score + 1)
  }
  function incrementScore2() {
    setPlayer2Score(player2Score + 1)
  }
  function resetScore() {
    setPlayer1Score(0)
    setPlayer2Score(0)
  }
  return (
    <div className="App">
      <Header 
        playerTurn={playerTurn} 
        player1Score={player1Score} 
        player2Score={player2Score} 
        amount={selectNumber} 
        setDisableSelect={setDisableSelect}
        runningGame={runningGame}
        setRunningGame={setRunningGame}/>
      <form onSubmit={handleSubmit}>
        <label htmlFor="cardNumber">{!disableSelect ? "Wähle die Anzahl der Kartenpaare: " : "Anzahl der Kartenpaare:"}</label>
        <select value={selectNumber} onChange={handleChange} id="cardNumber" disabled={disableSelect} name="cardNumber" form="carform">
          <option style={{display: "none"}} selected>Anzahl</option>
          <option value="8">8</option>
          <option value="12">12</option>
          <option value="16">16</option>
          <option value="20">20</option>
        </select>
        <br/>
      </form>
      <Cards 
        amount={selectNumber} 
        setPlayerTurn={setPlayerTurn} 
        incrementScore1={incrementScore1} 
        incrementScore2={incrementScore2}
        resetScore={resetScore}
        setDisableSelect={setDisableSelect}
        setRunningGame={setRunningGame}/>
    </div>
  );
}

export default App;
