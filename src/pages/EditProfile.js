import React, { useState } from "react"
import { db } from '../services/firebase'
import { useUser } from './../components/UserProvider'
import { Link } from 'react-router-dom'

const EditProfile = () => {
  const user = useUser()
  const [bio, setBio] = useState("")
  const [contactEmail, setContactEmail] = useState("")
  const [resumeLink, setResumeLink] = useState("")
  const [status, setStatus] = useState("online")
  // TODO: qualifications somehow
  
  let updateFirebase = () => {

      // overides the default function execution
      // instantiates a connection to firestore
      // modifies the user collection
      if (user) {
        db
          .collection("users").doc(user.uid)
          .update({
            bio,
            contactEmail,
            resumeLink,
            status
          })
      }
  }

  let handleChange = (e) => {
    setStatus(e.target.value)
  }

  return (
      <div>
        <h5><i>A better form component later</i></h5>
        <h3>Edit Profile</h3>
        <h1>{user.displayName}</h1>
        <form>
          Bio
            <input type="text" placeholder="" value={bio} onChange={e => setBio(e.target.value)} ></input>
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
            <button onClick={() => updateFirebase()}>Save Changes</button>
          </Link>  
        </form>
      </div>
  );
}

  
export default EditProfile