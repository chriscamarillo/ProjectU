import React from "react";
import { Link, NavLink } from "react-router-dom"
import { useUser } from '../backend/UserProvider'
import { Nav, Navbar, Form, FormControl } from 'react-bootstrap';
import { signInWithGoogle, signOut} from "../../services/firebase"
import styled from 'styled-components' 
import '../../styles/NavigationBar.css'
import Logo from '../../ProjectULogo.png'

const Styles = styled.div`
  .navbar { background-color: #222; }
  a, .navbar-nav, .navbar-light .nav-link {
    color: #9FFFCB;
    &:hover { color: white; }
  }
  .navbar-brand {
    font-size: 1.4em;
    color: #9FFFCB;
    &:hover { color: white; }
  }
  .form-center {
    position: absolute !important;
    left: 25%;
    right: 25%;
  }
;
`

const NavigationBar = () => {
    var currentUser = useUser()
    return(
    <Styles className='NavigationBar'>
      <Navbar expand="lg">
        <Navbar.Brand href="/">Discover</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
               {/* <Link to="/">Discover </Link> */}
               {(currentUser)?(
                  [
                      <Nav.Item>
                        <Nav.Link>
                          <Link to={`/users/${currentUser.uid}`}>Profile </Link>
                        </Nav.Link>
                      </Nav.Item>,
                      <Nav.Item>
                        <Nav.Link>
                          <Link to="/MyProjects">Projects </Link>
                        </Nav.Link>
                      </Nav.Item>,
                      <Nav.Item>
                        <Nav.Link>
                          <Link to ="/">
                            <button onClick={()=> {signOut()}}>Sign out</button>
                          </Link>
                        </Nav.Link>
                      </Nav.Item>
                  ]
              ):(<Nav.Item><button onClick={signInWithGoogle}>Sign in with Google</button></Nav.Item>)}              
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <img src= {Logo}/>
    </Styles>

    )
    // return(
    //     <div>
    //     </div>
    // )
}

export default NavigationBar;