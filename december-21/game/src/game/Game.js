import './Game.css';
import santaGif from './../img/santa1-compressed.gif'
import React, { useState } from "react";

function Game() {

  const [count, setCount] = useState(0);
  window.ondragstart = function() {return false}

  const santaClicked = () => {
    setCount(count + 1);
  }


  return (
    <div className="game">
      <div className="game-view">
        <img onClick={santaClicked} draggable="false" className="santa" alt="running santa" src={santaGif}></img>
      </div>
      <div className="game-bar">
        <div>{count}</div>
      </div>
    </div>
  );
}

export default Game;
