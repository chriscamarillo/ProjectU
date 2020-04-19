import React, { useState, useEffect } from "react"
import { db } from '../services/firebase'
import { Link } from "react-router-dom"
function GetProjects(){
    const [projects, setProjects] = useState([])
    useEffect(()=>{
        const unsubscribe = 
        db
            .collection('projects')
            .onSnapshot((snapshot)=> {
                const newProjects = snapshot.docs.map((project)=>({
                    id: project.id,
                    ...project.data()
                }))
                setProjects(newProjects)
            })
        return () => unsubscribe()
    },[])
    return projects
}

const Discover = () => {
  const projects = GetProjects()

  return (
    <div>
        <h1>discover new projects</h1>
        <ul>
            {projects.map((project,i)=>
               <li key={i}>
                   <Link to={`projects/${project.id}`}><h2>{project.title}</h2></Link>
                   <p>{project.description}</p>
                   <Link to={`/users/${project.owner}`}><h4>posted by {project.createdBy}</h4></Link>
                </li>
            )}
        </ul>
    </div>
  )
}
export default Discover