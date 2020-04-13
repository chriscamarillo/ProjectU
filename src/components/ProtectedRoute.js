import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useUser } from './UserProvider';
export default ({ render, ...routeProps }) => {
  
  const authenticated = useUser()
  return (
    <Route
      {...routeProps}
      render={() => (authenticated ? 
        render() : 
        <Redirect to='/' />)
      }
    />
  );
};