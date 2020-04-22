import React from 'react'
import { Link } from 'react-router-dom'

const ProjectEntry = props => {
    
    return (
        <div>
            <Link to={`projects/${props.id}`}><h2>{props.title}</h2></Link>
            <p>{props.description}</p>
            <Link to={`/users/${props.owner}`}><h4>posted by {props.createdBy}</h4></Link>
         </div>
    )
}

export default ProjectEntry;