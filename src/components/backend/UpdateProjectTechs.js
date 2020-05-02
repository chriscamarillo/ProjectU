import {db} from '../../services/firebase'

async function AddTech(ref, tech) {
    let add = await ref.add({name:tech.name})
    // console.log(add)
} 

async function RemoveTech(ref, tech) {
    let rem = await ref.doc(tech).delete()
    // console.log(rem)
}

async function UpdateTech(ref, tech) {
    let upd = await ref.doc(tech.id).set({name:tech.name})
    // console.log(upd)
}

const UpdateProjectTechs = (pid, techs_before, techs_after) => {
    if(pid) {
        let techs_ref = 
            db
            .collection('projects')
            .doc(pid)
            .collection('techs')

            let appended = (techs_after) ? techs_after.filter(x => x.id =="") : []
            let removed = (techs_before) ? techs_before.filter(e => !techs_after.find(a => e.id == a.id)) : []
            let updated = (techs_before) ? techs_after.filter(e => techs_before.find(a => (e.id == a.id) && (e.name != a.name))) : []

            for(var i = 0; i < appended.length; ++i) {
                AddTech(techs_ref, appended[i])
            }
    
            for(var i = 0; i < removed.length; ++i) {
                RemoveTech(techs_ref, removed[i])
            }
    
            for(var i = 0; i < updated.length; ++i) {
                UpdateTech(techs_ref, updated[i])
            }
    }
}

export default UpdateProjectTechs