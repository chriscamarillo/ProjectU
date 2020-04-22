import React from "react"
import { useUser } from '../components/UserProvider'
import { useParams, Link } from "react-router-dom";
import { GetProject } from './../components/Backend'

const Project = () => {
    const pid = useParams().pid
    const currentUser = useUser() || {uid: null}
    
    // Backend call
    let details = GetProject(pid);

    // need this to be all located in some other file for styling 
    let someStyle = {
        color: '#d4af37'
    }
    if(details){
        // TODO: get the rest of the details (collaborator list and thread)
        if(currentUser.uid === details.owner){
            return(
                <div>
                    <h2>{details.title}</h2>
                    <p>{details.description}</p>
                    <h1 style={someStyle}>THIS IS MY PROJECT!</h1>
                    <Link to={`/edit/project/${pid}`}>Edit Project</Link>

                </div>

            )
        }else{
            return(
                <div>
                    <h2>{details.title}</h2>
                    <p>{details.description}</p>
                    <h4>posted by <Link to={`/users/${details.owner}`}>{details.createdBy}</Link></h4>
                </div>
            )
        }
        
    }else{
        return (
            <h1>Loading...</h1>
        )
    }
    
    
}
export default Project