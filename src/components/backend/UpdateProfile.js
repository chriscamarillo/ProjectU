import React from 'react'
import {db} from '../../services/firebase'

/*
    Pass the user object and an object containing fields to update.
*/
const UpdateProfile = (user, fields) => {
    if (user) {
      db
        .collection("users").doc(user.uid)
        .update(fields)
    }
}

export default UpdateProfile;