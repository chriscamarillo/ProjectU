import React, { useState, useEffect } from 'react'
import Applicant from './Applicant'
import { GetApps } from '../backend/GetProject'
import '../../styles/Application.css'

const ApplicantList = (props) => {
    const apps = GetApps(props.pid)
    console.log('re rendered applications')
    return (
        (apps) ?
        <div className="container">
            <ul className="applicant-list">
                {(apps) ?
                    apps.map((application, i) => (
                        <li key={i}>
                            <Applicant application={application} title={props.title} />
                        </li>
                    )) : <></>
                }
            </ul>
        </div>:
        <p>Loading Applications...</p>
    )
}

export default ApplicantList;