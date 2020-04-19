import React, { useState, useEffect} from "react"
import { useUser } from '../components/UserProvider'
import { db } from '../services/firebase'
import { Link } from "react-router-dom"

// import components here
import CreateProject from '../components/CreateProject'

function GetMyProjects(uid){
    const [projects, setProjects] = useState([])
    useEffect(()=>{
        const unsubscribe = 
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
        
        return () => unsubscribe()
    },[uid])
    return projects
}

const MyProjects = () => {
    const projects =  GetMyProjects(useUser().uid)
    return(
        // Components for these project entries would make these messy links easier
        // to organize and style
        <div>
            <CreateProject />
            <h1>My Projects</h1>
            <ul>
                {projects.map((project,i)=>
                    <li key={i}>
                        <Link to={`/projects/${project.id}`}><h2>{project.title}</h2></Link>
                        <p>{project.description}</p>
                        <Link to={`/delete/project/${project.id}`}>delete</Link>
                    </li>
                    //project component should replace this
                )}
            </ul>
        </div>
    )
}
export default MyProjects