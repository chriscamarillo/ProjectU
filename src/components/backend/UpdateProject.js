import {db} from '../../services/firebase'
import algoliasearch from 'algoliasearch';
import { algoliaConfig } from '../../services/config'

const UpdateProject = (pid, fields) => {
    if (pid) {
        db
          .collection("projects").doc(pid)
          .update(fields).then((updated) => {
            const {appID, adminKey } = algoliaConfig;
            const client = algoliasearch(appID, adminKey);
            const index = client.initIndex('projects')
            const {title, description, createdBy, owner} = fields
            const objectID = pid;
            
            // update project in algolia
            index.saveObject({title,
                objectID,
                title,
                description,
                createdBy,
                owner,
                id: pid
            })
          })
      }
      else {
          console.log('no pid passed')
      }
} 

export default UpdateProject;