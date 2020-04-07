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
    (user) ? (
      <div>
        <CreateProject />
        <button onClick={()=> {signOut()} }> Sign out</button>
      </div>
    ):(
      <button onClick={signInWithGoogle}> Sign in with Google</button>
    )
  );
}

export default App
