import React from 'react'
import { useForm, useFieldArray } from "react-hook-form";
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
        </div>
        <div className="skills">
            <h2>Qualifications</h2>
            <ul>
                {props.fields.map((item, index) => {
                return (
                    <li key={item.id}>
                    <input
                        name={`skills[${index}].skill`}
                        defaultValue={`${item.skill}`} // make sure to set up defaultValue
                        ref={props.register}
                    />
                    <button type="button" onClick={() => props.remove(index)}>
                        Delete
                    </button>
                    </li>
                );
                })}
            </ul>
            <section>
                <button
                type="button"
                onClick={() => {
                    props.append({ skill: "appendBill" });
                }}
                >
                Add Skill
                </button>
            </section>
            <input type="submit" />
        </div>
        </div>
    )
}

export default ProfileForm

