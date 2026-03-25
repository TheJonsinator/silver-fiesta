import './App.css';
import Gameboard from "./Gameboard.jsx";
import { useState } from 'react';
import {useQuery} from "@tanstack/react-query";


function App() {
  //All My Consts
  const cardValues=[1,2,3,4,5,6,7];
  const [correctAnswer,setCorrectAnswer]=useState(Math.floor(Math.random()*320));
  const [selectedSpellIds,setSelectedSpellIds]=useState([])
  const [listOfGuesses,setListOfGuesses]=useState([])
  



   


  //This entire thing, is just to get the query with the insex and names, but I imagine that after I get it 1 time, I dont need to load it more
  const {isPending,error,data:spellNames} = useQuery({
      queryKey:["spellNames"],
      queryFn:()=>
        fetch("https://www.dnd5eapi.co/api/2014/spells/").then((res)=>res.json(),),
    })
    if(isPending) return 'Loading'
    if(error) return "an error occured:"+error.message

  //Randomly Choses a number from between one and 320(the amount of spells are 319,I hardcoded this cause while I could you length of the resultList)
  console.log(correctAnswer)
  console.log(spellNames.results[correctAnswer].index)    
  //Læringsnotat, du kan ikke bruke useState inni en funksjon
  //--------------------------------Sliter med å gjøre den under til en custom api get call, for sånn det er nå,


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
