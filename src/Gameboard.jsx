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
            if (spellData&& wantedCardValues?.classes){
                //Learning note, I had syntax trouble here, cause I did not include return when putting brackets around my map arrow function, since its on the same line I could just not include the brackets.
                const values=wantedCardValues.classes.map(spellClass=> { return `${spellClass.index} ` } );
                setClassValues(values);
            }
                } ,[spellData,wantedCardValues]);
        //Here it can be multiple components, verbal, sematic, material
        useEffect(()=>{
            if (spellData&& wantedCardValues?.components){
                const values=wantedCardValues.components.map(components=>`${components}, `);
                console.log(values)
                setVSMComponents(values);
                
            }
                } ,[spellData,wantedCardValues]);
         
      

    
          
        if(isLoading) return <p>Loading...</p>
        if(error) return <p>error</p> 


      
        
      


   
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