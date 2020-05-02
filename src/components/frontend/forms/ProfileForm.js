import React from 'react'
import { useForm, useFieldArray } from "react-hook-form";
import '../../../styles/EditProfile.css'

const ProfileForm = (props) =>{
    
    const user = props.user
    const skills = props.skills

    return(
        <div className= 'EditProfile'>
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
        <h2>Qualifications</h2>
        <div className="skills">
            <ul>
                {props.fields.map((item, index) => {
                //console.log(item)
                // console.log("this is skills ", skills)
                return (
                    <ul key={item.id}>
                    <input
                        type="hidden"
                        name={`skills[${index}].id`}
                        placeholder={"New Skill"}
                        defaultValue={`${item.id}`} // make sure to set up defaultValue
                        ref={props.register()}
                    />
                    <input className="newSkill"
                        id={`${item.id}`}
                        name={`skills[${index}].name`}
                        placeholder={"New Skill"}
                        // defaultValue={`${item.name}`} // make sure to set up defaultValue
                        ref={props.register()}
                    />
                    <button type="button" onClick={() => props.remove(index)}>
                        Delete
                    </button>
                    </ul>
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
            <button type="submit"> Submit </button>
        </div>
        </div>
    )
}

export default ProfileForm

