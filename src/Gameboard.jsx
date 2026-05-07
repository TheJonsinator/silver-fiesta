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
        const [correctAnswerValues,setCorrectAnswerValues]=useState({});
        const [correctClasses,setCorrectClasses]=useState([]);
        const [correctVSMComponents,setCorrectVSMComponents]=useState([]);
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



    const guessObject=[
        castingTime,level,range,damage,damageType,classValues,vsmComponents,school
    ];
    //console.log(guessObject);
    const normalizedGuessObject=guessObject.map(element=>Array.isArray(element)? element:[element]);



    const correctAnswersObject=[
        correctCastingTime,correctLevel,correctRange,correctDamage,correctDamageType,correctClasses,correctVSMComponents,correctSchool
    ];

    const normalizedCorrectAnswersObject=correctAnswersObject.map(element=>Array.isArray(element)? element:[element]);

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
            if(answer==guess){
            return "Identical" }
            const hasCommon= answer.some(val=>guess.includes(val));
            if(hasCommon){ return "Partial";
        
      }
            return "Nothing in Common";

        }
    }


     //TEST FOR COMPARE VALUES FUNCTION. NOT NEEDED MOST LIKELY ANYMORE
     /* const testValue=['1 action', 2, '30 feet', 'No Damage', 'No Damage Type', ["wizard"], Array(3), 'transmutation'];
      const testValue2=['1 action', 2, '30 feet', 'No Damage', 'No Damage Type', ["wizard","sorcerer"], Array(3), 'transmutation'];
        
      testValue.forEach((value,i)=>{
        const b= testValue2[i];
        console.log(compareValues(value,b))
      });*/

    
    
    function compareSpellToAnswer(chosenSpell,answerSpell){
    let temporary=[];
    
     for(let i=0; i<answerSpell.length; i++){ 
    temporary.push(compareValues(answerSpell[i],chosenSpell[i]))}
    
    return temporary; }



   // console.log("CorrectANSWER",correctAnswersObject,"Guess",guessObject);
       
    
    useEffect(()=>{
    if(!correctAnswersObject || !guessObject) return; 
    console.log(compareSpellToAnswer(correctAnswersObject,guessObject));}
    ,[correctAnswersObject,guessObject]); 



        //these two ifs have apperantly been giving me lots of headaches and been the causes of many runtime errors. The "different amounts of renders errors"
    if(isLoading) return <p>Loading...</p>
    if(error) return <p>error</p> 

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