import React, { useState, useEffect } from "react"
import SearchBar from '../components/frontend/SearchBar'
import ProjectList from '../components/frontend/ProjectList'
import ProjectEntry from '../components/frontend/ProjectEntry'
import algoliasearch from 'algoliasearch'
import { algoliaConfig } from '../services/config'
import { useUser } from '../components/backend/UserProvider'
import Logo1 from '../Logo2.png'
import '../styles/Discover.css'
import UpdateProjectTechs from '../components/backend/UpdateProjectTechs.js'

const Discover = () => {
  // state management
  const [text, setText] = useState('')
  const [projects, setProjects] = useState([])
  const user = useUser();
  // const projects = GetProjects()
  
  function handleTextChange(e) {
    setText(e.target.value);
  }
  
  let before = [{id:'ylwT7yhPKRzZmoLpfktt', name:'pipi'}]
  let after = [{id:"ylwT7yhPKRzZmoLpfktt", name:'pipi'},
               {id:"", name: 'caca'}] 
  UpdateProjectTechs('Pq2v96a68SVx0diE4Vmd', before, after)
  
  // Search bar functionality 
  useEffect(() => {
    const searchClient = algoliasearch(algoliaConfig.appID, algoliaConfig.searchOnlyKey)
    const index = searchClient.initIndex('projects')
    index.search(text).then(results => {
      // Don't include your own projects in the discover search
      let newResults = (user && user.uid) ? 
        results.hits.filter((project) => project.owner != user.uid) :
        results.hits;
      setProjects(newResults); 
    });
  }, [text]);
  
  return (
    <div className='Discover'>
        <div className="jumbotron jumbotron-fluid logo">
           <img src={Logo1} id="logo" />
        </div>
        
        <SearchBar text={text} handleTextChange={handleTextChange} />
        <div class='container justify-content-center'>
          <ProjectList projects={projects} canApply={true}/>
        </div>
    </div>
  )
}
export default Discover