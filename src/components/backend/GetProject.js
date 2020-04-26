
import {useState, useEffect} from 'react'
import {db} from '../../services/firebase'

const GetProject = (pid) => {
    // not sure how to outsource this one
    // refer to /pages/Project.js
    const [details, setDetails] = useState()

    useEffect(()=>{
        db
            .collection('projects')
            .doc(pid)
            .onSnapshot((details)=>{
                setDetails(details.data())
            })
        },[pid])

    return details;
}

export default GetProject;