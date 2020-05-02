import { useState, useEffect} from "react"
import { firestore } from 'firebase';
import { db } from '../../services/firebase'

function GetApplicants(pid) {
    const project_ref = firestore().doc(`projects/${pid}`)

    const [apps, setApps] = useState([])
    useEffect(() => {
        db.collection('applications').where('project', '==', project_ref)
        .get()
        .then((applicants) => {
            let apps_data = []
            applicants.forEach((applicant) => {
                apps_data.push({id: applicant.id, ...applicant.data()})
            });
            setApps(apps_data);
        });
    }, [apps]);

    return apps;
}

export default GetApplicants;