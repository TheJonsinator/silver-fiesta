import './App.css';
import Gameboard from "./Gameboard.jsx";
import { useState } from 'react';
import {useQuery} from "@tanstack/react-query";


function App() {
  //All My Consts
  const cardValues=[1,2,3,4,5,6,7];
  const correctAnswer=Math.floor(Math.random()*320);
  const [selectedSpellIds,setSelectedSpellIds]=useState([])
  const [listOfGuesses,setListOfGuesses]=useState([])
  const [allSpellNames,setAllSpellNames]=useState([])



   


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



//Under her, tar jeg og lager en liste over alle navnene eller indexene som det heter her, som er det man må søke på
//og som må passes ned.

  const allIndexes=spellNames.results.map(result=>{
    return result.index
  })
  
  console.log(allIndexes)

//NOTAT TIL SENERE, du må ikke gjøre en loop med useQuery inni, du må gjøre en useQuery, med en loop inni.
/*const { isLoading: loadingDetails } = useQuery({
    queryKey: ["allSpellDetails"],
    queryFn: async () => {
      if (!spellList) return [];

      const results = await Promise.all(
        spellList.results.map(spell =>
          fetch(`https://www.dnd5eapi.co/api/2014/spells/${spell.index}`).then(res =>
            res.json()
          )
        )
      );
       setAllSpells(results); // store all spell objects in state
      return results;
    },
*/ //Her ser du,useQuery tar en funksjon(arrowfunc), som først sjekker at 
//spellList eksisterer, så lager den en variabel som heter results, som er all dataen
//så bruker den setAllSpells(results) og så returnerer den results.



  function handleSearch(nameWithstrek)
  {

  }
    



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
          {correctAnswer}
          {spellNames.results[correctAnswer].index}
        </p>
      </header>
    </div>
  );
}

export default App;
