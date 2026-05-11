import "./GameCard.css";
import {useState,useEffect} from "react";


export default function GameCard({cardValue,compareValue,timeValue}){
    const [isFlipped,setIsFlipped]=useState(false);

    useEffect(()=>{
        
            const timer= setTimeout(()=>{
                setIsFlipped(true);

            },timeValue/2);
            return ()=>clearTimeout(timer);
        
    },[]);


    return <>
    <div className="GameCardTotal">
    <div className="GameCardTop">
        <p>{compareValue}</p>

    </div>
       



        <div className="card-container">
        <div className={`card ${isFlipped ? "flipped" : ""}`}>
        <div className="side front">
            <p>Baksiden</p>
        </div>

        <div className={`side back ${compareValue}`}>
            <p>{cardValue}</p>
        
        </div>
        </div>

        





    </div>
    </div>
    
    </>

}