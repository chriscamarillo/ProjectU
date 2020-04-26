import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useUser } from './UserProvider';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const authenticated = useUser() || undefined
  return (
    <Route {...rest} render={
      props => {
        if (authenticated) {
          return <Component {...rest} {...props} />
        } else {
          window.alert("log in to access this page")
          return <Redirect to='/' />
        }
      }
    } />
  )
}

export default ProtectedRoute