import React from "react"
import { useUser } from '../components/backend/UserProvider'
import { useParams, Link } from "react-router-dom";
import GetProject from './../components/backend/GetProject'
import Thread from '../components/frontend/Thread'
import MemberList from "../components/frontend/MemberList";

const Project = (props) => {
    const pid = useParams().pid
    const currentUser = useUser() || {uid: null}

    // Backend call
    let project = GetProject(pid);

    let details = project.details
    let apps = project.apps;
    let members = project.members;
    let thread = project.thread;

    // This function will run batch reads and gather
    // information for each applicant and member in order
    // to display them as a list

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
                    {(details.status) ? <h3>Open</h3> : <h3>Closed</h3>}
                    <Thread thread={project.thread}/>
                    <MemberList members={members} />
                    <Link to={{pathname: "/edit/project/" + pid, project: project,}}>Edit Project</Link>

                </div>

            )
        }else{
            return(
                <div>
                    <h2>{details.title}</h2>
                    <p>{details.description}</p>
                    {(details.status) ? <h3>Open</h3> : <h3>Closed</h3>}
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