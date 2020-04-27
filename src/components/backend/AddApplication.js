import React, { useState, useEffect} from "react"
import CheckCanApply from './CheckCanApply'
import {db} from '../../services/firebase'

async function AddApplication (uid, project_ref){
    //allows a user to apply for a project  
    let date = new Date();
    let timestamp = date.getTime();
    let readTime = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timestamp)

    if(await CheckCanApply(uid,project_ref)){
        db.collection('applications').add({user:uid,project:project_ref,date:readTime}).then(()=>{
            console.log("ADDED APPLICATION");
        })
    }
    else{
        console.log("USER ALREADY APPLIED");
        console.log(project_ref.id)
    }
}

export default AddApplication