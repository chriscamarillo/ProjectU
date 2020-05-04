import React, { useState, useEffect } from 'react'
import Applicant from './Applicant'
import { GetApps } from '../backend/GetProject'
import '../../styles/Application.css'

const ApplicantList = (props) => {
    const apps = GetApps(props.pid)
    console.log('re rendered applications')
    return (
        (apps) ?
            <ul className="list-group list-group-flush">
                {(apps) ?
                    apps.map((application, i) => (
                        <li className="list-group-item" key={i}>
                            <Applicant application={application} title={props.title} />
                        </li>
                    )) : <></>
                }
            </ul> :
            <p>Loading Applications...</p>
    )
}

export default ApplicantList;