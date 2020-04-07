import React, { useState, useContext } from "react"
import { db, stat} from '../services/firebase'
import { UserContext } from '../UserProvider'

const CreateProject = () => {
  const user = useContext(UserContext)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const createProject = (e) => {
    e.preventDefault()
    // overides the default function execution
    db
    // instantiates a connection to firestore
      .collection("projects")
      // modifies the above collection
      .add({
        title,
        description,
        //these first two properties are only assigned values when the form is submitted  
        owner: user.uid,
        createdBy: user.displayName,
        created: stat.FieldValue.serverTimestamp(),
        //these properties are immedietly assigned values
        //eventually other properties of projects will follow (check the schema)
      }).then(()=>{
        setTitle("")
        setDescription("")
        //empties out the text inputs once values are recoded to db
      })
      
  }

  return (
    <div>
        <h1>{user.displayName}'s Project</h1>
        <form>
            <input type="text" placeholder="project title" value={title} onChange={e => setTitle(e.target.value)} ></input>
            <input type="text" placeholder="project description" value={description} onChange={e => setDescription(e.target.value)}></input>
            <button type="submit" onClick={createProject}>Submit</button>
        </form>
    </div>
  )
}
export default CreateProject