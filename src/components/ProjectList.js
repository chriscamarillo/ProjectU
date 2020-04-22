import React from 'react'
import ProjectEntry from './ProjectEntry'

const ProjectList = props => {
    return (
        <ul>
        {props.projects.map((entry,i)=>
            <li key={i}>
                <ProjectEntry // Based on Schema
                    id={entry.id}
                    title={entry.title} 
                    description={entry.description}
                    createdBy={entry.createdBy}
                    owner={entry.owner}
                />
            </li>
         )}
         </ul>
    )
}

export default ProjectList;