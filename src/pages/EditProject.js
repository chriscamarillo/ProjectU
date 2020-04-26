import React, { useState } from "react"
import { useUser } from '../components/backend/UserProvider'
import { useParams, Link } from 'react-router-dom'
import UpdateProject from '../components/backend/UpdateProject'
import GetProject from '../components/backend/GetProject'

const EditProject = () => {
    const pid = useParams().pid;
    const currentUser = useUser() || {uid: null};

    //console.log(pid + '\t' + currentUser.uid)
    const project = GetProject(pid);
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    function UpdateAndRedirect() {
        let fields = {title, 
                    description, 
                    createdBy: project.createdBy, 
                    owner: project.owner} 

        if(title == "")
            fields.title = project.title
        if(description == "")
            fields.description = project.description
        
        UpdateProject(pid, fields)
    } 

    if (currentUser.uid && project) {
        if(project.owner == currentUser.uid) {
            return(
                <div>
                    <h5><i>A better form component later</i></h5>
                    <h3>Edit Project</h3>
                    <form>
                        Title
                        <input type="text" placeholder={project.title}  onChange={e => setTitle(e.target.value)} ></input>
                        Description
                        <input type="text" placeholder={project.description}  onChange={e => setDescription(e.target.value)} ></input>
                    </form>
                    <Link to={`/projects/${pid}`}>
                        <button 
                            onClick={() => UpdateAndRedirect()}
                        >
                                Save Changes
                        </button>
                    </Link>  
                </div>
            )
        }
    }

    return(
        <h1>You don't have permission</h1>
    );
}

export default EditProject