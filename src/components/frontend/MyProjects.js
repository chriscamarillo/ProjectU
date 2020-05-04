import React from 'react'
import GetMyProjects from '../backend/GetMyProjects'

const MyProjects = (props) => {
    const projects = props.projects;
    return (
        (projects) ?
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
        </div> :
        <p>Loading My Projects...</p> 
    )
}

export default MyProjects;