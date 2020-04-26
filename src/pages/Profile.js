import React, { useState } from "react"
import { useUser } from '../components/backend/UserProvider'
import { useParams } from "react-router";
import { Link } from "react-router-dom"
import ProjectList from '../components/frontend/ProjectList'
import GetProfile from '../components/backend/GetProfile'

const Profile = () => {
    const uid = useParams().uid
    const currentUser = useUser() || {uid: null}

    //accessors for user profile data fields

    let userObj = GetProfile(uid);
    let user = userObj.user;                    //shallow user object
    let skills = userObj.skills;                //skills collection
    let applications = userObj.applications;    //applications collection
    let links = userObj.links;                  //links collection
    let projects = userObj.projects;            //projects collection

    if(user){
        
        return(
            (uid === currentUser.uid)?(
                <div>
                    <div>
                        <h1>my profile</h1>
                        <Link to='/edit/profile'>Edit Profile</Link>
                    </div>
                    <img src={user.photoURL}  alt="profile" width="200" height="200"></img>
                    <p>{user.bio}</p>

                    <h1>My Projects</h1>
                    {/* <ProjectList projects={projects} /> */}
                </div>
            ):(
                <div>
                    <h1>{user.displayName}'s profile</h1>
                    <img src={user.photoURL}  alt="profile" width="200" height="200"></img>
                    <p>{user.bio}</p>

                    <h1>{user.displayName}'s Projects</h1>
                    <ProjectList projects={projects} />
                </div>
                //profile components should replace these divs
            )
        )
    }else{
        return (
            <h1>Loading...</h1>
        )
    }
    
    
}
export default Profile