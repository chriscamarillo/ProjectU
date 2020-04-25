import React, { useState } from "react"
import { stat } from '../services/firebase'
import { useUser } from './UserProvider'
import { createProject } from './Backend'
import '../styles/CreateProject.css'

// TODO: refactor this
const CreateProject = () => {
  const user = useUser()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  
  const createAndEmpty = (e) => {
    e.preventDefault()

    if(title != null && title != "" && description != null && description != "") {
      let date_created = stat.FieldValue.serverTimestamp();

      // setup new project fields
      let project_fields = {
        title,
        description,
        owner: user.uid,
        date_created,
        date_last_modified: date_created,
        archived: false, // Find out what this is for.
        status: 0, // 0 - COMPLETED, 1 ACCEPTING APPS, -1 NOT ACCEPTING APPS
        createdBy: user.displayName
      };

        // create entry in firebase
        createProject(user, project_fields).then(() => {
        // empty text inputs 
        setTitle("")
        setDescription("")
        })
      }
    }

  return (
    <div className='CreateProject'>
        <h1>Create a new Project</h1>
        <form>
            <input type="text" placeholder="project title" value={title} onChange={e => setTitle(e.target.value)} ></input>
            <input type="text" placeholder="project description" value={description} onChange={e => setDescription(e.target.value)}></input>
            <button type="submit" onClick={createAndEmpty}>Submit</button>
        </form>
    </div>
  )
}
export default CreateProject