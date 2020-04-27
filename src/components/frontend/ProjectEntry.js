import React from 'react'
import { useUser } from '../backend/UserProvider'
import { Link } from 'react-router-dom'
import '../../styles/ProjectEntry.css'
import AddApplication from '../backend/AddApplication'
import { firestore } from 'firebase';


const ProjectEntry = props => {
    
    // Some fake styling code you can mess with
    const currentUser = useUser() || {uid: null}

    const applyButton = <button className= 'margin' onClick={e => 
        AddApplication(currentUser.uid, firestore().doc(`projects/${props.id}`))
        }>Apply</button>;
    
    // not sure how to handle COMPLETED behavior yet.
    return (
        <div className='ProjectEntry'>
            <div className= 'margin'>
                <Link to={`projects/${props.id}`}><h2>{props.title}</h2></Link>
            </div>
            <p>{props.description}</p>
            {(props.canApply && props.owner !== currentUser.uid) ? 
                applyButton : 
                <></>
            }
            {(props.status) ? <h3>Status: Open</h3> : <h3>Status: Closed</h3>}
            <Link to={`/users/${props.owner}`}><h4>posted by {props.createdBy}</h4></Link>
         </div>
    )
}

export default ProjectEntry;