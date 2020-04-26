import React, { useState, useEffect} from "react"
import { useParams, Redirect } from "react-router";
import { db } from '../services/firebase'
import { useUser } from "./backend/UserProvider"
import algoliasearch from 'algoliasearch';
import { algoliaConfig } from '../services/config'
/*
    Most Backend function calls
    will handle state for subsequent database updates
*/

function createProject(user, project_fields) {
    return db
    .collection("projects")
    .add(project_fields).then((new_project) => {
        const {appID, adminKey } = algoliaConfig;
        const client = algoliasearch(appID, adminKey);
        const index = client.initIndex('projects')
        const {title, description, createdBy, owner} = project_fields
        const objectID = new_project.id;
        
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

        // add projects to algolia
        console.log('saving project...');
        console.log('index:')
        console.log(index.saveObject)
        index.saveObject({title,
            objectID,
            title,
            description,
            createdBy,
            owner,
            id:objectID
        }).then(({objectID}) => console.log);
    });
    
}

function GetProfile(uid) {
    const [user, setUser] = useState()
    const [skills, setSkills] = useState()
    const [links, setLinks] = useState()
    const [applications, setApps] = useState()
    const [projects, setProjects] = useState()

    var projsArr = [];
    var linksArr = [];
    var skillsArr = [];
    var appsArr = [];

    var docRef; 

    //get shallow data
    useEffect(()=>{
        db
            .collection('users')
            .doc(uid)
            .onSnapshot((usr)=>{
                setUser(usr.data());
            })

    //get skills
        db
            .collection('users')
            .doc(uid)
            .collection('skills')
            .get().
                then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        skillsArr.push(doc.data());
                    });
                    setSkills(skillsArr);
                });
    
    //get links
        db
            .collection('users')
            .doc(uid)
            .collection('links')
            .get().
                then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        linksArr.push(doc.data());
                    });
                    setLinks(linksArr);
                });

    //get projects
        db
            .collection('users')
            .doc(uid)
            .collection('projects')
            .get().
                then(function (querySnapshot) {
                    if(querySnapshot.length > 0){
                        querySnapshot.forEach(function (doc) {
                            doc.data().proj_ref.get()
                            .then(res => { 
                                projsArr.push(res.data());
                            }) 
                        });
                    }
                    setProjects(projsArr);
                });            
                
                

    //get applications
        db
            .collection('users')
            .doc(uid)
            .collection('applications')
            .get().
                then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        appsArr.push(doc.data());
                    });
                    setApps(appsArr);
                });

        },[uid]);
    
    return {user, skills, applications, projects, links};
}

function GetProject(pid) {
    // not sure how to outsource this one
    // refer to /pages/Project.js
    const [details, setDetails] = useState()
    const [apps, setApps] = useState([])
    const [members, setMembers] = useState([])
    const [thread, setThread] = useState([])
    const user = useUser() || {uid : null}

    var appArr = [];
    var memberArr = [];
    var threadArr = [];


    useEffect(()=>{
        db
            .collection('projects')
            .doc(pid)
            .onSnapshot((details)=>{
                setDetails(details.data())
            })
 
        db
            .collection('projects')
            .doc(pid)
            .collection('pending_applications')
            .get().
                then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        appArr.push(doc.data());
                    });
                    setApps(appArr);
                });
        
        db
            .collection('projects')
            .doc(pid)
            .collection('members')
            .get().
                then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        memberArr.push(doc.data());
                    });
                    setMembers(memberArr);
                });

        db
            .collection('projects')
            .doc(pid)
            .collection('thread')
            .get().
                then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        threadArr.push(doc.data());
                    });
                    setThread(threadArr);
                });
        

        },[pid])

    return {details, apps, members, thread};
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

