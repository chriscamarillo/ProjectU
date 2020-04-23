import React from 'react'
import ThreadEntry from './ThreadEntry'

const Thread = props => {
    return (
        <ul>
        {props.projects.reverse().map((entry,i)=>
            <li key={i}>
                {/*Don't use index as key b/c it will not print from latest -> earliest message*/}
                <ThreadEntry // Based on Schema
                    from={entry.from} 
                    date={entry.date}
                    msg={entry.msg}
                />
            </li>
         )}
        </ul>
    )
}

export default Thread;