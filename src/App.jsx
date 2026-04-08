import './App.css';
import get from "./fetcher";
import Gameboard from "./Gameboard.jsx";
import { useEffect, useState } from 'react';
import {useQuery} from "@tanstack/react-query";
import ComponentTest from './QueryComponentTest';


function App() {
  //All My Consts
    const {data:spellNames,isLoading,error} = useQuery({
      queryKey:["spellNames"],
      queryFn:()=>get(""),});
    

 
 const [correctAnswer,setCorrectAnswer]=useState(null);
  const [selectedSpellIds,setSelectedSpellIds]=useState([])
  const [listOfGuesses,setListOfGuesses]=useState([1])
  const [allSpellNames,setAllSpellNames]=useState([])
// Må bruke useEffect, fordi correctAnswer er avhengig av at fetch requesten er ferdig, som er viktig
  useEffect(()=>{
    if(spellNames){
      const randomIndex= Math.floor(Math.random()*spellNames.results.length);setCorrectAnswer(randomIndex);
    }
  },[spellNames]);
//HUSK Å ENDRE RANDOM INDEX TILBAKE TIL NOE TILFELDIG


    useEffect(()=>{
      if(spellNames){
        const allNames=spellNames.results.map(r=>r.index);
        setAllSpellNames(allNames)
      }
    },[spellNames])

    if(isLoading|| correctAnswer==null) return <p>Loading...</p>
    if(error) return <p>error</p> 
  

  
  //Randomly Choses a number from between one and 320(the amount of spells are 319,I hardcoded this cause while I could you length of the resultList)
 /* console.log(correctAnswer)
  
  console.log(allSpellNames)
*/

console.log(spellNames.results[correctAnswer].index)


    



  return (
    <div className="App">
      <header className="App-header">
        

        {listOfGuesses.map(guess=>{
           return <Gameboard indexName={allSpellNames[correctAnswer]} correctAnswerName={allSpellNames[correctAnswer]} listOfAllNames={allSpellNames}/>
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

