import "./Gameboard.css";
import {useEffect, useState} from "react"
import get from "./fetcher";
import GameCard from "./GameCard";
import {useQuery} from "@tanstack/react-query";

export default function GameBoard({indexName,correctAnswerName,listOfAllNames}){

    const {data:spellData,isLoading,error} = useQuery({
          queryKey:["spellData",indexName],
          queryFn:()=>get(indexName),});

   
    
    const {data:correctAnswerData,isLoading:isLoading1,error:error1}= useQuery({
        queryKey:["correctAnswerData", correctAnswerName],
        queryFn:()=> get(correctAnswerName),
    });
       
       
        const [wantedCardValues,setWantedCardValues]=useState({});
        const [classValues,setClassValues]=useState([]);
        const [vsmComponents,setVSMComponents]=useState([]);
        const [school,setSchool]=useState("");
        const [correctAnswerValues,setCorrectAnswerValues]=useState({});
       // console.log(indexName)
        //console.log("DATAEN TIL VALGT SPELL",spellData)
       // console.log("LISTEN OVER ALLE NAVNENE",listOfAllNames)
        //console.log("CORRECTANSWERDATA",correctAnswerData)
       
    
    
    
           const wantedCats=["casting_time","level","range","damage","classes","components","concentration","school"]



           //This is how the searched spell values are decided
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
        //This is how the correctAnswer Spell Values are decided
        useEffect(()=>{
            if(correctAnswerData){
                const values={};
                    wantedCats.forEach(cat=>{
                        if(cat in correctAnswerData){
                            values[cat]=(correctAnswerData[cat]);
                        }
                    });
                    setCorrectAnswerValues(values)
                    
                };
                
            },[correctAnswerData]
        )

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

                setVSMComponents(values);
                
            }
                } ,[spellData,wantedCardValues]);
         



    
          
        if(isLoading) return <p>Loading...</p>
        if(error) return <p>error</p> 

//Searched Spell Values
      const castingTime=wantedCardValues.casting_time;
      const level=wantedCardValues.level;
      const range=wantedCardValues.range;  
      const damage= wantedCardValues.damage?.damage_at_character_level?.[1]??wantedCardValues.damage?.damage_at_slot_level?.[wantedCardValues?.level]??"No Damage";
      const damageType=wantedCardValues.damage?.damage_type?.index??"No Damage Type";
      
    //console.log(correcAnswerValues)


// Correct Answer Spell Values
    const correctCastingTime= correctAnswerValues.casting_time;
    const correctLevel=correctAnswerValues.level;
    const correctRange=correctAnswerValues.range;

    console.log("Values of the Correct ANSWER",correctCastingTime,correctLevel,correctRange)

      //JS Object Spell structure example
      /* {
      name:spellName,
      castingTime:castingTime,
      level:level,
      range:range,
      damage:damage,
      damageType:damageType,
      class:class,
      vsm:vsm,
      school:school
      }
      
      */
     function compareValues(answer,guess){
        if(answer==guess){
            return "Identical"
        

        }
        else if(answer!=guess && guess.includes(answer) ){
            return "Partial"
        
        }
        else{
            return "Nothing in Common"
        }
     } 
      function compareSpellToAnswer(chosenSpell,answerSpell){
        let dictionaryOfResults={};
        Object.keys(chosenSpell).forEach(key=>{
            dictionaryOfResults[key]=compareValues(chosenSpell[key],answerSpell[key])

        })
        return dictionaryOfResults;

      }


      

    return(<>
    <p>Riktig Svar {correctAnswerName} Søkte {indexName}</p>
    <div className="Gameboard">
                   
                   <GameCard cardValue={castingTime}></GameCard>
                    <GameCard cardValue={`Level ${level}`}></GameCard>
                   <GameCard cardValue={range}></GameCard>
                   <GameCard cardValue={damage}></GameCard>
                   <GameCard cardValue={damageType}></GameCard>
                   <GameCard cardValue={classValues}></GameCard>
                   <GameCard cardValue={vsmComponents}></GameCard>
                   <GameCard cardValue={wantedCardValues?.school?.index}></GameCard>
                  
                
                    

                 
                   
               
                 

       
   



    </div>
    </>)
    
    
   
}