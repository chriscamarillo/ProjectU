import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { GetProjects } from '../components/Backend'
import SearchBar from '../components/SearchBar'
import ProjectList from '../components/ProjectList'
import algoliasearch from 'algoliasearch'
import { algoliaConfig } from '../services/config'

const Discover = () => {
  // state management
  const [text, setText] = useState('')
  const [projects, setProjects] = useState([])
  // const projects = GetProjects()
  
  function handleTextChange(e) {
    setText(e.target.value);
  }
  
  // Search bar functionality 
  useEffect(() => {
    const searchClient = algoliasearch(algoliaConfig.appID, algoliaConfig.searchOnlyKey)
    const index = searchClient.initIndex('projects')
    index.search(text).then(results => {
      setProjects(results.hits); 
    });
  }, [text]);
  
  return (
    <div>
       <div className='searchArea'>
            <h1>discover new projects</h1>
            <SearchBar text={text} handleTextChange={handleTextChange} />
            <ProjectList projects={projects} />
        </div>
    </div>
  )
}
export default Discover