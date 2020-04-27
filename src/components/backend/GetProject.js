
import {useState, useEffect} from 'react'
import {db} from '../../services/firebase'


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

export default GetProject;