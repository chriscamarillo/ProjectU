import React from 'react'
import '../../../styles/EditProfile.css'

const ProfileForm = (props) =>{
    const user = props.user
    return(
        <div className= 'EditProfile'>
        
        <h5><i>A better form component now</i></h5>
        <h3>Edit Profile</h3> 
        <h1>{user.displayName}</h1>
        <div>
            <img src={user.photoURL}  alt="profile" width="200" height="200"></img>
            Bio
                <input type="text" placeholder={user.bio} name="bio" ref={props.register}></input>
            <br />
            Contact Email
                <input type="text" placeholder={user.contactEmail} name="email" ref={props.register}></input>
            <br />
            Resume Link
                <input type="text" placeholder={user.resumeLink} name="resume" ref={props.register}></input>
            <br />
                <input type ="submit" />
        </div>
        </div>
    )
}

export default ProfileForm

