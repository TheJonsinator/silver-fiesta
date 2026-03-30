import "./QueryComponentTest.css";
import {useEffect, useState} from "react"
import get from "./fetcher";
import GameCard from "./GameCard";
import {useQuery} from "@tanstack/react-query";


export default function QueryComponentTest({indexName}){
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



    /* useEffect(()=>{
        if(spellData){
            spellData.forEach(cat=>{
                 if(wantedCats.includes(cat)){setWantedCardValues(prev=>[...prev,spellData[cat]]);}
            })
           
        }
     },[spellData]);
     
     
   
     
     
     
     */


    




      
    if(isLoading) return <p>Loading...</p>
    if(error) return <p>error</p> 

  
     return<>
        <div className="QueryComponentTest">
            <p>TEST</p></div>
            <GameCard cardValue={indexName}></GameCard>
            <GameCard cardValue={indexName}></GameCard>
            <GameCard cardValue={indexName}></GameCard>
            <GameCard cardValue={indexName}></GameCard>
            <GameCard cardValue={indexName}></GameCard>
            <GameCard cardValue={indexName}></GameCard>
            <GameCard cardValue={indexName}></GameCard>
            <GameCard cardValue={indexName}></GameCard>

        </>


}