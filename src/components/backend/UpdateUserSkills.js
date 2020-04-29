import {db} from '../../services/firebase'


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
    let add = await ref.add({name:skill.name})
    // console.log(add)
} 

async function RemoveSkill(ref, skill) {
    let rem = await ref.doc(skill.id).delete()
    // console.log(rem)
}

async function UpdateSkill(ref, skill) {
    let upd = await ref.doc(skill.id).set({name:skill.name})
    // console.log(upd)
}

const UpdateUserSkills = (uid, skills_before, skills_after) => {
    if(uid) {
        
        // skills_after  = skills_after.map((s, i) => (s.id))
        // skills_before = skills_before.map((s,i) => (s.id))

        console.log("before",skills_before)
        console.log("after",skills_after)
        
        let skills_ref = 
            db
            .collection("users")
            .doc(uid)
            .collection("skills");

        // let skills_and_sids = GetSkills(skills_ref)
        // console.log(skills_and_sids)
        
        // let curr_skills = skills_and_sids[0]
        // let curr_skill_sids = skills_and_sids[1]
        let appended = skills_after.filter(x => x.id =="")
        let removed = skills_before.filter(e => !skills_after.find(a => e.id == a.id))
        let updated = skills_after.filter(e => skills_before.find(a => (e.id == a.id) && (e.name != a.name)))

        console.log("appended", appended)
        console.log("removed", removed)
        console.log("updated", updated)

        //let removed_sids = GetRemovedIds(curr_skills, curr_skill_sids, removed)

        for(var i = 0; i < appended.length; ++i) {
            AddSkill(skills_ref, appended[i])
        }

        for(var i = 0; i < removed.length; ++i) {
            RemoveSkill(skills_ref, removed[i])
        }

        for(var i = 0; i < updated.length; ++i) {
            UpdateSkill(skills_ref, updated[i])
        }
    }
}

export default UpdateUserSkills