import React from 'react'
import ProjectEntry from './ProjectEntry'
import '../styles/ProjectList.css'

const ProjectList = props => {
    if(props.projects){
        return (
            <div className='ProjectList'>
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
            </div>
        )
    }
    else{
        return (<div className='ProjectList'></div>)
    }
    
}

export default ProjectList;