
import React, { useState, useEffect } from 'react'
import { db } from '../../services/firebase'
import { firestore } from 'firebase';

// Split into parts cause re rendering the page is a NO NO

const GetDetails = (pid) => {

    const [details, setDetails] = useState([])
    useEffect(() => {
        const unsubscribe =
            db
                .collection('projects')
                .doc(pid)
                .onSnapshot((details) => {
                    setDetails(details.data())
                })

        return () => unsubscribe()
    }, [pid])
    return details
}

function GetApps(pid) {
    const [apps, setApps] = useState([])
    useEffect(() => {
        const unsubscribe =
            db.collection('applications').where('project', '==', firestore().doc(`projects/${pid}`))
                .onSnapshot((applicants) => {
                    let apps_data = []
                    applicants.forEach((applicant) => {
                        apps_data.push({ id: applicant.id, ...applicant.data() })
                    });
                    setApps(apps_data);
                });
    }, [pid])
    return apps;
}

function GetMembers(pid) {
    const [members, setMembers] = useState([])
    useEffect(() => {
        let unsubscribe = db
            .collection('projects')
            .doc(pid)
            .collection('members')
            .onSnapshot(function (querySnapshot) {
                let memberArr = [];
                querySnapshot.forEach(async function (doc) {
                    // get some shallow profile data
                    let promise = await db.collection('users').doc(doc.id).get().then((shallow_info) => {
                        memberArr.push({ id: doc.id, ...doc.data(), ...shallow_info.data() });
                    })
                });
                setMembers(memberArr);
            });

        return () => unsubscribe();
    }, [pid])
    return members;
}

function GetThread(pid) {
    const [thread, setThread] = useState([])
    useEffect(() => {
        const unsubscribe =
            db
                .collection('projects')
                .doc(pid)
                .collection('thread')
                .onSnapshot(function (querySnapshot) {
                    let threadArr = [];
                    querySnapshot.forEach(function (doc) {
                        threadArr.push({ id: doc.id, ...doc.data() });
                    });
                    setThread(threadArr);
                });

        return () => unsubscribe()
    }, [pid])
    return thread;
}

function GetTech(pid) {

}
function GetProject(pid) {
    // not sure how to outsource this one
    // refer to /pages/Project.js
    const [details, setDetails] = useState()
    const [apps, setApps] = useState([])
    const [members, setMembers] = useState([])
    const [thread, setThread] = useState([])
    const [techs, setTechs] = useState()

    var appArr = [];
    var memberArr = [];
    var threadArr = [];
    var techsArr = []


    useEffect(() => {
        db
            .collection('projects')
            .doc(pid)
            .onSnapshot((details) => {
                setDetails(details.data())
            })

        db.collection('applications').where('project', '==', firestore().doc(`projects/${pid}`))
            .get()
            .then((applicants) => {
                let apps_data = []
                applicants.forEach((applicant) => {
                    apps_data.push({ id: applicant.id, ...applicant.data() })
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
                    // get some shallow profile data
                    db.collection('users').doc(doc.id).get().then((shallow_info) => {

                        memberArr.push({ id: doc.id, ...doc.data(), ...shallow_info.data() });
                    })
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
                    threadArr.push({ id: doc.id, ...doc.data() });
                });
                setThread(threadArr);
            });

        //get techs
        db
            .collection('projects')
            .doc(pid)
            .collection('techs')
            .get().
            then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    techsArr.push({ id: doc.id, ...doc.data() });
                });
                setTechs(techsArr);
            });


    }, [])

    console.log('loading...')
    return { details, apps, members, thread, techs };
}

export default GetProject
export { GetDetails, GetApps, GetMembers, GetThread, GetTech };