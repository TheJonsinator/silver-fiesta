import "./Gameboard.css";
import {useEffect, useState} from "react"
import get from "./fetcher";
import GameCard from "./GameCard";
import {useQuery} from "@tanstack/react-query";

export default function GameBoard({indexName}){

    const {data:spellData,isLoading,error} = useQuery({
          queryKey:["spellData"],
          queryFn:()=>get(indexName),});
       
       
        const [wantedCardValues,setWantedCardValues]=useState({});
        const [classValues,setClassValues]=useState([]);
        const [vsmComponents,setVSMComponents]=useState([]);
       // console.log(indexName)
        console.log(spellData)
    
    
    
           const wantedCats=["casting_time","level","range","damage","classes","components","concentration","school"]
        useEffect(()=>{
            if (spellData){
                const values={};
                wantedCats.forEach(cat=>{
                    if(cat in spellData) {
                        values[cat]=(spellData[cat]);
                    }
                });
                setWantedCardValues(values)
            
            }
        },[spellData]);

        //Here it can be multiple, 
        useEffect(()=>{
            if (spellData&& wantedCardValues[4]){
                const values=wantedCardValues[4].map(spellClass=>{spellClass.index} );
                console.log(values)
                setClassValues(values);
            }
                } ,[spellData,wantedCardValues]);
        //Here it can be multiple components, verbal, sematic, material
        useEffect(()=>{
            if (spellData&& wantedCardValues[5]){
                const values=wantedCardValues[5].map(components=>`${components} `);
                setVSMComponents(values);
            }
                } ,[spellData,wantedCardValues]);
         
      

    
          
        if(isLoading) return <p>Loading...</p>
        if(error) return <p>error</p> 


        console.log(classValues)
        
        
      



    return(<>
    <div className="Gameboard">
      
                   <GameCard cardValue={wantedCardValues.casting_time}></GameCard>
                    <GameCard cardValue={wantedCardValues.level}></GameCard>
                   <GameCard cardValue={wantedCardValues.range}></GameCard>
                   <GameCard cardValue={wantedCardValues.damage?.damage_at_character_level?.[1]??wantedCardValues.damage?.damage_at_slot_level?.[wantedCardValues?.level]??"No Damage"}></GameCard>
                   <GameCard cardValue={wantedCardValues.damage?.damage_type?.index??"No Damage Type"}></GameCard>
                   <GameCard cardValue={classValues}></GameCard>
                   <GameCard cardValue={vsmComponents}></GameCard>
                  
                
                    

                 
                   
               
                 

       
   



    </div>
    </>)
    
    
   
}