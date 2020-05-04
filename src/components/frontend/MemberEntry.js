import React, { useState, useEffect } from 'react'
import { db } from '../../services/firebase'

const MemberEntry = (props) => {
    const member = props.member;
    
    // const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']
    // const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sepr", "Oct", "Nov", "Dec"]
    
    // let dateObj = member.date_added.toDate()
    // let date = (member.date_added) ? 
    //             days[dateObj.getDay()] + ' ' +
    //             months[dateObj.getMonth()] + ' ' +
    //             dateObj.getDate() + ', ' + 
    //             dateObj.getFullYear()
    //             : '';

    return (
        (member) ?
        <div className="">
            <img src={member.photoURL}  alt="profile" width="100" height="100"></img>
            <h2>{`${member.displayName}`}</h2>
        </div>:
        <h1>Loading...</h1> 
    )
}

export default MemberEntry;