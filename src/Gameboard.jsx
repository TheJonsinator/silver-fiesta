import "./Gameboard.css";
import {useEffect, useState} from "react"
import get from "./fetcher";
import GameCard from "./GameCard";
import {useQuery} from "@tanstack/react-query";

export default function GameBoard({indexName}){

    const {data:spellData,isLoading,error} = useQuery({
          queryKey:["spellData"],
          queryFn:()=>get(indexName),});
       
       
        const [wantedCardValues,setWantedCardValues]=useState([]);
    
        console.log(indexName)
        console.log(spellData)
    
    
    
           const wantedCats=["casting_time","level","range","damage","classes","components","concentration","school"]
        useEffect(()=>{
            if (spellData){
                const values=[];
                wantedCats.forEach(cat=>{
                    if(cat in spellData) {
                        values.push(spellData[cat]);
                    }
                });
                setWantedCardValues(values)
            }
        },[spellData]);
         
       console.log(wantedCardValues)

    
          
        if(isLoading) return <p>Loading...</p>
        if(error) return <p>error</p> 






    return(<>
    <div className="Gameboard">
      
                   <GameCard cardValue={wantedCardValues[0]}></GameCard>
                   <GameCard cardValue={wantedCardValues[1]}></GameCard>
                   <GameCard cardValue={wantedCardValues[2]}></GameCard>
                   <GameCard cardValue={wantedCardValues[3]?.damage_at_slot_level?.[`${wantedCardValues[1]}`]}></GameCard>
                   <GameCard cardValue={wantedCardValues[3]?.damage_type?.name}></GameCard>
                    <GameCard cardValue={wantedCardValues[5]?.join(",")}></GameCard>
                    

                 
                   
               
                 

       
   



    </div>
    </>)
    
    
   
}