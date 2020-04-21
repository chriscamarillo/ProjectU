import React from "react"
import { Link } from "react-router-dom"
import { GetProjects } from '../components/Backend'

const Discover = () => {
    // Backend call
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