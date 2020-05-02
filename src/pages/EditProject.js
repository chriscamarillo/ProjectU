import React from "react"
import { useUser } from '../components/backend/UserProvider'
import { useParams, useHistory} from 'react-router-dom'
import { useForm } from "react-hook-form"
import { db } from '../services/firebase'
import algoliasearch from 'algoliasearch';
import { algoliaConfig } from '../services/config'
import ProjectForm from '../components/frontend/forms/ProjectForm'
import GetProject from "../components/backend/GetProject"

const EditProject = (props) => {
    const pid = useParams().pid;
    const history = useHistory()
    const currentUser = useUser() || {uid: null};
    const {register, handleSubmit, errors} = useForm()
    const project = (props.location.project) ? props.location.project : GetProject(pid).details
    
    const onSubmit = (data) => {
        const fields={createdBy: project.createdBy, owner: project.owner, ...data}
        db
          .collection("projects").doc(pid)
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
            <ProjectForm project={project} register={register({required: true})} handleSubmit={handleSubmit(onSubmit)} errors={errors} />
        )
    }else{
        return(
            <h1>You don't have permission</h1>
        );
    }

}

export default EditProject