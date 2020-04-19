import React from "react"
import { db} from '../services/firebase'
import { useParams, Redirect } from "react-router";
import{useUser} from "./UserProvider"
const DeleteProject = () => {
    const pid = useParams().pid
    const uid = useUser().uid
    const ref = db.collection('users').doc(uid).collection('projects').doc(pid)

        ref.get().then((project)=>{
            if(project.data()){
                
                const prompt = window.confirm("delete this project?")
                //checks to see whether the selected project is owned by the logged-in user
                if(prompt){
                    db
                    .collection('projects')
                    .doc(pid)
                    .delete()

                    ref.delete()
                    //dont know how to delete the 'admins' collection in the project page
                }
            }else{
                window.alert("you are not authororized to perform this action")
            }
        })
    
    return(<Redirect to="/MyProjects" />)
}

export default DeleteProject