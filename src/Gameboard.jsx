import "./Gameboard.css";
import GameCard from "./GameCard.jsx"

export default function GameBoard({cardValues}){
  
    cardValues.forEach(value=>{console.log(value)})
    return(<>
    <div className="Gameboard">
        {cardValues.map(value=>{
           return <GameCard cardValue={value}/>
        })}
   



    </div>
    </>)
    
    
   
}