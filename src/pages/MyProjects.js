import React from "react"
import { useUser } from '../components/backend/UserProvider'
import '../styles/MyProjects.css'

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
            <div class="container">
                <div class="row">
                {projects.map((project,i)=>
                // <div className="information">
                   <div class="col">
                    <ul id="card" key={i}>
                        <div class="card-body">
                            <h5 class="card-title">{project.title}</h5>
                            <p class="card-text">{project.description}</p>
                            <a id = "project" href={`/projects/${project.id}`}>Go To Project</a>
                            <a id = "delete" href={`/delete/project/${project.id}`}>Delete</a>
                        </div>
                    </ul>
                    </div>
                    // </div>
                    //project component should replace this
                )}
                    </div>
                </div>
            </div>
        </div>
    )
}
/*

*/
export default MyProjects