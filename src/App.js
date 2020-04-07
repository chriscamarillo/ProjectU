//importing dependencies
import React, { useContext } from "react"
import { UserContext } from './UserProvider'
import { signInWithGoogle, signOut } from './services/firebase'

//import other components here:
import CreateProject from './components/CreateProject'

//import styling...
import './styles/App.css'

function App() {
  const user = useContext(UserContext);
  return (
    (user)?(
    // checks if user exists
      <div>
        <CreateProject />
        <button onClick={()=> {signOut()} }> Sign out</button>
      </div>
    ):(
      <button onClick={signInWithGoogle}> Sign in with Google</button>
    )
    // else prompt user to sign in
  );
  // this entire return statement will be rewritten once react router is set-up
}

export default App
