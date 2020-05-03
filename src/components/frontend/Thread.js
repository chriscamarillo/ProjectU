import React from 'react'
import ThreadEntry from './ThreadEntry'
import { GetThread } from '../backend/GetProject'

const Thread = props => {
    const thread = GetThread(props.pid)
    console.log('thread re rendered')
    return (
        (thread) ? 
        <div className="Thread">
            <h1>This is where the thread is at. ONLY MEMBER/OWNER can see me</h1>
            <ul>
            {thread.reverse().map((entry,i)=>
                <li key={i}>
                    {/*Don't use index as key b/c it will not print from latest -> earliest message*/}
                    <ThreadEntry // Based on Schema
                        from={entry.from} 
                        date={entry.date.toDate().toString()}
                        msg={entry.msg}
                    />
                </li>
            )}
            </ul>
        </div> : <p>Loading thread...</p>
    )
}

export default Thread;