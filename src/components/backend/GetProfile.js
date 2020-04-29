import { useState, useEffect } from 'react'
import {db} from '../../services/firebase'


function GetProfile(uid) {
    const [user, setUser] = useState()
    const [skills, setSkills] = useState()
    const [links, setLinks] = useState()
    const [projects, setProjects] = useState()

    var projsArr = [];
    var linksArr = [];
    var skillsArr = [];

    var docRef; 

    //get shallow data
    useEffect(()=>{
        db
            .collection('users')
            .doc(uid)
            .onSnapshot((usr)=>{
                setUser(usr.data());
            })

    //get skills
        db
            .collection('users')
            .doc(uid)
            .collection('skills')
            .get().
                then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        skillsArr.push({id:doc.id,...doc.data()});
                    });
                    setSkills(skillsArr);
                });
    
    //get links
        db
            .collection('users')
            .doc(uid)
            .collection('links')
            .get().
                then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        linksArr.push(doc.data());
                    });
                    setLinks(linksArr);
                });

    //get projects
        db
            .collection('users')
            .doc(uid)
            .collection('projects')
            .get().
                then(function (querySnapshot) {
                    if(querySnapshot.length > 0){
                        querySnapshot.forEach(function (doc) {
                            doc.data().proj_ref.get()
                            .then(res => { 
                                projsArr.push(res.data());
                            }) 
                        });
                    }
                    setProjects(projsArr);
                });            

        },[uid]);
    
    return {user, skills,  projects, links};
}

export default GetProfile;