import React, { useState, useEffect } from 'react'
import { db } from '../../services/firebase'


async function AddNotification(uid, message, target) {
    let ref = db.collection('users').doc(uid).collection('notifications')
    let add = await ref.add({message:message, target:target})
    console.log('added notification for ', uid, ' containing ', {message:message, target:target})
}

async function RemoveNotification(uid, nid) {
    let ref = db.collection('users').doc(uid).collection('notifications')
    let rem = await ref.doc(nid).delete()
    console.log('deleted notification for ', uid)
}

function  GetNotifications(uid) {
    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        let notificationsArr = []
        let ref = db.collection('users').doc(uid).collection('notifications')
        // Listen for updates
        const unsubscribe = ref.onSnapshot(snapshot => {
            snapshot.forEach(doc => {
                notificationsArr.push({ id: doc.id, ...doc.data() })
                setNotifications(notificationsArr)
            })
            console.log('new notification recieved!')
            
        });

        return () => unsubscribe();
    }, [uid])

    return notifications;
}

export {AddNotification, RemoveNotification, GetNotifications}