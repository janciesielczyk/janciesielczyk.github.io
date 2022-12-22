import './App.css';
import Game from './game/Game' 
import React, { useState } from "react";
import panda3 from './img/panda3.png'

function App() {
  const [isGameOpened, setIsGameOpened] = useState(false);
  const openGame = () => {setIsGameOpened(true)};
  return (
    <div className="App">
      <header className="App-header">
        <h1>Wyzwanie 22 grudnia</h1>
      </header>
      {!isGameOpened ? <div className="info">
        <img className='panda' src={panda3} alt="panda"></img>
        <div>
          Pewnie bardzo się dziś śpieszysz<br></br>
          i na prezent bardzo cieszysz,<br></br>
          by ułatwić ci zadanie<br></br>
          prezent będzie z Tobą stale.<br></br>
          Idź na spokojnie do pracy<br></br>
          i ogarnij wszystko cacy.<br></br>
          Kiedy kawkę będziesz pić<br></br>
          może wynik zdołasz wbić!<br></br>
        </div>
        <button onClick={openGame}>GRAJ</button>
      </div>
      : <Game/>}
      
    </div>
  );
}

export default App;
