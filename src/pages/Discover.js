import React, { useState, useEffect } from "react"
import SearchBar from '../components/SearchBar'
import ProjectList from '../components/ProjectList'
import algoliasearch from 'algoliasearch'
import { algoliaConfig } from '../services/config'
import Thread from '../components/Thread'
import ThreadEntry from '../components/ThreadEntry'
import ProjectEntry from '../components/ProjectEntry'


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
            <Thread projects={projects} />
        </div>

        <div>
          {/*<ProjectEntry id="1234" title="Title" description="blah blah blah" createdBy="Melanie" owner="Me"/>*/}
          <ThreadEntry from="Mel1" date="4/23/2020" msg="Hello, world!"/>
          <ThreadEntry from="Mel2" date="4/23/2020" msg="Hello, again!"/>
        </div>
    </div>
  )
}

export default Discover