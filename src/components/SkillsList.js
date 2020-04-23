import React from 'react'
import { useUser } from "./UserProvider"
import { getUserSkills } from './Backend'


const SkillsList = props => {

    return (
        <div>
        {props.skills.map(s => { 
            return(<li key={s}>{s}</li>)
        })}
        </div>
    )
}

export default SkillsList