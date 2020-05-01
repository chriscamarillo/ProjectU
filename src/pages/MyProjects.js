import React from "react"
import { useUser } from '../components/backend/UserProvider'
import { Link } from "react-router-dom"
import '../styles/MyProjects.css'
import  { Card } from 'react-bootstrap'

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
        <div>
            <CreateProject />
            <div className='MyProjects'>
            <h1>My Projects</h1>
                {projects.map((project,i)=>
                <div class="card-decks">
                   <div class="card" style ={{ width: '18rem', display: 'flex', flexDirection: 'row'}}>
                    <ul key={i}>
                        
                        <div class="card-body">
                            <h5 class="card-title">{project.title}</h5>
                            <p class="card-text">{project.description}</p>
                            <a href={`/projects/${project.id}`}>Go To Project</a>
                            <a href={`/delete/project/${project.id}`}>Delete</a>
                        </div>
                    </ul>
                    </div>
                    </div>
                    //project component should replace this
                )}
            </div>
        </div>
    )
}
/*

*/
export default MyProjects