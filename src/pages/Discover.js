import React, { useState, useContext, useEffect } from "react"
import { db } from '../services/firebase'
import { UserContext } from '../UserProvider'

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
  const user = useContext(UserContext)
  const projects = GetProjects()

  return (
    <div>
        <h1>discover!</h1>
        <ol>
            {projects.map((project)=>
               <li>
                   <h2>{project.title}</h2>
                   <h4>posted by {project.createdBy}</h4>
                   <p>{project.description}</p>
                </li>
            )}
        </ol>
    </div>
  )
}
export default Discover