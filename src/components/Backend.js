import React, { useState, useEffect} from "react"
import { useParams, Redirect } from "react-router";
import { db } from '../services/firebase'
import {useUser} from "./UserProvider"

/*
    Most Backend function calls
    will handle state for subsequent database updates
*/

function createProject(user, project_fields) {
    return db
    .collection("projects")
    .add(project_fields).then((new_project) => {

        // add project to owner's list
        db
        .doc(`users/${user.uid}`)
        .collection('projects').doc(new_project.id)
        .set({
            favorited: false,
            pinned: true,
        });

        // attach owner to project
        db
        .doc(`projects/${new_project.id}`)
        .collection('admins').doc(user.uid)
        .set({
            date_added: project_fields.date_created,
            is_owner: true,
        });

    })
}

function GetProfile(uid) {
    const [user, setUser] = useState()

    useEffect(()=>{
        db
            .collection('users')
            .doc(uid)
            .onSnapshot((user)=>{
                setUser(user.data())
            })
        },[uid]);
    return user;
}

function GetProject(pid) {
    // not sure how to outsource this one
    // refer to /pages/Project.js
    const [details, setDetails] = useState()

    useEffect(()=>{
        db
            .collection('projects')
            .doc(pid)
            .onSnapshot((details)=>{
                setDetails(details.data())
            })
        },[pid])

    return details;
}

function GetProjects(){
    const [projects, setProjects] = useState([])
    useEffect(()=>{
        const unsubscribe = 
        db
            .collection('projects')
            .onSnapshot((snapshot)=> {
                const newProjects = snapshot.docs.map((project)=>({
                    id: project.id,
                    ...project.data()
                }))
                setProjects(newProjects)
            })
        return () => unsubscribe()
    },[])
    return projects
}

function UpdateProject(updated_fields) {
    // TODO: 
} 

// I can probably replace the param with useUser() in the body of the function instead
// Ill try it after all this refactoring

function GetMyProjects(uid){
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

function Search(keywords)  {
    // oh boy
    // const [projects, setProjects] = useState([])
    // useEffect(() => {
    //     const unsubscribe = 
    //     db
    //         .collection('projects')
    //         .where("owner", "==", uid)
    //         .onSnapshot((snapshot)=> {
    //             const myProjects = snapshot.docs.map((project)=>({
    //                 id: project.id,
    //                 ...project.data()
    //             }))
    //             setProjects(myProjects)
    //         })
        
    //     return () => unsubscribe()
    // },[uid])
    // return projects
}

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

function UpdateProfile (user, fields) {
    // modifies the current user's profile
    //   const user = useUser()

    if (user) {
      db
        .collection("users").doc(user.uid)
        .update(fields)
    }
}

export {createProject,                                                  // C
        GetProfile, GetProject, GetProjects, GetMyProjects, Search,     // R
        UpdateProfile, UpdateProject,                                   // U
        DeleteProject}                                                  // D