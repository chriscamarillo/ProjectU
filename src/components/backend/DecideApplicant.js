import React, { useState, useEffect} from "react"
import {db} from '../../services/firebase'

// delete the application
async function remove(application) {
    return db.collection('applications').doc(application.id).delete()
}

function accept(application) {
    let date = new Date();
    let timestamp = date.getTime();
    let readTime = new Intl.DateTimeFormat('en-US', 
        {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'})
        .format(timestamp)

    remove(application)
    .then(() => {
            // TODO: send notification!
            console.log(`accepted `)
        })

    // add user to members collection
    application.project
      .collection('members').doc(application.user)
      .set({
          date_added: readTime,
      });
}

function decline(application) {
    remove(application) // dont tell em.
}

export {accept, decline}