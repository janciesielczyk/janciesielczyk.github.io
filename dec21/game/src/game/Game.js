import './Game.css';
import React, { useState } from "react";
import MersenneTwister from 'mersenne-twister';

const generator = new MersenneTwister();

function Game() {

  const santaClicked = () => {
    setCount(count + 1);
    setSantas([...santas, getSantaElement()]);
    if(count >= winCounterAmount - 1) {
      finish();
    }
  }

  // const directions = ['left', 'right', 'bottomright', 'bottomleft'];
  const directions = ['left', 'right'];
  const speeds = [1, 2, 3, 4]
  const sizes = [1, 2, 3, 4]
  const [count, setCount] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const winCounterAmount = 1;

  const getSantaElement = () => {
    const direction = directions[getRandomInt(0, directions.length - 1)]
    const speed = speeds[getRandomInt(0, speeds.length - 1)]
    const size = sizes[getRandomInt(0, sizes.length - 1)]
    const style = {top: getRandomInt(0,80)+'%', left: getRandomInt(50, 150) + '%'};
    // setNewSantaId(newSantaId + 1);
    // console.log('getSantaElement', {newSantaId});
    return (key, handler, arr) => {
      const func = () => {
        arr.splice(key, 1);
        handler();
      };
      // return <img key={key} onClick={func} draggable="false" style={style} className={'santa santa-' + direction + ' santa-speed-' + speed } alt="running santa" src={santaGif}></img>
      return <div key={key} onClick={func} style={style} className={'santa santa-' + direction + ' santa-speed-' + speed + ' santa-size-' + size }></div>
    }
  }

  const start = () => {
    setIsGameStarted(true);
  }

  const finish = () => {
    setSantas([]);
    setIsGameFinished(true);
  }


  const [santas, setSantas] = useState([
    ...new Array(5).fill({}).map(() => getSantaElement())
    // getSantaElement()
  ]);

  // useEffect(() => {
  //   // console.log('useEffect');
  //   // setSantas([...new Array(5).fill(getSantaElement(santaId))])
  //   setSantas([getSantaElement(), getSantaElement()])
  // }, [])


  return (
    <div className="game">
      {!isGameStarted ? <div className="game-start">
        <div>Czas zacząć!</div>
        <button onClick={start}>START</button>
      </div>
      : null}
      <div className="game-view">
        {santas.map((santa, i) => (
          santa(i, santaClicked, santas)
        ))}
      </div>
      <div className="game-bar">
        <div>Wynik: {count}</div>
      </div>
      {isGameFinished ? <div className="game-finish">
        <div>Gratulacje!</div>
      </div>
      : null}
    </div>
  );
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(generator.random() * (max - min + 1)) + min;
}

export default Game;
