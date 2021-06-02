import React from 'react';
import { Route, Redirect  } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, auth, ...rest }) => {
  return (
    <Route {...rest} render={
        props => {
          // if email exists in store, allow access to protected component
          if (auth.token) {
            return <Component {...rest} {...props} />
          } else {
            // if email does not exist in store, redirect to login page
            return <Redirect to={
              {
                pathname: '/',
                state: {
                  from: props.location
                }
              }
            } />
          }
        }
      } />
  )
}

export default ProtectedRoute;