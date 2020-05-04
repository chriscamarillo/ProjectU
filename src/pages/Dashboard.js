import React from "react"
import { useUser } from '../components/backend/UserProvider'
import '../styles/MyProjects.css'

// import components here
import MyProjects from '../components/frontend/MyProjects'
import MyApps from '../components/frontend/MyApps'
import CreateProject from '../components/backend/CreateProject'
import GetMyProjects, { GetMyApps } from '../components/backend/GetMyProjects'
// Moved GetMyProjects

const Dashboard = () => {
    // Backend call
    const projects =  GetMyProjects(useUser().uid)
    const apps = GetMyApps(useUser().uid)
    console.log('re rendered dashboard')
    return(
        // Components for these project entries would make these messy links easier
        // to organize and style
        <div>
            <CreateProject />
            <div class="my-stuff">
                <MyProjects projects = {projects} />
                <MyApps apps={apps} />
            </div>
        </div>
    )
}
/*

*/
export default Dashboard