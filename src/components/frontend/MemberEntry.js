import React, { useState, useEffect } from 'react'
import { db } from '../../services/firebase'

const MemberEntry = (props) => {
    const member = props.member;
    const [info, setInfo] = useState();

    useEffect(() => {
        db.collection('users').doc(member.id).get().then((shallow_info) => {
            setInfo({...shallow_info.data()});
        })
    }, [info]);

    console.log(member)
    return (
        (info) ?
        <div className="MemberEntry">
            <img src={info.photoURL}  alt="profile" width="100" height="100"></img>
            <h1>{`${info.displayName} joined ${member.date_added.toDate().toString()}`}</h1>
        </div>:
        <h1>Loading...</h1> 
    )
}

export default MemberEntry;