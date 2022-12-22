import './Game.css';
import React, { useState } from "react";
import MersenneTwister from 'mersenne-twister';
import panda1 from './../img/panda1.png'
import panda2 from './../img/panda2.png'

const generator = new MersenneTwister();

function Game() {

  const santaClicked = () => {
    console.log('santaClicked');
    setCount(count + 1);
    setSantas([...santas, getSantaElement()]);
    if(count >= winCounterAmount - 1) {
      finish();
    }
  }

  const missClicked = () => {
    console.log('missClicked');
    setMisses(misses + 1);
    if(misses === 5) {
      alert('Nie klikaj na ślepo bo pożałujesz!')
    } else if(misses === 8) {
      alert('Cyk! Dodajemy ujemne punkty!')
    } else if(misses > 8) {
      setCount(count - 1);
    }
  }

  // const directions = ['left', 'right', 'bottomright', 'bottomleft'];
  const directions = ['left', 'right'];
  const speeds = [1, 2, 3, 4]
  const sizes = [1, 2, 3, 4]
  const [misses, setMisses] = useState(0);
  const [count, setCount] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const winCounterAmount = 200;

  const getSantaElement = () => {
    const direction = directions[getRandomInt(0, directions.length - 1)]
    const speed = speeds[getRandomInt(0, speeds.length - 1)]
    const size = sizes[getRandomInt(0, sizes.length - 1)]
    const style = {top: getRandomInt(0,80)+'%', left: getRandomInt(50, 150) + '%'};

    
    return (key, handler, arr) => {
      const func = (event) => {
        // event.target.classList.add('santa-catched')
        // setTimeout(() => {
          event.stopPropagation()
          arr.splice(key, 1);
          handler();         
        // }, 1000);
      };

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
  ]);

  return (
    <div className="game">
      {!isGameStarted ? <div className="game-start">
        <img className='panda' src={panda1} alt="panda"></img>
        <div>
          Kasiu, musisz nam pomóc!<br></br>
          W centralnej sortowni prezentów mikołaje strajkują!<br></br> 
          Musimy ich złapać by opanować sytuację i być pewnym że dostarczą prezenty na święta!<br></br><br></br>
          Złap {winCounterAmount} mikołajów, a przekażę Ci wskazówkę odnośnie Twojego prezentu! 
        </div>
        <button onClick={start}>START</button>
      </div>
      : null}
      <div className="game-view" onClick={missClicked}>
        {santas.map((santa, i) => (
          santa(i, santaClicked, santas)
        ))}
      </div>
      <div className="game-bar">
        <div>Wynik: {count} / {winCounterAmount}</div>
      </div>
      {isGameFinished ? <div className="game-finish">
        <img className='panda' src={panda2} alt="panda"></img>
        <div>
          Dobra robota!<br></br>
          Udało Ci się dorwać aż {winCounterAmount} mikołajów!<br></br><br></br>
          Oto wskazówka:<br></br>
          <br></br>
          <pre>K U+2764 J</pre>
        </div>
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
