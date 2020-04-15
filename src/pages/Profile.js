import React, { useState, useEffect} from "react"
import { useUser } from '../components/UserProvider'
import { useParams } from "react-router";
import { db } from '../services/firebase'

const Profile = () => {
    const uid = useParams().uid
    const currentUser = useUser() || {uid: null}
    const [user, setUser] = useState()
    useEffect(()=>{
        db
            .collection('users')
            .doc(uid)
            .onSnapshot((user)=>{
                setUser(user.data())
            })
        },[uid])
    if(user){
        
        return(
            (uid === currentUser.uid)?(
                <div>
                    <h1>my profile</h1>
                    <img src={user.photoURL}  alt="profile" width="200" height="200"></img>
                </div>
            ):(
                <div>
                    <h1>{user.displayName}'s profile</h1>
                    <img src={user.photoURL}  alt="profile" width="200" height="200"></img>
                </div>
                //profile components should replace these divs
            )
        )
    }else{
        return (
            <h1>Loading...</h1>
        )
    }
    
    
}
export default Profile