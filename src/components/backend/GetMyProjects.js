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

const GetMyApps = (uid) => {
    const [apps, setApps] = useState([])
    useEffect(() => {
        const unsubscribe =
        db
            .collection('applications')
            .where("user", "==", uid)
            .onSnapshot(async (snapshot) => {
                let myApps = snapshot.docs.map((doc) => (
                    {id: doc.id, ...doc.data()}
                ))

                // then get project titles for each
                let apps_with_info = []
                for (const doc of myApps) {
                    let title_ref = await doc.project.get()
                    title_ref = title_ref.data()
                    apps_with_info.push({...doc, title: title_ref.title})
                }
                setApps(apps_with_info)
            })
        return () => unsubscribe()
    }, [])
    return apps
}

export default GetMyProjects;
export {GetMyApps}