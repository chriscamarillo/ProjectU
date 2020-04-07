import React, { useState, useContext } from "react"
import { db } from '../services/firebase'
import { UserContext } from '../UserProvider'

const CreateProject = () => {
  const user = useContext(UserContext)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const createProject = (e) => {
    e.preventDefault()
    db
      .collection("projects")
      .add({
        title,
        description,
        owner: user.uid,
      }).then(()=>{
        setTitle("")
        setDescription("")
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