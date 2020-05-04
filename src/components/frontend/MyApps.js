import React from 'react'
import MyAppEntry from './MyAppEntry';
import '../../styles/MyApps.css'


const MyApps = (props) => {
    const apps = props.apps;
    console.log(apps)
    return (
        (apps) ?
            <div className="MyApps">
                <h1>Pending Applications</h1>
                    <div class="alist">
                        {apps.map((app, i) =>
                            // <div className="information">
                            <div class="col myapp-entry">
                                <div class="card">
                                    <MyAppEntry app={app} />
                                </div>
                            </div>
                        )}
                    </div>
            </div> :
            <p>Loading My Projects...</p>
    )
}

export default MyApps;