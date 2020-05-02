import React, { useState, useEffect} from "react"
import {db} from '../../services/firebase'
import { stat } from '../../services/firebase'

// delete the application
async function remove(application) {
    return db.collection('applications').doc(application.id).delete()
}

function accept(application) {
    let date_added = stat.FieldValue.serverTimestamp();

    remove(application)
    .then(() => {
            // TODO: send notification!
            console.log(`accepted `)
        })

    // add user to members collection
    application.project
      .collection('members').doc(application.user)
      .set({
          date_added,
      });
}

function decline(application) {
    remove(application) // dont tell em.
}

export {accept, decline}