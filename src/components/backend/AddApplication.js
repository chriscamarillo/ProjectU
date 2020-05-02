import React, { useState, useEffect} from "react"
import CheckCanApply from './CheckCanApply'
import { stat } from '../../services/firebase'
import {db} from '../../services/firebase'

async function AddApplication (uid, project_ref){

    if(await CheckCanApply(uid,project_ref)){
      let date_created = stat.FieldValue.serverTimestamp();

        db.collection('applications').add({user:uid,project:project_ref,date:date_created}).then(()=>{
            console.log("ADDED APPLICATION");
        })
    }
    // else{
    //     console.log("USER ALREADY APPLIED");
    //     console.log(project_ref.id)
    // }
}

export default AddApplication