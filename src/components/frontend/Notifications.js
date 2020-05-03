import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '../backend/UserProvider'
import { db } from '../../services/firebase'
//import GetNotifications from '../backend/GetNotifications.js'


const Notifications = props => {
    const user = useUser()
    const [notifications, setNotifications] = useState([])


    useEffect(() => {
        let notificationsArr = []
        let ref = db.collection('users').doc(user.uid).collection('notifications')
        // Listen for updates
        ref.onSnapshot(snapshot => {
            snapshot.forEach(doc => {
                notificationsArr.push({ id: doc.id, ...doc.data() })
                setNotifications(notificationsArr)
            })
            console.log('some shit updated')
            
        });
    }, [notifications])


    return (
        <div class="dropdown show">
            <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Notifications
            </a>

            <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                {
                    notifications.map(n => <li key={n.id} className="dropdown-item">{n.message} targets {n.target}</li>)
                }
            </div>
        </div>
    )

}

export default Notifications