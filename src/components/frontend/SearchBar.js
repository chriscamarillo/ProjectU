import React, { useState } from "react";
import { db } from '../../services/firebase'
import { algoliaConfig } from '../../services/config'
import algoliasearch from 'algoliasearch';
import '../../styles/SearchBar.css'

function SearchBar(props) {

    function handleTextChange(e) {
        e.preventDefault()
        props.handleTextChange(e.target.value)
    }

    return(    
        <div className='SearchBar'>
            <input type = "text" placeholder = "Discover New Projects" value={props.text} onChange={props.handleTextChange}/>         
        </div>
    );
}
export default SearchBar;