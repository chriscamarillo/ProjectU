import React from 'react'
import { Link } from 'react-router-dom'

const ThreadEntry = props => {
    
    return (
        <div>
            <Link to={`projects/${props.id}/thread/`}><h2>From: {props.from}</h2></Link>
            <h5>{props.date}</h5>
            <p><h4>{props.msg}</h4></p>
         </div>
    )
}

export default ThreadEntry;