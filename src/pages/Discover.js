import React, { useState, useEffect } from "react"
import SearchBar from '../components/frontend/SearchBar'
import ProjectList from '../components/frontend/ProjectList'
import ProjectEntry from '../components/frontend/ProjectEntry'
import algoliasearch from 'algoliasearch'
import { algoliaConfig } from '../services/config'
import Logo1 from '../Logo1.png'
import '../styles/Discover.css'

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
    <div className='Discover'>
        <div className="jumbotron jumbotron-fluid logo">
           <img src={Logo1} id="logo" />
        </div>
        <h2 id="logo-text">ProjectU</h2>
        <SearchBar text={text} handleTextChange={handleTextChange} />
        <ProjectList projects={projects} canApply={true}/>
    </div>
  )
}
export default Discover