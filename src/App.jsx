import './App.css';
import Gameboard from "./Gameboard.jsx";
import { useState } from 'react';
function App() {

  const cardValues=[1,2,3,4,5];
  const [correctAnswer,setCorrectAnswer]=useState([]);
  const listOfGuesses=[1,2,3,4,5]

  return (
    <div className="App">
      <header className="App-header">
        <img src="Octocat.png" className="App-logo" alt="logo" />
        <p>
          GitHub Codespaces <span className="heart">♥️</span> React
        </p>
        


        {listOfGuesses.map(guess=>{
           return <Gameboard cardValues={cardValues}/>
        })}
   





        
        <p className="small">
          Edit <code>src/App.jsx</code> and save to reload.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;
