import "./GameCard.css"

export default function GameCard({cardValue,compareValue}){
    return <>
    <div className="GameCard">
    
    <p>{cardValue}</p>
    <p>{compareValue}</p>
    </div>
    
    </>

}