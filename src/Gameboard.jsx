import "./Gameboard.css";
import GameCard from "./GameCard.jsx"
import {useState} from "react"

export default function GameBoard({spellName}){
    const [cardValues,setCardValues]=useState([1,2,3])
  
    return(<>
    <div className="Gameboard">
        {cardValues.map(value=>{
           return <GameCard cardValue={value}/>
        })}
   



    </div>
    </>)
    
    
   
}