import React from 'react'
import '../../../styles/EditProfile.css'
import Logo from '../../../../src/Logo.png'
const ProfileForm = (props) =>{
    const user = props.user
    console.log(props)
    return(
        <div className= 'EditProfile'>
        <img src= {Logo}/>
        <h5><i>A better form component now</i></h5>
        <h3>Edit Profile</h3>
        <h1>{user.displayName}</h1>
            <form onSubmit={props.handleSubmit}>
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
            </form>
        </div>
    )
}

export default ProfileForm

