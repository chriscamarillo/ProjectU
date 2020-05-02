import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../../services/firebase'
import { accept, decline } from '../backend/DecideApplicant'

const Applicant = (props) => {
    // Get shallow profile info for display
    const application = props.application;
    const [info, setInfo] = useState();

    useEffect(() => {
        db.collection('users').doc(application.user).get().then((shallow_info) => {
            setInfo({uid: application.user, ...shallow_info.data()});
        })
    }, [application]);
    
    function handleSubmit(e, take_applicant) {
        e.preventDefault();
        (take_applicant) ? accept(application) : decline(application);
    }
    
    return (
        (info) ?
        <div className="applicant">
            <h3>{info.displayName} would like to join your project</h3>
            <Link to={`/users/${info.uid}`}>Go to Profile</Link>
            <button className="btn btn-outline-success" onClick={(e) => handleSubmit(e, true)}>Accept</button>
            <button className="btn btn-outline-danger" onClick={(e) => handleSubmit(e, false)}>Decline</button>
        </div>:
        <h1>Loading...</h1>
    )
}

export default Applicant;