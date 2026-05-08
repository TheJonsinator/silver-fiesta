import "./Gameboard.css";
import {useEffect, useState,useMemo} from "react"
import get from "./fetcher";
import GameCard from "./GameCard";
import {useQuery} from "@tanstack/react-query";
import confetti from "https://esm.sh/canvas-confetti@1"

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
        const [correctAnswerValues,setCorrectAnswerValues]=useState({});
        const [correctClasses,setCorrectClasses]=useState([]);
        const [correctVSMComponents,setCorrectVSMComponents]=useState([]);
        const [winConditionMet,setWinConditionMet]=useState(false);
       
   
       
    
    
    
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
         

    
    
    
    
    
    //Correct Answer Classes
        
        useEffect(()=>{
    if(correctAnswerData && correctAnswerValues?.classes){
        const values = correctAnswerValues.classes.map(spellClass=> {return `${spellClass.index} `});
        setCorrectClasses(values);}
    },[correctAnswerData,correctAnswerValues]);

//Correct Answer VSM
    useEffect(()=>{
            if (correctAnswerData&& correctAnswerValues?.components){
                const values=correctAnswerValues.components.map(components=>`${components}, `);

                setCorrectVSMComponents(values);
                
            }
                } ,[correctAnswerData,correctAnswerValues]);
    
          
        

//Searched Spell Values
      const castingTime=wantedCardValues.casting_time;
      const level=wantedCardValues.level;
      const range=wantedCardValues.range;  
      const damage= wantedCardValues.damage?.damage_at_character_level?.[1]??wantedCardValues.damage?.damage_at_slot_level?.[wantedCardValues?.level]??"No Damage";
      const damageType=wantedCardValues.damage?.damage_type?.index??"No Damage Type";
      const school=wantedCardValues?.school?.index;
      
    //console.log(correcAnswerValues)


// Correct Answer Spell Values
    const correctCastingTime= correctAnswerValues.casting_time;
    const correctLevel=correctAnswerValues.level;
    const correctRange=correctAnswerValues.range;
    const correctDamage=correctAnswerValues.damage?.damage_at_character_level?.[1]??correctAnswerValues.damage?.damage_at_slot_level?.[correctAnswerValues?.level]??"No Damage";
    const correctDamageType=correctAnswerValues.damage?.damage_type?.index??"No Damage Type";
    const correctSchool=correctAnswerValues?.school?.index;

    //console.log("Values of the Correct ANSWER",correctClasses,correctVSMComponents)



    let guessObject=[
        castingTime,level,range,damage,damageType,classValues,vsmComponents,school
    ];
    //console.log(guessObject);




    const correctAnswersObject=[
        correctCastingTime,correctLevel,correctRange,correctDamage,correctDamageType,correctClasses,correctVSMComponents,correctSchool
    ];

    

  //console.log("CorrectANSWER",correctAnswersObject,"Guess",guessObject);
  //console.log("HEEEER", correctAnswersObject.map(element=>{return typeof element}))

   

    function compareValues(answer,guess){
        if(typeof answer=="string"){
            if(answer==guess){
            return "Identical" }
            else{
                return "Wrong"
            }

        }
        if(typeof answer=="number"){
            if(answer==guess){
            return "Identical" }
            else if(guess>answer){
                return "Lower";
            }
            else{
                return "Higher";
            }

        }
        if(typeof answer=="object"){
            if(JSON.stringify(answer)==JSON.stringify(guess)){
            return "Identical" }
            const hasCommon= answer.some(val=>guess.includes(val));
            if(hasCommon){ return "Partial";
        
      }
            return "Wrong";

        }
    }


   
    
    
    function compareSpellToAnswer(chosenSpell,answerSpell){
    let temporary=[];
    
     for(let i=0; i<answerSpell.length; i++){ 
    temporary.push(compareValues(answerSpell[i],chosenSpell[i]))}
    
    if(temporary.every(result=>result==="Identical")&& !winConditionMet){
        setWinConditionMet(true)
        


    }
    
        return temporary;
    
    }



  
       
    
   const valuesOfIdenticality = useMemo(()=>{
        if(!correctAnswersObject || !guessObject) return [];
   
    return compareSpellToAnswer(correctAnswersObject,guessObject);}
    ,[correctAnswersObject,guessObject]);

/* This Right here is just  candy, want the flip effect.
    useEffect(()=>{
        if(winConditionMet){
        confetti({
            spread:500,
            particleCount:500,
            origin:{x:0.5,y:1},
            disableForReducedMotion:true
        })}

    })*/




    if(winConditionMet){
        console.log("DU VANT!!!!!!");
    }
    
    console.log(valuesOfIdenticality);
        //these two ifs have apperantly been giving me lots of headaches and been the causes of many runtime errors. The "different amounts of renders errors"
    if(isLoading) return <p>Loading...</p>
    if(error) return <p>error</p> 

    return(<>
    <div className="headline">
         <h4>{indexName}</h4>
         
     </div>
  
    <div className="Gameboard">
                   
                   <GameCard cardValue={castingTime} compareValue={valuesOfIdenticality[0]}></GameCard>
                    <GameCard cardValue={`Level ${level}`} compareValue={valuesOfIdenticality[1]}></GameCard>
                   <GameCard cardValue={range} compareValue={valuesOfIdenticality[2]}></GameCard>
                   <GameCard cardValue={damage} compareValue={valuesOfIdenticality[3]}></GameCard>
                   <GameCard cardValue={damageType} compareValue={valuesOfIdenticality[4]}></GameCard>
                   <GameCard cardValue={classValues} compareValue={valuesOfIdenticality[5]}></GameCard>
                   <GameCard cardValue={vsmComponents} compareValue={valuesOfIdenticality[6]}></GameCard>
                   <GameCard cardValue={wantedCardValues?.school?.index}compareValue={valuesOfIdenticality[7]}></GameCard>
                  
                
                    

                 
                   
               
                 

       
   



    </div>
    </>)
    
    
   
}