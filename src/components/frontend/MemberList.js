import React from 'react'
import MemberEntry from './MemberEntry'
import { GetMembers } from '../backend/GetProject'
import {Link} from 'react-router-dom'

/* 
    takes in an array of objects each with properties
        - id
        - displayName
        - photoURL
*/
const MemberList = (props) => {
    const members = GetMembers(props.pid)
    console.log('re rendered MemberList')
    return (
        (members) ?
        <div>
            {members.map((member,i)=> (
                <Link to={`/users/${member.id}`}>
                    <li key={i}>
                        <MemberEntry // Based on Schema
                            member={member}                
                        />
                    </li>
                </Link>
            ))}
        </div>: <p>Loading members...</p>
    )
}

export default MemberList;