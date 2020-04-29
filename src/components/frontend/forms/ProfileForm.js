import React from 'react'
import { useForm, useFieldArray } from "react-hook-form";
import '../../../styles/EditProfile.css'

const ProfileForm = (props) =>{
    
    const user = props.user
    const skills = props.skills

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
                <input type="text" placeholder={user.resumeLink} name="resumeLink" ref={props.register}></input>
        </div>
        <div className="skills">
            <h2>Qualifications</h2>
            <ul>
                {props.fields.map((item, index) => {
                //console.log(item)
                // console.log("this is skills ", skills)
                return (
                    <li key={item.id}>
                    <input
                        type="hidden"
                        name={`skills[${index}].id`}
                        defaultValue={`${item.id}`} // make sure to set up defaultValue
                        ref={props.register()}
                    />
                    <input
                        id={`${item.id}`}
                        name={`skills[${index}].name`}
                        defaultValue={`${item.name}`} // make sure to set up defaultValue
                        ref={props.register()}
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
                    props.append({ id:"", name: "new skill" });
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

