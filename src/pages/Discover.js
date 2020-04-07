import React, { useState, useEffect } from "react"
import { db } from '../services/firebase'

function GetProjects(){
    const [projects, setProjects] = useState([])
    useEffect(()=>{
        db
            .collection('projects')
            .onSnapshot((snapshot)=> {
                const newProjects = snapshot.docs.map((project)=>({
                    id: project.id,
                    ...project.data()
                }))
                setProjects(newProjects)
            })
    },[])
    return projects
}

const Discover = () => {
  const projects = GetProjects()

  return (
    <div>
        <h1>discover!</h1>
        <ul>
            {projects.map((project,i)=>
               <li key={i}>
                   <h2>{project.title}</h2>
                   <p>{project.description}</p>
                   <h4>posted by {project.createdBy}</h4>
                </li>
            )}
        </ul>
    </div>
  )
}
export default Discover