import React, { Fragment } from 'react'

/* 
    takes in as properties
    a list of MemberEntries with properties:
        - id
        - displayName
        - photoURL
*/
const MemberList = (props) => {
    return (
        <div>
            {props.members.map((entry,i)=> (
                <Link to={`/profile/${entry.id}`}>
                    <li key={i}>
                        <MemberEntry // Based on Schema
                            displayName={entry.displayName}
                            photoURL={entry.photoURL}                     
                        />
                    </li>
                </Link>
            ))}
        </div>
    )
}

export default MemberList;