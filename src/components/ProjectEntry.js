import React from 'react'
import { useUser } from '../components/UserProvider'
import { Link } from 'react-router-dom'
import '../styles/ProjectEntry.css'
import {AddApplication} from './Backend'
import { firestore } from 'firebase';


const ProjectEntry = props => {
    
    // Some fake styling code you can mess with
    const currentUser = useUser() || {uid: null}
 
    return (
        <div className='ProjectEntry'>
            <Link to={`projects/${props.id}`}><h2>{props.title} </h2></Link>
            <p>{props.description}</p>
            <Link to={`/users/${props.owner}`}><h4>posted by {props.createdBy}</h4></Link>
            <button onClick={e => AddApplication(currentUser.uid, firestore().doc(`projects/${props.id}`))}>Apply</button>
         </div>
    )
}

export default ProjectEntry;