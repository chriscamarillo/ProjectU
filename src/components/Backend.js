import { db } from '../services/firebase'

/*
    THIS IS NOT USED ANYMORE!

    unfinished functions are placed here for testing
    and should be moved to /components/backend/ when finished into their own components
*/

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


async function AddApplication (uid, project_ref){
    //allows a user to apply for a project  
    let date = new Date();
    let timestamp = date.getTime();
    let readTime = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timestamp)
    let app_ref = db.collection('users').doc(uid).collection('applications');

    let matching_proj_promise = await app_ref.where('proj_ref', '==', project_ref).get()
    let matching_proj = await matching_proj_promise.docs.map(x => x.data().proj_ref)
    
    if(matching_proj.length === 0){
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


export { AddUserSkill, AddApplication}