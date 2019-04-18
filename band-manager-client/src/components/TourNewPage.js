import React from 'react';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { loadingApp } from '../actions/appActions'

// Add redux persist later to persist currentUser value
// to fix AuthRoute redirecting to SignInPage

const TourNewPage = (props) => {

  const createTour = (params) => {

  }
  if (props.onLoading === true) {
    return (
      <div className="sk-circle">
        <div className="sk-circle1 sk-child"></div>
        <div className="sk-circle2 sk-child"></div>
        <div className="sk-circle3 sk-child"></div>
        <div className="sk-circle4 sk-child"></div>
        <div className="sk-circle5 sk-child"></div>
        <div className="sk-circle6 sk-child"></div>
        <div className="sk-circle7 sk-child"></div>
        <div className="sk-circle8 sk-child"></div>
        <div className="sk-circle9 sk-child"></div>
        <div className="sk-circle10 sk-child"></div>
        <div className="sk-circle11 sk-child"></div>
        <div className="sk-circle12 sk-child"></div>
      </div>
    )
  }

  return (
    <div className="form-box">
      <h1 className="title blue">Create Tour</h1>
      <form className="form" onSubmit={createTour}>
        <div>
          <label htmlFor="email">email</label><br/>
          <input type="text" name="email"></input>
        </div>
        <div>
          <label htmlFor="password">password</label><br/>
          <input type="text" name="password"></input>
        </div>
        <input className="button" type="submit" value="Create" />
      </form>
    </div>
  )
};

const appSelector = createSelector(
  state => state.loading,
  loading => loading
);

const mapStateToProps = createSelector(
  appSelector,
  (loading) => ({
    loading,
  })
);

const mapDispatchToProps = {
  onLoading: loadingApp
}

export default connect(mapStateToProps, mapDispatchToProps)(TourNewPage);