

const BASE_URL="https://www.dnd5eapi.co/api/2014/spells/";

export default function get(endpoint){
    
    return fetch(BASE_URL+endpoint).then(response=>response.json())
    }