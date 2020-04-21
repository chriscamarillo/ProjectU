import React from "react"
import { useUser } from '../components/UserProvider'
import { useParams } from "react-router";
import { GetProfile } from '../components/Backend'
import { Link } from "react-router-dom"

const Profile = () => {
    const uid = useParams().uid
    const currentUser = useUser() || {uid: null}

    // Backend call
    let user = GetProfile(uid)
    
    if(user){
        
        return(
            (uid === currentUser.uid)?(
                <div>
                    <div>
                        <h1>my profile</h1>
                        <Link to='/edit/profile'>Edit Profile</Link>
                    </div>
                    <img src={user.photoURL}  alt="profile" width="200" height="200"></img>
                    <p>{user.bio}</p>
                    
                </div>
            ):(
                <div>
                    <h1>{user.displayName}'s profile</h1>
                    <img src={user.photoURL}  alt="profile" width="200" height="200"></img>
                    <p>{user.bio}</p>
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