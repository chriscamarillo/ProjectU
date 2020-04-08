import React, { useState, useEffect, useContext } from "react"
import { UserContext } from '../components/UserProvider'
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

const Discover = () => {
    const user = useContext(UserContext);
    const projects = GetMyProjects(user.uid)
    return (
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
                )}
            </ul>
        </div>
    )
}
export default Discover