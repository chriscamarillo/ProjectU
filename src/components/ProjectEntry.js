import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/ProjectEntry.css'

const ProjectEntry = props => {
    
    // Some fake styling code you can mess with
 
    return (
        <div className='ProjectEntry'>
            <Link to={`projects/${props.id}`}><h2>{props.title} </h2></Link>
            <p>{props.description}</p>
            <Link to={`/users/${props.owner}`}><h4>posted by {props.createdBy}</h4></Link>
            <button>Apply</button>
         </div>
    )
}

export default ProjectEntry;