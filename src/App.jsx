import './App.css';
import Gameboard from "./Gameboard.jsx";
import { useState } from 'react';
import {useQuery} from "@tanstack/react-query";


function App() {
  //All My Consts
  const cardValues=[1,2,3,4,5,6,7];
  const [correctAnswer,setCorrectAnswer]=useState(Math.floor(Math.random()*320));
  const [listOfGuesses,setListOfGuesses]=useState([])
  


 
   


  //This entire thing, is just to get the query with the insex and names, but I imagine that after I get it 1 time, I dont need to load it more
  const {isPending,error,data} = useQuery({
      queryKey:["spellData"],
      queryFn:()=>
        fetch("https://www.dnd5eapi.co/api/2014/spells/").then((res)=>res.json(),),
    })
    if(isPending) return 'Loading'
    if(error) return "an error occured:"+error.message
    
   
    const correctName=data.results[correctAnswer].index



     const {data:metaData} = useQuery({
      queryKey:["metaData",correctName],
      queryFn:()=>
        fetch(`https://www.dnd5eapi.co/api/2014/spells/${correctName}`).then((res)=>res.json(),),
    })
   
    



    //Using addItem causes an infinite loop.
const addItem = async (term) => {
      const res = await fetch(`https://www.dnd5eapi.co/api/2014/spells/${term}`);
      const data = await res.json();
      setListOfGuesses(prev => [...prev, data]);
  };
 
 
  //Randomly Choses a number from between one and 320(the amount of spells are 319,I hardcoded this cause while I could you length of the resultList)
    console.log(correctAnswer)
  console.log(listOfGuesses)
  console.log(data.results[correctAnswer].index)
  console.log(metaData)


   


    
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
