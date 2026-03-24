import './App.css';
import Gameboard from "./Gameboard.jsx";
import { useState } from 'react';
import {useQuery} from "@tanstack/react-query";

function App() {
  //All My Consts
  const cardValues=[1,2,3,4,5];
  const [correctAnswer,setCorrectAnswer]=useState([]);
  const listOfGuesses=[1,2,3,4,5]
  const [allSpells,setAllSpells]=useState([])

  //This entire thing, is just to get the query, but I imagine that after I get it 1 time, I dont need to load it more
  const {isPending,error,data} = useQuery({
      queryKey:["spellData"],
      queryFn:()=>
        fetch("https://www.dnd5eapi.co/api/2014/spells").then((res)=>res.json(),),
    })
    if(isPending) return 'Loading'
    if(error) return "an error occured:"+error.message
    console.log(data.results)
  
  //--------------------------------Sliter med å gjøre den under til en custom api get call, for sånn det er nå,

    function useSpell(spellName){
      return useSuspenseQuery({
      queryKey:["spell",spellName],
      queryFn:({queryKey:[, spellName]})=>{
        fetch(`https://www.dnd5eapi.co/api/2014/spells/${spellName}`).then(response=> response.json());
      }});}




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
