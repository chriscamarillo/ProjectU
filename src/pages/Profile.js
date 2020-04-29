import React, { useState } from "react"
import { useUser } from '../components/backend/UserProvider'
import { useParams } from "react-router";
import { Link } from "react-router-dom"
import ProjectList from '../components/frontend/ProjectList'
import SkillsList from '../components/frontend/SkillsList'
import GetProfile from '../components/backend/GetProfile'
import '../styles/Profile.css'


const Profile = () => {
    const uid = useParams().uid
    const currentUser = useUser() || {uid: null}

    //accessors for user profile data fields

    let userObj = GetProfile(uid);
    let user = userObj.user;                    //shallow user object
    let skills = userObj.skills;                //skills collection
    let links = userObj.links;                  //links collection
    let projects = userObj.projects;            //projects collection
    
    let match = uid == currentUser.uid
    console.log(skills)
    if(user){
        
        return(
            <div className='Profile'>
                <div className= 'information'>
                    <div className="profile-card">
                        <img src={user.photoURL}  alt="profile" width="200" height="200"></img>
                        {(match)?(
                            <>
                                <h1>My Profile</h1>
                                <Link to={{pathname: "/edit/profile/", skills: skills}}>Edit Profile</Link>
                            </>
                        ):<h1>{user.displayName}</h1>
                        }
                        <p>{user.bio}</p>
                    </div>
                    <SkillsList skills={skills} />
                </div>
                <div className='projects-section'>
                    <h1>Projects</h1>
                    <ProjectList projects={projects} />
                </div>
            </div>
        )
    }else{
        return (
            <h1>Loading...</h1>
        )
    }
    
    
}
export default Profile