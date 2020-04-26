import { useState, useEffect} from "react"
import { db } from '../../services/firebase'

function CreateDoc(c_path, doc_id) {
    // Return promise after creating doc
    // for then calls
    return db
        .collection(c_path)
        .add(doc_id);
}

function ReadDoc(c_path, doc_id) {
    const [details, setDetails] = useState()

    useEffect(()=>{
        // Get data
        const unsub = db
            .collection(c_path)
            .doc(doc_id)
            .onSnapshot(({data})=> setDetails(data()));

        return () => unsub();

        // if doc_id changes we run the effect.
        },[doc_id]);
    return details;
}

function ReadCollection (c_path) {
    const [docs, setDocs] = useState()

    // Get data
    useEffect(() => {
        const unsub = db.collection(c_path)
            .onSnapshot(({data}) => setDocs(data()));

        // clean up function for useEffect
        return () => unsub();
    }, [docs]);
    return docs;
}

function UpdateDoc(c_path, doc_id, fields) {
    // returns Promise after updating doc
    // 
    return db
        .collection(c_path)
        .doc(doc_id)
        .update(fields);
}

/*
    TODO: Anything below implement it into separate backend components
    whose job implements fbhelper
*/
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

export {CreateDoc, ReadDoc, ReadCollection, UpdateDoc};