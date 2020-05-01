import React from 'react'
import { Link } from 'react-router-dom'
import Applicant from './Applicant'
import '../../styles/Application.css'

const ApplicantList = (props) => {

    return (
        <div className="container">
            <ul className="applicant-list">
            {(props.apps) ?
                props.apps.map((applicant, i) => (
                    <li key={i}>
                        <Applicant user={applicant.user} date={applicant.date} project={applicant.id} />
                    </li>   
                )) : <></>
            }
            </ul> 
        </div> 
    )
}

export default ApplicantList;