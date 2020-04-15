import React, { useState, useEffect} from "react"
import { useUser } from '../components/UserProvider'
import { db } from '../services/firebase'

// import components here
import CreateProject from '../components/CreateProject'

function GetMyProjects(uid){
    const [projects, setProjects] = useState([])
    useEffect(()=>{
        db
            .collection('projects')
            .where("owner", "==", uid)
            .onSnapshot((snapshot)=> {
                const myProjects = snapshot.docs.map((project)=>({
                    id: project.id,
                    ...project.data()
                }))
                setProjects(myProjects)
            })
    },[uid])
    return projects
}

const Projects = () => {
    const projects =  GetMyProjects(useUser().uid)
    return(
        <div>
            <CreateProject />
            <h1>My Projects</h1>
            <ul>
                {projects.map((project,i)=>
                    <li key={i}>
                        <h2>{project.title}</h2>
                        <p>{project.description}</p>
                        <h4>posted by {project.createdBy}</h4>
                    </li>
                    //project component should replace this
                )}
            </ul>
        </div>
    )
}
export default Projects