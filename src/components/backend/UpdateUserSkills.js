import {db} from '../../services/firebase'


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
        // console.log("before",skills_before)
        // console.log("after",skills_after)
        
        let skills_ref = 
            db
            .collection("users")
            .doc(uid)
            .collection("skills");

        let appended = skills_after.filter(x => x.id =="")
        let removed = skills_before.filter(e => !skills_after.find(a => e.id == a.id))
        let updated = skills_after.filter(e => skills_before.find(a => (e.id == a.id) && (e.name != a.name)))

        // console.log("appended", appended)
        // console.log("removed", removed)
        // console.log("updated", updated)

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