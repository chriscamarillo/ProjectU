import React, { useState, useEffect } from 'react'
import ThreadEntry from './ThreadEntry'
import ThreadForm from './forms/ThreadForm'
import { ReadThreads, isMember } from '../backend/GetProject'
import { useUser } from '../backend/UserProvider'
import { db } from '../../services/firebase'

const Thread = props => {
    const thread = ReadThreads(props.pid)
    // hacky tacky way of doing things

    console.log('thread rendered ', thread)

    // Removes a thread
    function remove(tid) {
        if (tid) {
            db
                .collection(`projects/${props.pid}/threads`)
                .doc(tid).delete()
            console.log('remove thread ', tid)
        }
    }

    return (
        (thread) ?
        <div className="card">
            <div className="card-header">
                <h2>Thread</h2>
            </div>
            {(props.ownerView) ?
                <ThreadForm pid={props.pid}/>
                :<></>
            }
            <ul className="list-group list-group-flush">
            {thread.slice(0).reverse().map((entry,i)=> // second dirty trick
                <li className="list-group-item" key={i}>
                    <ThreadEntry // Based on Schema
                        title={entry.title} 
                        description={entry.description}
                    />
                    {(props.ownerView) ? // Owner can remove threads
                        <button class="btn btn-danger" onClick={() => remove(entry.id)}>Remove</button>:
                        <></>
                    }
                </li>
            )}
            </ul>
        </div> : <></>
    )
}

export default Thread;