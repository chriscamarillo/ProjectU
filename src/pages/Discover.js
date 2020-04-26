import React, { useState, useEffect } from "react"
import SearchBar from '../components/frontend/SearchBar'
import ProjectList from '../components/frontend/ProjectList'
import ProjectEntry from '../components/frontend/ProjectEntry'
import algoliasearch from 'algoliasearch'
import { algoliaConfig } from '../services/config'
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
        <SearchBar text={text} handleTextChange={handleTextChange} />
        <ProjectList projects={projects} />
    
{/* random section for test code */}
        <div class='Test Area'>
          <h>~~~~~~~~~~~~~~~~~ I Test Stuff Here ~~~~~~~~~~~~~~~~~</h>
          <ProjectEntry title='I test my code here...'
                        owner='some owner'
                        description='let me see if it works haha'
                        createdBy='Me' 
          />

        </div>
    </div>
  )
}
export default Discover