import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GetNotifications, RemoveNotification } from '../backend/Notify'
import '../../styles/NotificationBar.css'
import Bell from '../../bell.svg'

const Notifications = props => {
    const notifications = GetNotifications(props.uid);
    const badge_style = (notifications.length > 0) ? "btn-danger" : "btn btn-info"


    return (
        <div class="dropdown show">
            <a class={`btn dropdown-toggle ${badge_style}`} href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img src={Bell} class="bell" />
                {`(${notifications.length})`}
            </a>

            <div class="dropdown-menu dropdown-menu-right notification-bar" aria-labelledby="dropdownMenuLink">
                {
                    notifications.map(n =>
                        <Link to={n.target} onClick={() => RemoveNotification(props.uid, n.id)}>
                            <li key={n.id} className="dropdown-item">{n.message}</li>)
                        </Link>
                    )
                }
            </div>
        </div>
    )

}

export default Notifications