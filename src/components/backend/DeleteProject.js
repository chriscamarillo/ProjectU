import React from "react"
import { db} from '../../services/firebase'
import { useParams, Redirect } from "react-router";
import { useUser } from "./UserProvider"
import algoliasearch from 'algoliasearch';
import { algoliaConfig } from '../../services/config'

const DeleteProject = () => {
    const pid = useParams().pid
    const uid = useUser().uid
    // WILL CHANGE TO REFERENCES.. (admins and owner all removed)
    const ref = db.collection('users').doc(uid).collection('projects').doc(pid)

        ref.get().then((project)=>{
            if(project.data()){
                
                const prompt = window.confirm("delete this project?")
                //checks to see whether the selected project is owned by the logged-in user
                if(prompt){
                    // recursive delete
                    // ALSO MUST REMOVE EVERY ADMIN!
                    db
                    .collection('projects')
                    .doc(pid)
                    .delete()
                    .then(() => {
                        const {appID, adminKey } = algoliaConfig;
                        const client = algoliasearch(appID, adminKey);
                        const index = client.initIndex('projects')
                        index.deleteObject(pid)
                    });

                    ref.delete()
                    //dont know how to delete the 'admins' collection in the project page
                }
            }else{
                window.alert("you are not authororized to perform this action")
            }
        })
    
    return(<Redirect to="/MyProjects" />)
}

export default DeleteProject;