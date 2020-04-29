import React from 'react'

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