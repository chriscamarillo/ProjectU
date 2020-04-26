import React, { useState } from "react"
import { useUser } from '../components/backend/UserProvider'
import { Link } from 'react-router-dom'
import { UpdateProfile } from '../components/Backend'
import '../styles/EditProfile.css'
import Logo from '../ProjectULogo.png'


const EditProfile = () => {
  const user = useUser()
  const [bio, setBio] = useState("")
  const [contactEmail, setContactEmail] = useState("")
  const [resumeLink, setResumeLink] = useState("")
  const [status, setStatus] = useState("online")

  let handleChange = (e) => {
    setStatus(e.target.value)
  }

  return (
      <div className= 'EditProfile'>
        <img src= {Logo}/>
        <h5><i>A better form component later</i></h5>
        <h3>Edit Profile</h3>
        <h1>{user.displayName}</h1>
        <form>
          Bio
            <input type="text" placeholder={user.bio}  onChange={e => setBio(e.target.value)} ></input>
          <br />
          Contact Email
            <input type="text" placeholder="" value={contactEmail} onChange={e => setContactEmail(e.target.value)}></input>
          <br />
          Resume Link
            <input type="text" placeholder="" value={resumeLink} onChange={e => setResumeLink(e.target.value)}></input>
          <br />
          <b>Status</b>
          <br />
            <label style={{color: 'green'}}>Online</label>
            <input type="radio" id="online" name="status" value="online" onChange={handleChange} />
            <br />
            <label style={{color: 'gray'}}>Offline</label>
            <input type="radio" id="offline" name="status" value="offline" onChange={handleChange} />
            <br />
          <Link to={`/users/${user.uid}`}>
            <button onClick={() => UpdateProfile(user, {bio, contactEmail, resumeLink, status})}>Save Changes</button>
          </Link>  
        </form>
      </div>
  );
}

  
export default EditProfile