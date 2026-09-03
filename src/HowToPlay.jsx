import "./HowToPlay.css";
import { useState } from "react";

export default function HowToPlay(){
    const [isHidden,setIsHidden]=useState(true);
    function handleShow(){
        setIsHidden(!isHidden)
        console.log(isHidden)
    }    
    return <>
    <div className="playPopUp">
   <button onClick= {handleShow}>How to play</button>
   <div className={isHidden?"hidden":"visible"}>
   <p>By process of elimination, guess the correct spell. For each correct attribute, you will get a green card.</p>
   <p>7 Greens=Win</p>
   </div>
    </div>
    </>
}