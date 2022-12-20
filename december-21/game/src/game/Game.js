import './Game.css';
import santaGif from './../img/santa-nobg.gif'
import React, { useState } from "react";

function Game() {

  const santaClicked = () => {
    setCount(count + 1);
  }

  const directions = ['left', 'right']
  const [newSantaId, setNewSantaId] = useState(0);
  const [count, setCount] = useState(0);

  const getSantaElement = () => {
    const direction = directions[getRandomInt(0,1)]
    const style = {top: getRandomInt(20,50)+'%', left: getRandomInt(20,70)+'%'};
    setNewSantaId(newSantaId + 1);
    return (
      <img key={() => newSantaId} onClick={()=>santaClicked} draggable="false" style={style} className={'santa santa-' + direction} alt="running santa" src={santaGif}></img>
    )
  }


  const [santas, setSantas] = useState([
    // ...new Array(5).fill(getSantaElement())
    getSantaElement()
  ]);




  return (
    <div className="game">
      <div className="game-view">
        {santas.map((santa) => (
          santa
        ))}
      </div>
      <div className="game-bar">
        <div>Wynik: {count}</div>
      </div>
    </div>
  );
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default Game;
