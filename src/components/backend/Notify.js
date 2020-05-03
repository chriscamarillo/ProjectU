import { db } from '../../services/firebase'

async function AddNotification(uid, message, target) {
    let ref = db.collection('users').doc(uid).collection('notifications')
    let add = await ref.add({message:message, target:target})
    console.log('added', {message:message, target:target})
}

async function RemoveNotification(uid, nid) {
    let ref = db.collection('users').doc(uid).collection('notification')
    let rem = await ref.doc(nid).delete()
    console.log('delete', nid)
}

export {AddNotification, RemoveNotification}