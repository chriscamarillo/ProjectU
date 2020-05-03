import React, {useEffect, useLayoutEffect, useState } from 'react'
import { useUser } from '../backend/UserProvider'
import { Link } from 'react-router-dom'
import '../../styles/ProjectEntry.css'
import AddApplication from '../backend/AddApplication'
import { firestore } from 'firebase';
import CheckCanApply from '../backend/CheckCanApply'

const ProjectEntry = props => {    
    // Some fake styling code you can mess with
    const currentUser = useUser() || {uid: null}
    const [usrCanApply, setCanApply] = useState(false)

    useLayoutEffect(() => {
        async function canUsrApply(uid,proj_ref){
            setCanApply(await CheckCanApply(uid,proj_ref))
        }
        canUsrApply(currentUser.uid, firestore().doc(`projects/${props.id}`))
    }, [props.id])
    
    const applyButton = 
    (!usrCanApply) 
        ? 
        <div></div> 
        : 
        (<button className= 'margin' onClick={
                function(e){
                    AddApplication(currentUser.uid, firestore().doc(`projects/${props.id}`), props.owner, props.title);
                    setCanApply(false);
                }   
            }
        >Apply</button>) 

    
    
    // not sure how to handle COMPLETED behavior yet.
    return (
        <div className='ProjectEntry'>
            <div className= 'margin'>
                <Link to={{pathname: "/projects/" + props.id, state: props}}><h2>{props.title}</h2></Link> 
            </div>
            <p>{props.description}</p>
            {(props.status) ? <h3>Status: Open</h3> : <h3>Status: Closed</h3>}
            <div className="line">
            {
                applyButton 
            }
            <Link to={`/users/${props.owner}`}><h4>posted by {props.createdBy}</h4></Link>
            
            </div>
       </div>
    )
}

export default ProjectEntry;