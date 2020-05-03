import React, { useState, useEffect } from 'react'
import { db } from '../../services/firebase'

const MemberEntry = (props) => {
    const member = props.member;

    console.log('here are some members: ', member)
    return (
        (member) ?
        <div className="MemberEntry">
            <img src={member.photoURL}  alt="profile" width="100" height="100"></img>
            <h2>{`${member.displayName} joined ${member.date_added}`}</h2>
        </div>:
        <h1>Loading...</h1> 
    )
}

export default MemberEntry;