import React from 'react'
import { Link } from 'react-router-dom'

const MyAppEntry = (props) => {
    const app = props.app;
    return (
        <Link to={app.project.path} >
            <div class="card-body">
                <h5 class="card-title">{app.title}</h5>
            </div>
        </Link>
    )
}

export default MyAppEntry;