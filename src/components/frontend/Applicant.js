import React from 'react'
import { Link } from 'react-router-dom'

const Applicant = (props) => {
    return (
        <div className="applicant">
            <h3>{props.user} would like to join your project</h3>
            <button class="btn btn-outline-success">Accept</button>
            <button class="btn btn-outline-danger">Decline</button>
        </div>
    )
}

export default Applicant;