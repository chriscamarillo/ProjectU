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
        <div className="data">
            <div className="info">
            <img src={user.photoURL}  alt="profile" width="200" height="200"></img>
            Bio
                <input type="text" id="userInfo" placeholder={user.bio} name="bio" ref={props.register}></input>
            <br />
            Contact Email
                <input type="text" id="userInfo" placeholder={user.contactEmail} name="email" ref={props.register}></input>
            <br />
            Resume Link
                <input type="text" id="userInfo" placeholder={user.resumeLink} name="resumeLink" ref={props.register}></input>
            </div>
            
        </div>
        
        <h2>Qualifications</h2>
        <div className="skills">
            <ul>
                {props.fields.map((item, index) => {
                //console.log(item)
                // console.log("this is skills ", skills)
                return (
                    <ul key={item.id}>
                    <input class="hidden"
                        type="hidden"
                        name={`skills[${index}].id`}
                        placeholder={"New Skill"}
                        defaultValue={`${item.id}`} // make sure to set up defaultValue
                        ref={props.register()}
                    />
                    <input class="newSkill"
                        id={`${item.id}`}
                        name={`skills[${index}].name`}
                        placeholder={"New Skill"}
                        // defaultValue={`${item.name}`} // make sure to set up defaultValue
                        ref={props.register()}
                    />
                    <button type="button" id="delete" onClick={() => props.remove(index)}>
                        Delete
                    </button>
                    </ul>
                );
                })}
            </ul>
            <section>
                <button
                type="button" id="addSkill"
                onClick={() => {
                    props.append({ id:"", name: "new skill" });
                }}
                >
                Add Skill
                </button>
            </section>
            <button type="submit" id="submit"> Submit </button>
        </div>
        </div>
    )
}

export default ProfileForm

