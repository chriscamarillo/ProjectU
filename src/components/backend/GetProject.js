
import {useState, useEffect} from 'react'
import {db} from '../../services/firebase'
import { firestore } from 'firebase';

function GetProject(pid) {
    // not sure how to outsource this one
    // refer to /pages/Project.js
    const [details, setDetails] = useState()
    const [apps, setApps] = useState([])
    const [members, setMembers] = useState([])
    const [thread, setThread] = useState([])

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
 
        db.collection('applications').where('project', '==', firestore().doc(`projects/${pid}`))
            .get()
            .then((applicants) => {
                let apps_data = []
                applicants.forEach((applicant) => {
                    apps_data.push({id: applicant.id, ...applicant.data()})
                });
                setApps(apps_data);
            });
        
        db
            .collection('projects')
            .doc(pid)
            .collection('members')
            .get().
                then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        memberArr.push({id: doc.id, ...doc.data()});
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
                        threadArr.push({id:doc.id, ...doc.data()});
                    });
                    setThread(threadArr);
                });
        

        },[pid])

    console.log('loading...')
    return {details, apps, members, thread};
}

export default GetProject;