import "./GameCard.css";
import {useState,useEffect,useId} from "react";


export default function GameCard({cardValue,compareValue,timeValue}){
    const [isFlipped,setIsFlipped]=useState(false);
    const id=useId();

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
        <div key={id} className={`card ${isFlipped ? "flipped" : ""}`}>
        <div className="side front">
            <img src="https://cdn.pixabay.com/photo/2022/02/23/20/25/card-7031432_1280.png"></img>
            
        </div>

        <div className={`side back ${compareValue}`}>
            <p>{cardValue}</p>
        
        </div>
        </div>

        





    </div>
    </div>
    
    </>

}