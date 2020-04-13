import React, { useContext }  from "react";
import { Link } from "react-router-dom"
import { UserContext } from './UserProvider'
import { signInWithGoogle, signOut} from "../services/firebase"
const Navbar = () => {
    var signedIn = useContext(UserContext)
    return(
        <div>
            <Link to="/">Discover </Link>
            {(signedIn)?(
                <span>
                    <Link to="/Profile">Profile </Link>
                    <Link to="/Projects">Projects </Link>
                    <Link to ="/">
                        <button onClick={()=> {signOut()}}>Sign out</button>
                    </Link>
                </span>
            ):(<button onClick={signInWithGoogle}>Sign in with Google</button>)}
            
        </div>
    )
}

export default Navbar