import React from "react";
import { Link } from "react-router-dom"
import { useUser } from '../backend/UserProvider'
import { signInWithGoogle, signOut } from "../../services/firebase"
import '../../styles/NavigationBar.css'
import Logo1 from '../../Logo1.png'
import Notifications from './Notifications'
const NavigationBar = () => {
  var currentUser = useUser()
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        <img src={Logo1} id="navbar-logo" />
          Discover
        </Link>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          {(currentUser) ? (
            [
              <li className="nav-item">
                <Link to={`/users/${currentUser.uid}`} className='nav-link'>Profile </Link>
              </li>,
              <li className="nav-item">
                <Link to="/MyProjects" className='nav-link'>Projects </Link>
              </li>
            ]
          ) : <></>}
        </ul>
      </div>
      {(currentUser) ? <Notifications uid={currentUser.uid}/> : <></>}
      <span className="navbar-inline">
        {(currentUser) ? (
          <a href="/"><button className="btn btn-outline-* signout" aria-pressed="false" onClick={() => { signOut() }}>Sign out</button></a>
        ) : (<button className="btn btn-outline-* signin" aria-pressed="false" onClick={signInWithGoogle}>Sign in with Google</button>)}
      </span>
    </nav>

  )
}

export default NavigationBar;