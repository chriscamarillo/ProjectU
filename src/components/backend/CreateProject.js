import React, { useState } from "react"
import { stat } from '../../services/firebase'
import { useUser } from './UserProvider'
import algoliasearch from 'algoliasearch';
import { algoliaConfig } from '../../services/config'
import { db} from '../../services/firebase'
import '../../styles/CreateProject.css'

// TODO: refactor this into backend
function createProject(user, project_fields) {
  return db
  .collection("projects")
  .add(project_fields).then((new_project) => {
      const {appID, adminKey } = algoliaConfig;
      const client = algoliasearch(appID, adminKey);
      const index = client.initIndex('projects')
      const {title, description, createdBy, owner, status} = project_fields
      const objectID = new_project.id;
      
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
          date_added: project_fields.date_created,
          is_owner: true,
      });

      // add projects to algolia
      console.log('saving project...');
      console.log('index:')
      console.log(index.saveObject)
      index.saveObject({title,
          objectID,
          title,
          description,
          createdBy,
          owner,
          status,
          id:objectID
      }).then(({objectID}) => console.log);
  });
  
}

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
        status: 1, // 0 - COMPLETED, 1 ACCEPTING APPS, -1 NOT ACCEPTING APPS
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
        <h1>Create a New Project</h1>
        <form>
            <input type="text" placeholder="Project Title" value={title} onChange={e => setTitle(e.target.value)} ></input>
            <input type="text" placeholder="Project Description" value={description} onChange={e => setDescription(e.target.value)}></input>
            <button type="submit" onClick={createAndEmpty}>Submit</button>
        </form>
    </div>
  )
}
export default CreateProject