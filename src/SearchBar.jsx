import "./SearchBar.css"

export default function SearchBar({submitFunction}){
    return <>
    <form onSubmit={submitFunction}>
        <label for="spellname">SpellName</label><br></br>
        <input type="text" name= "spellName" id="spellname"/>
    </form>
    
    </>

}