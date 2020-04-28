import React, { useState, useEffect} from "react"
import {db} from '../../services/firebase'


function GetUserSkills(uid) {
    const [skills, setSkills] = useState([])
    useEffect(() => {
        const unsubscribe = db.collection("users").doc(uid).collection("skills")
            .onSnapshot(snapshot => {
                const newSkills = snapshot.docs.map(x => ({skill:x.data().name,
                    id:x.id}))
                setSkills(newSkills)
            })   
        return () => unsubscribe()
    },[])
    return skills
}


// uses reference to retrieve a snapshot of a user's skills from the database
// and returns them as an array
function GetSkills(ref) {
    let skills = []
    let sids = []
    let query = ref.get()
        .then(snapshot => {
            if(snapshot.empty) {
                console.log("No matching documents")
                return
            }
            snapshot.forEach(doc => {
                skills.push(doc.data().name)
                sids.push(doc.id)
            })
            //console.log(skills)
        })
        .catch(err => {
            console.log("Error getting documents", err)
        })
    return [skills, sids]
}

function GetRemovedIds(skills, sids, removed) {
    let removed_ids = []
    if(skills.length == sids.length) {
        var j = 0
        for(var i = 0; i < skills.length; ++i) {
            if(skills[i] == removed[j]) {
                removed_ids.push(sids[i])
                j++
            }
        }
    }
    return removed_ids
}

async function AddSkill(ref, skill) {
    let add = await ref.add({name:skill})
    console.log(add)
} 

async function RemoveSkill(ref, sid) {
    let rem = await ref.doc(sid).delete()
    console.log(rem)
}

const UpdateUserSkills = (uid, skills_update) => {
    if(uid) {
        let skills_ref = 
            db
            .collection("users")
            .doc(uid)
            .collection("skills");

        let skills_and_sids = GetSkills(skills_ref)
        let curr_skills = skills_and_sids[0]
        let curr_skill_sids = skills_and_sids[1]
        let appended = skills_update.filter(x => !curr_skills.includes(x))
        let removed = curr_skills.filter(x => !skills_update.includes(x))
        let removed_sids = GetRemovedIds(curr_skills, curr_skill_sids, removed)

        for(var i = 0; i < appended.length; ++i) {
            AddSkill(skills_ref, appended[i])
        }

        for(var i = 0; i < removed_sids.length; ++i) {
            RemoveSkill(skills_ref, removed_sids[i])
        }
    }
}

export {UpdateUserSkills, GetUserSkills}