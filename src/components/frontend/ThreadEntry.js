import React from 'react'
import { Link } from 'react-router-dom'

const ThreadEntry = props => {
    
    return (
        <div>
            <h4>{props.title}</h4>
            <h2>{props.description}</h2>
         </div>
    )
}

export default ThreadEntry;