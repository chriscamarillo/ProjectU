import React, { useState } from "react"
import { db, stat } from '../services/firebase'
import { useUser } from './UserProvider'

const CreateProject = () => {
  const user = useUser()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const createProject = (e) => {
    e.preventDefault()

    let date_created = stat.FieldValue.serverTimestamp();

    // setup new project
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

    // overides the default function execution
    // instantiates a connection to firestore
    // modifies the above collection
    db
      .collection("projects")
      .add(project_fields).then((new_project) => {

        // add project to owner's list
        db
          .doc(`users/${user.uid}`)
          .collection('projects').doc(new_project.id)
          .set({
            favorited: false,
            pinned: true,
          });

        // attach owner to project
        db
          .doc(`projects/${new_project.id}`)
          .collection('admins').doc(user.uid)
          .set({
            date_added: date_created,
            is_owner: true,
          });

        // empty text inputs 
        setTitle("")
        setDescription("")
      })
    }

  return (
    <div>
        <h1>Create a new Project</h1>
        <form>
            <input type="text" placeholder="project title" value={title} onChange={e => setTitle(e.target.value)} ></input>
            <input type="text" placeholder="project description" value={description} onChange={e => setDescription(e.target.value)}></input>
            <button type="submit" onClick={createProject}>Submit</button>
        </form>
    </div>
  )
}
export default CreateProject