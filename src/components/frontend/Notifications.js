import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '../backend/UserProvider'
import { db } from '../../services/firebase'
//import GetNotifications from '../backend/GetNotifications.js'


const Notifications = props => {
    const user = useUser()

    //const [notifications, setNotifications] = useState()

    let notificationsArr = []

    function GetNotifications(uid) {
    //useEffect(() =>{
        let ref = db.collection('users').doc(uid).collection('notifications')
        let ooga = ref.get().then(snapshot => {
                snapshot.forEach(doc => {
                    notificationsArr.push({id:doc.id, ...doc.data()})
                })
            })
        //setNotifications(notificationsArr)
    //})

        console.log(notificationsArr)

        return notificationsArr
    }

    async function AddNotification(uid, message, target) {
        let ref = db.collection('users').doc(uid).collection('notifications')
        let add = await ref.add({message:message, target:target})
        console.log('added', {message:message, target:target})
    }

    async function RemoveNotification(uid, nid) {
        let ref = db.collection('users').doc(uid).collection('notification')
        let rem = await ref.doc(nid).delete()
        console.log('delete', nid)
    }

    return (
        <div className="Notifications">
            <button onClick={GetNotifications(user.uid)}>Notifications</button>
            <button onClick={AddNotification(user.uid, 'message', 'this is the target')}>Add</button>
            <button onClick={RemoveNotification(user.uid, 'PU2itN8WC1YGaQ6ygu3p')}>Remove</button>
        </div>
    )

}

export default Notifications