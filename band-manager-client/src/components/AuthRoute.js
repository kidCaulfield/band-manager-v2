import React from 'react';
import { Route, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'
import { createSelector } from 'reselect'

const AuthRoute = props => {
  const { component: Component, restProps, currentUser } = props
  const isAuth = currentUser

  return (
    <Route
      {...restProps}
      render={routeProps => {
        if (isAuth) {
          return <Component {...routeProps} />;
        } else {
          return <Redirect to="/sign_in" />;
        }
      }}
    />
  )
};

const userSelector = createSelector(
  state => state.currentUser,
  currentUser => currentUser
);

const mapStateToProps = createSelector(
  userSelector,
  (currentUser) => ({
    currentUser
  })
);

export default connect(mapStateToProps)(AuthRoute);