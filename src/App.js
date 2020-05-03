//importing dependencies
import React from "react"
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';

//import other components here:
import ProtectedRoute from './components/backend/ProtectedRoute'
import NavigationBar from './components/frontend/NavigationBar'
import DeleteProject from './components/backend/DeleteProject'

//import pages/routes:
import Discover from './pages/Discover'
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'
import EditProject from './pages/EditProject'
import MyProjects from './pages/MyProjects'
import Project from './pages/Project'


//import styling...
import './styles/App.css'

function App() {
  return (
    <main>
      <NavigationBar />
      <Switch>
        <Route path='/' component={Discover} exact />
        <Route path='/users/:uid' component={Profile} exact />
        <Route path='/projects/:pid' component={Project} exact />
        
        <ProtectedRoute path='/edit/profile' component={EditProfile} exact />
        <ProtectedRoute path='/edit/project/:pid' component={EditProject} exact />
        <ProtectedRoute path='/delete/project/:pid' component={DeleteProject} exact />
        <ProtectedRoute path='/profile' component={Profile} />
        <ProtectedRoute path='/MyProjects' component={MyProjects} />
        
        <Route component={Error} />
      </Switch>
    </main>
  );
}

export default App
