import React, { useState } from "react";
import { db } from '../services/firebase'
import { algoliaConfig } from '../services/config'
import algoliasearch from 'algoliasearch';

function SearchBar(props) {

    function handleTextChange(e) {
        e.preventDefault()
        props.handleTextChange(e.target.value)
    }

    return(    
        <input type = "text" placeholder = "Search Bar" value={props.text} onChange={props.handleTextChange}/>         
    );
}
export default SearchBar;