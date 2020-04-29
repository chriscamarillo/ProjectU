import React from "react"
import { useUser } from '../components/backend/UserProvider'
import { Link } from "react-router-dom"

// import components here
import CreateProject from '../components/backend/CreateProject'
import GetMyProjects from '../components/backend/GetMyProjects'
// Moved GetMyProjects

const MyProjects = () => {
    // Backend call
    const projects =  GetMyProjects(useUser().uid)
    
    return(
        // Components for these project entries would make these messy links easier
        // to organize and style
        <div class = "CreateProjectPage">
            <CreateProject />
            <h1>My Projects</h1>
            <ul>
                {projects.map((project,i)=>
                    <li key={i}>
                        <Link to={`/projects/${project.id}`}><h2>{project.title}</h2></Link>
                        <p>{project.description}</p>
                        <Link to={`/delete/project/${project.id}`}>delete</Link>
                    </li>
                    //project component should replace this
                )}
            </ul>
        </div>
    )
}
export default MyProjects