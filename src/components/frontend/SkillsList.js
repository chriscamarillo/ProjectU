import React from 'react'
import '../../styles/SkillsList.css'

const SkillsList = props => {
    if (props.skills) {
        return (
            <div className="skills-full">
                <h3>Skills</h3>
                <ul className="skills-list">
                    {props.skills.map(skill => 
                        <li key={skill.id} className="skill">{skill.name}</li>)
                    }
                </ul>
            </div>
        )
    }
    return (
        <></>
    )
}

export default SkillsList