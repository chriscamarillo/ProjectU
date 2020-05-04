import React, { useState, useEffect } from "react"
import { useUser } from '../components/backend/UserProvider'
import { useParams, Link } from "react-router-dom"
import Thread from '../components/frontend/Thread'
import MemberList from "../components/frontend/MemberList"
import ApplicantList from '../components/frontend/ApplicantList'
import { GetDetails, IsMember } from '../components/backend/GetProject'

import '../styles/Project.css'

const Project = (props) => {
    const pid = useParams().pid
    const currentUser = useUser() || { uid: null }
    const details = GetDetails(pid)
    const memberView = IsMember(currentUser.uid, pid) // dirty state changes :D
    const ownerView = currentUser.uid && details.owner == currentUser.uid
    console.log(memberView == true || ownerView == true)
    if (details) {
        // TODO: get the rest of the details (collaborator list and thread)
        // if(currentUser.uid === details.owner){
        return (
            <div className="justify-content-md-center">
                <div className="Project card row">
                    <h1>{details.title}</h1>
                    <div className="text">
                        <p>{details.description}</p>
                    </div>
                    {(details.status) ? <h3 className="open-status">Status: Open</h3> : <h3>Status: Closed</h3>}
                    <div className="margin">
                        <Link to={{ pathname: "/edit/project/" + pid, project: details }}>Edit Project</Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-auto media" >
                        <div className="card-header">
                            <h2>Members</h2>
                        <MemberList pid={pid} />
                        </div>
                    </div>
                    {(ownerView) ?
                    <div className="col-md-auto">
                        <div className="card-header">
                            <h2>Applications</h2>
                        </div>
                        <ApplicantList pid={pid} title={details.title} />
                    </div> : <></>}
                    {(ownerView || memberView) ? // only show thread if you are a member or owner
                    <div className=" col">
                        <Thread pid={pid} ownerView={ownerView} />
                    </div> : <></>}
                </div>
            </div>
        )

    } else {
        return (
            <h1>Loading...</h1>
        )
    }


}
export default Project