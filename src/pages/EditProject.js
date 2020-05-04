import React from "react"
import { useUser } from '../components/backend/UserProvider'
import { useParams, useHistory} from 'react-router-dom'
import { useForm, useFieldArray } from "react-hook-form"
import { db } from '../services/firebase'
import algoliasearch from 'algoliasearch';
import { algoliaConfig } from '../services/config'
import ProjectForm from '../components/frontend/forms/ProjectForm'
import GetProject,{ GetThreads }from "../components/backend/GetProject"


const EditProject = (props) => {
    const pid = useParams().pid;
    const history = useHistory()
    const project = (props.location.project) ? props.location.project : GetProject(pid).details
    
    //import threads from firebase here
    const threads = project.threads ? project.threads : GetThreads(pid)
    
    //console.log(project)
    const currentUser = useUser() || {uid: null};
    const {register, control, handleSubmit, errors} = useForm({
        defaultValues: {
            threads: threads
        }
    })
    const { fields, append, remove} = useFieldArray(
        {
          control,
          title: "title",
          description: "description",
          name: "threads"
        }
      );
    
    
    const onSubmit = (data) => {
        // const fields={createdBy: project.createdBy, owner: project.owner, ...data}
        // const ref = db.collection('projects').doc(pid)
        // ref
        //   .update(fields).then((updated) => {
        //     const {appID, adminKey} = algoliaConfig;
        //     const client = algoliasearch(appID, adminKey);
        //     const index = client.initIndex('projects')
            
        //     // update project in algolia
        //     index.saveObject({
        //         objectID: pid,
        //         id: pid,
        //         ...fields
        //     })
        //   })
        console.log(fields.threads)
        
        //fields.threads.forEach(thread=>ref.collection("threads").add(thread))
        //history.push(`/projects/${pid}`)
        
    }
    
    
    if(project.owner === currentUser.uid) {
        return(
            <ProjectForm project={project} fields={fields} append={append} remove={remove} threads={threads} register={register({required: true})} handleSubmit={handleSubmit(onSubmit)} errors={errors} />
        )
    }else{
        return(
            <h1>You don't have permission</h1>
        );
    }

}

export default EditProject