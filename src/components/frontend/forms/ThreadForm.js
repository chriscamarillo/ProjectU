import React from 'react'
import '../../../styles/EditProfile.css'
import { useForm } from "react-hook-form";


const ProjectForm = (props) =>{
    const project = props.project
    return(
        <div>
            <h3>Edit Project</h3>
            <form onSubmit={props.handleSubmit}>
                Title
                <input type="text" name="title" placeholder={project.title} ref={props.register} />
                <p>{props.errors.title && 'Project title is required'}</p>
                Description
                <input type="text" name="description" placeholder={project.description} ref={props.register} />
                <p>{props.errors.description && 'Project description is required'}</p>
                <input type ="submit" />
            </form>
        </div>
    )
}

export default ProjectForm