function UpdateProject(pid, fields) {
    if (pid) {
        db
          .collection("projects").doc(pid)
          .update(fields).then((updated) => {
            const {appID, adminKey } = algoliaConfig;
            const client = algoliasearch(appID, adminKey);
            const index = client.initIndex('projects')
            const {title, description, createdBy, owner} = fields
            const objectID = pid;
            
            // update project in algolia
            index.saveObject({title,
                objectID,
                title,
                description,
                createdBy,
                owner,
                id: pid
            })
          })
      }
      else {
          console.log('no pid passed')
      }
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


function GetUserSkills(uid) {
    const [skills, setSkills] = useState([])
    useEffect(() => {
        async function GetSkills() {
            if(uid) {
                let skills_ref = db.collection("users").doc(uid).collection("skills")
                let skills_promise = await skills_ref.get()
                //console.log(skills)
                setSkills(await skills_promise.docs.map(x => x.data().word))
            }
        }
        GetSkills()
    })
    return skills
}


//TODO: maybe fix this if it has errors
        /*
            this does not match the DB schema
        */
async function AddUserSkill(uid, skill) {
    skill = skill.toLowerCase()
    if(uid) {
    // get user skill and keyword references
        let user_skills_ref = db.collection("users").doc(uid).collection("skills")
        let keywords_ref = db.collection("keywords")
    
    // retrieve user skills collection
        let user_skills_promise = await user_skills_ref.get()
        let user_skills = await user_skills_promise.docs.map(x => x.data().word)
        console.log(user_skills)
    
    // retrieve array of skills matching parameter
        let matching_skills_promise = await user_skills_ref.where('word', '==', skill).get()
        let matching_skills = await matching_skills_promise.docs.map(x => x.data().word)
        console.log(matching_skills)
    
    // if matching skills is empty (there is no matching skill) <-- it must be added to user skill
    // collection at the end of the if statement
        if(matching_skills.length == 0) {
        // retrieve the keyword collection and find matching skills
            let keywords_promise = await keywords_ref.where('word', '==', skill).get()
            let keywords = await keywords_promise.docs.map(x => x.data().word)
        // if matching keywords is empty (there is no matching skill) add new skill to keywords
            if(keywords.length == 0) {
                keywords_ref.add({word:skill})
            } else {
                console.log("Skill already exists in the keywords collection")
            }
        // add new skill to user's skill collection
            user_skills_ref.add({word:skill})

        } else {
             console.log("Skill already in user's skills")
        }
    }
}

//TODO: remove user skill
async function removeUserSkill(uid, skill) {
    skill = skill.toLowerCase()
    if(uid) {

    }
}

//TODO: get project skill requirements
function GetProjectRequirements(pid) {

}

//TODO: add skill requirements to project
function AddProjectRequirement(pid, skill) {
    if(pid) {
        
    }
}

//TODO: remove skill requirement to projects
function RemoveProjectRequirement(pid, skill) {
    
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

async function AddApplication (uid, project_ref){
    //allows a user to apply for a project  
    let date = new Date();
    let timestamp = date.getTime();
    let readTime = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timestamp)
    
    //check if user has already applied
    let app_ref_usr = db.collection('users').doc(uid).collection('applications');
    let matching_proj_app_promise = await app_ref_usr.where('proj_ref', '==', project_ref).get()
    let matching_proj_app = await matching_proj_app_promise.docs.map(x => x.data().proj_ref)

    //check if user is member
    let app_ref_proj = db.collection('projects').doc(project_ref.id).collection('pending_applications');
    let matching_usr_app_promise = await app_ref_proj.where('user', '==', db.doc(`users/${uid}`)).get()
    let matching_usr_app = await matching_usr_app_promise.docs.map(x => x.data().user)

    //check if user is owner
    let uidIsOwner = (project_ref.owner == uid) ? true : false;

    
    if(matching_proj_app.length === 0 && matching_usr_app.length === 0 && !uidIsOwner){
        console.log("ADDED APPLICATION");
        if(uid && project_ref){
            db
            .collection('users')
            .doc(uid)
            .collection('applications')
            .add({date_applied: readTime, proj_ref:project_ref})

            project_ref
            .collection('pending_applications')
            .add({date_applied: readTime, user: db.doc(`users/${uid}`)})
        }

    }
    else{
        console.log("USER ALREADY APPLIED");
    }
}


export {createProject,                                          // C
        GetProfile, GetProject, GetProjects, GetMyProjects,     // R
        UpdateProfile, UpdateProject,                           // U
        DeleteProject, AddUserSkill, AddApplication,
        GetUserSkills}                                          // D