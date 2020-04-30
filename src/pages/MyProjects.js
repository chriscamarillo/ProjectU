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
                   <Card style ={{ width: '18rem', display: 'flex', flexDirection: 'row'}}>
                    <ul key={i}>
                        <Card.Body>
                            <Card.Title>{project.title}</Card.Title>
                            <Card.Text>{project.description}</Card.Text>
                            <Card.Link href={`/projects/${project.id}`}>Go To Project</Card.Link>
                            <Card.Link href={`/delete/project/${project.id}`}>Delete</Card.Link>
                        </Card.Body>
                        </ul>
                    </Card>
                    //project component should replace this
                )}
            
           {/* <ul>
                {projects.map((project,i)=>
                    <li key={i}>
                        <Link to={`/projects/${project.id}`}><h2>{project.title}</h2></Link>
                        <p>{project.description}</p>
                        <Link to={`/delete/project/${project.id}`}>delete</Link>
                    </li>
                    //project component should replace this
                )}
                </ul> */}
            </div>
        </div>
    )
}
export default MyProjects