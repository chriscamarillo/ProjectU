import React from "react"
import { useUser } from '../components/backend/UserProvider'
import { useParams, useHistory} from 'react-router-dom'
import { useForm, useFieldArray } from "react-hook-form"
import { db } from '../services/firebase'
import algoliasearch from 'algoliasearch';
import { algoliaConfig } from '../services/config'
import ProjectForm from '../components/frontend/forms/ProjectForm'
import GetProject from "../components/backend/GetProject"
import Thread from "../components/frontend/Thread"

const EditProject = (props) => {
    const pid = useParams().pid;
    const history = useHistory()
    const project = (props.location.project) ? props.location.project : GetProject(pid).details
    
    
    //console.log(project)
    const currentUser = useUser() || {uid: null};
    const {register, handleSubmit, errors} = useForm()
    
    const onSubmit = (data) => {
        const fields={createdBy: project.createdBy, owner: project.owner, ...data}
        const ref = db.collection('projects').doc(pid)
        ref
          .update(fields).then((updated) => {
            const {appID, adminKey} = algoliaConfig;
            const client = algoliasearch(appID, adminKey);
            const index = client.initIndex('projects')
            
            // update project in algolia
            index.saveObject({
                objectID: pid,
                id: pid,
                ...fields
            })
          })
        
        history.push(`/projects/${pid}`)        
    }
    
    
    if(project.owner === currentUser.uid) {
        return(
            <div class="EditProject">
                <ProjectForm project={project} register={register({required: true})} handleSubmit={handleSubmit(onSubmit)} errors={errors} />
            </div>
            
        )
    }else{
        return(
            <h1>You don't have permission</h1>
        );
    }

}

export default EditProject