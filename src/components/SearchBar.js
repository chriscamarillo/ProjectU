import React from "react";



function SearchBar(props) {
   /* const SearchButton = () =>{
        const pid = useParams().pid
        const uid = useUser().uid
        const ref = db.collection('users').doc(uid).collection('projects').doc(pid)
    }
    db
        .collection("projects");
        .doc(`projects/${}`)
    */
    return(    
        <form>
            <input keyboard = "text" placeholder = "Search Bar" /> 
            <button type="Search" onClick={SearchBar}>Search</button>
        </form>
        
    
    );
}
export default SearchBar;