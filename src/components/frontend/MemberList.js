import React from 'react'
import MemberEntry from './MemberEntry'
import { GetMembers } from '../backend/GetProject'
import { Link } from 'react-router-dom'

/* 
    takes in an array of objects each with properties
        - id
        - displayName
        - photoURL
*/
const MemberList = (props) => {
    const members = GetMembers(props.pid)
    console.log('rendered member list ', members)
    return (
        (members) ?
            <ul className="list-group list-group-flush">
                {members.map((member, i) => (
                    <Link to={`/users/${member.id}`}>
                        <li className="list-group-item" key={i}>
                            <MemberEntry // Based on Schema
                                member={member}
                            />
                        </li>
                    </Link>
                ))}
            </ul> : <p>Loading members...</p>
    )
}

export default MemberList;