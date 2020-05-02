import React from 'react'
import { Link } from 'react-router-dom'
import Applicant from './Applicant'
import '../../styles/Application.css'

const ApplicantList = (props) => {

    return (
        <div className="container">
            <ul className="applicant-list">
            {(props.apps) ?
                props.apps.map((application, i) => (
                    <li key={i}>
                        <Applicant application={application} proj_id={props.proj_id} owner={props.owner}/>
                    </li>   
                )) : <></>
            }
            </ul> 
        </div> 
    )
}

export default ApplicantList;