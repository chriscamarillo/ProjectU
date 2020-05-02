import React from 'react'
/*import '../../../styles/EditProfile.css' */
import '../../../styles/ProjectForm.css'

const ProjectForm = (props) =>{
    const project = props.project
    return(
        <div className="ProjectForm">
        <h1>Edit Project</h1>
            <form onSubmit={props.handleSubmit}>
                <div class="form-group">
                    <label for="projectTitle">Project Title</label>
                    <textarea type="text" id="titleInput" name="title" placeholder={project.title} ref={props.register}></textarea>
                </div>   
                    <p>{props.errors.title && '*Project title is required'}</p>
                <div class="form-group">
                    <label for="projectDescription">Project Description</label>
                    <textarea type="text" id="descriptionInput" name="description" placeholder={project.description} ref={props.register}></textarea>
                </div>
                <p>{props.errors.description && '*Project description is required'}</p>
                <button type ="submit" class="btn btn-primary">Submit</button>
            </form> 
        </div> 
    )
}
/*
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
*/
export default ProjectForm

