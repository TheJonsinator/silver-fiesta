import "./GameCard.css"

export default function GameCard({cardValue,compareValue}){
    return <>
    <div className="GameCardTotal">
    <div className="GameCardTop">
        <p>{compareValue}</p>

    </div>
    <div className="GameCard">
    
    <p>{cardValue}</p>
    
    </div>
    </div>
    
    </>

}