import "./QueryComponentTest.css";
import {useState} from "react"
import get from "./fetcher";
import GameCard from "./GameCard"

export default function QueryComponentTest({indexName}){
     return<>
        <div className="QueryComponentTest">
            <p>Does</p></div>
            <GameCard cardValue={indexName}></GameCard>

        </>


}