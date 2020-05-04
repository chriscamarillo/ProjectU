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
                    <textarea type="text" id="titleInput" name="title" contentEditable="true" ref={props.register}>{project.title}</textarea>
                </div>   
                    <p>{props.errors.title && '*Project title is required'}</p>
                <div class="form-group">
                    <label for="projectDescription">Project Description</label>
                    <textarea type="text" id="descriptionInput" name="description" contentEditable="true" ref={props.register}>{project.description}</textarea>
                </div>
                <p>{props.errors.description && '*Project description is required'}</p>
        
        <h2>Manage Threads</h2>
        <div className="threads">
            <ul>
                {props.fields.map((item, index) => (
                //console.log(item)
                // console.log("this is skills ", skills)
                
                    <ul key={item.id}>
                    <input class="title"
                        name={`threads[${index}].title`}
                        placeholder={"thread title"}
                        defaultValue={`${item.title}`} // make sure to set up defaultValue
                        ref={props.register}
                    />
                    <input class="description"
                        
                        name={`threads[${index}].description`}
                        placeholder={"description"}
                        //defaultValue={`${item.description}`} // make sure to set up defaultValue
                        ref={props.register}
                    />
                    <button type="button" id="delete" onClick={() => props.remove(index)}>
                        Delete
                    </button>
                    </ul>
                
                ))}
            </ul>
            <section>
                <button
                type="button" id="addThread"
                onClick={() => {
                    props.append({ title:"", description: "" });
                }}
                >
                Add Thread
                </button>
            </section>
           
            <button type ="submit" class="btn btn-primary">Submit</button>
            </div> 
            </form>
            </div>
        
        
    )
}

export default ProjectForm

