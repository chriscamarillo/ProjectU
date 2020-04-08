import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { UserContext } from './UserProvider';
export default ({ render, ...routeProps }) => {
  const { authenticated } = useContext(UserContext);
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