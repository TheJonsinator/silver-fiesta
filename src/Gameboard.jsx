import "./Gameboard.css";
import GameCard from "./GameCard.jsx"

export default function GameBoard({cardValues}){
  
    return(<>
    <div className="Gameboard">
        {cardValues.map(value=>{
           return <GameCard cardValue={value}/>
        })}
   



    </div>
    </>)
    
    
   
}