//importing dependencies
import React from "react"
import { Route, Switch } from 'react-router-dom';

//import other components here:
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import {DeleteProject} from './components/Backend'

//import pages/routes:
import Discover from './pages/Discover'
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'
import MyProjects from './pages/MyProjects'
import Project from './pages/Project'

//import styling...
import './styles/App.css'

function App() {
  return (
    <main>
      <Navbar />
      <Switch>
        <Route path='/' component={Discover} exact />
        <Route path='/users/:uid' component={Profile} exact />
        <Route path='/projects/:pid' component={Project} exact />
        
        <ProtectedRoute path='/edit/profile' component={EditProfile} exact />
        <ProtectedRoute path='/delete/project/:pid' component={DeleteProject} exact />
        <ProtectedRoute path='/profile' component={Profile} />
        <ProtectedRoute path='/MyProjects' component={MyProjects} />
        
        <Route component={Error} />
      </Switch>
    </main>
  );
}

export default App
