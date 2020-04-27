import React from 'react'

const MemberEntry = (props) => {

    return (
        <div className="MemberEntry">
            <img src={props.user.photoURL}  alt="profile" width="100" height="100"></img>
            <h1>{props.user.displayName} joined {props.user.date_added}</h1>
        </div>
    )
}

export default MemberEntry;