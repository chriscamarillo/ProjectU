import React, { useState, useEffect} from "react"
import { useUser } from '../components/UserProvider'
import { useParams } from "react-router";
import { db } from '../services/firebase'

const Project = () => {
    const pid = useParams().pid
    const currentUser = useUser() || {uid: null}
    const [user, setUser] = useState()
    const [details, setDetails] = useState()

    useEffect(()=>{
        db
            .collection('projects')
            .doc(pid)
            .onSnapshot((details)=>{
                setDetails(details.data())
            })
        },[pid])

    console.log(details)
    
    // need this to be all located in some other file for styling 
    let someStyle = {
        color: '#d4af37'
    }

    if(currentUser.uid && details){
        // TODO: get the rest of the details (collaborator list and thread)
        
        return(
            (currentUser.uid === details.owner)?(
                <div>
                    <h2>{details.title}</h2>
                    <p>{details.description}</p>
                    <h1 style={someStyle}>THIS IS MY PROJECT!</h1>
                </div>
            ):(
                <div>
                    <h2>{details.title}</h2>
                    <p>{details.description}</p>
                    <h4>a project made by {details.createdBy}</h4>
                </div>
            )
        )
    }else{
        return (
            <h1>Loading...</h1>
        )
    }
    
    
}
export default Project