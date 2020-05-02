import React from 'react'
import MemberEntry from './MemberEntry'
import {Link} from 'react-router-dom'

/* 
    takes in an array of objects each with properties
        - id
        - displayName
        - photoURL
*/
const MemberList = (props) => {
    console.log(props.members)
    return (
        <div>
            {props.members.map((member,i)=> (
                <Link to={`/users/${member.id}`}>
                    <li key={i}>
                        <MemberEntry // Based on Schema
                            member={member}                
                        />
                    </li>
                </Link>
            ))}
        </div>
    )
}

export default MemberList;