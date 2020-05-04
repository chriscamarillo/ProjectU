import React from 'react'
import ThreadEntry from './ThreadEntry'
import { ReadThreads } from '../backend/GetProject'

const Thread = props => {
    const thread = ReadThreads(props.pid, props.uid)
    console.log('thread rendered')
    return (
        (thread.length > 0) ? 
        <div className="Thread">
            <h2>Thread</h2>
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
        </div> : <></>
    )
}

export default Thread;