import React from "react";
import { db } from '../services/firebase'


function SearchBar(props) {
//    const SearchButton = () =>{
//         const pid = useParams().pid
//         const uid = useUser().uid
//         const ref = db.collection('users').doc(uid).collection('projects').doc(pid)
//         db
//         .collection("projects");
//         .doc(`projects/${}`)
//     }

        return(    
        <form>
            <input keyboard = "text" placeholder = "Search Bar" /> 
            <button type="Search" onClick={SearchButton}>Search</button>
        </form>
        
    
    );
}
export default SearchBar;