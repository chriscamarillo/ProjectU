import {useEffect, useState} from 'react';
import {db} from '../../services/firebase'

// I can probably replace the param with useUser() in the body of the function instead
// Ill try it after all this refactoring

const GetMyProjects = (uid) => {

    const [projects, setProjects] = useState([])
    useEffect(() => {
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

export default GetMyProjects;