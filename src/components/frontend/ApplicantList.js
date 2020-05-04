import React, { useState, useEffect } from 'react'
import Applicant from './Applicant'
import { GetApps } from '../backend/GetProject'
import '../../styles/Project.css'

const ApplicantList = (props) => {
    const apps = GetApps(props.pid)
    console.log('re rendered applications')
    return (
        (apps) ?
            <ul className="lapp">
                {(apps) ?
                    apps.map((application, i) => (
                        <ul className="listapp" key={i}>
                            <Applicant application={application} title={props.title} />
                        </ul>
                    )) : <></>
                }
            </ul> :
            <p>Loading Applications...</p>
    )
}

export default ApplicantList;