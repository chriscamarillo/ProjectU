//importing dependencies
import React from "react"
import { Route, Switch } from 'react-router-dom';

//import other components here:
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'

//import pages/routes:
import Discover from './pages/Discover'
import Profile from './pages/Profile'
import Projects from './pages/Projects'

//import styling...
import './styles/App.css'

function App() {
  return (
    <main>
      <Navbar />
      <Switch>
        <Route path='/' component={Discover} exact />
        <Route path='/users/:uid' component={Profile} exact />
        <ProtectedRoute path='/profile' component={Profile} />
        <ProtectedRoute path='/projects' component={Projects} />
        <Route component={Error} />
      </Switch>
    </main>
  );
}

export default App
