import { useState, useEffect } from 'react'
import {db} from '../../services/firebase'


async function CheckCanApply(uid, project_ref){
    
    //check if user already applied
    let app_ref_proj = db.collection('applications')    
    let matching_usr_app_promise = await app_ref_proj.where('user', '==', uid).where('project','==',project_ref).get()
    let matching_usr_app = await matching_usr_app_promise.docs.map(x => x.data().user)

    //check if user is member
    let m_ref_proj = db.collection('projects').doc(project_ref.id).collection('members');
    let matching_m_promise = await m_ref_proj.where('user', '==', db.doc(`users/${uid}`)).get()
    let matching_m = await matching_m_promise.docs.map(x => x.data().user)

    //check if user is owner
    let proj_owner = await db.collection('projects').doc(project_ref.id).get().then(doc => {
        if(doc.exists){
            return doc.data().owner
        }
    })
    
    let uidIsOwner = (proj_owner == uid) ? true : false;    

    return (matching_m.length === 0 && matching_usr_app.length === 0 && !uidIsOwner && uid)
}

export default CheckCanApply