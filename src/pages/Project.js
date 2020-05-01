import React from "react"
import { useUser } from '../components/backend/UserProvider'
import { useParams, Link } from "react-router-dom";
import GetProject from './../components/backend/GetProject'
import Thread from '../components/frontend/Thread'
import MemberList from "../components/frontend/MemberList";
import '../styles/Project.css'
import ApplicantList from "../components/frontend/ApplicantList";
import GetApplicants from "../components/backend/GetApplications"
const Project = (props) => {
    const pid = useParams().pid
    const currentUser = useUser() || {uid: null}

    // Backend call
    //let project = GetProject(pid);
    let details = (props.location.state) ? (props.location.state) : GetProject(pid).details
    let apps = (pid) ? GetApplicants(pid) : [];
    // let members = project.members;
    // let thread = project.thread;
    
    if(details){
        // TODO: get the rest of the details (collaborator list and thread)
        if(currentUser.uid === details.owner){
            return(
                <div className="Project">
                    <h1>{details.title}</h1>
                    <div className="text">
                    <p>{details.description}</p>
                    </div>
                    {(details.status) ? <h3>Status: Open</h3> : <h3>Status: Closed</h3>}
                    <div className="margin">
                    <Link to={{pathname: "/edit/project/" + pid, project: details,}}>Edit Project</Link>
                    </div>
                    {/* <Thread thread={project.thread}/>
                    <MemberList members={members} /> */}
                    {(apps) ? <ApplicantList apps={apps} /> : <></>}

                </div>

            )
        }else{
            return(
                <div className="Project">
                    <h1>{details.title}</h1>
                    <div className="text">
                    <p>{details.description}</p>
                    </div>
                    {(details.status) ? <h3>Status: Open</h3> : <h3>Status: Closed</h3>}
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