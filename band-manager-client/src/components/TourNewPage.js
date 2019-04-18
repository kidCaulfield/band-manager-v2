import React from 'react';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { loadingApp  } from '../actions/appActions'
import { createTour } from '../actions/tourActions'

// Add redux persist later to persist currentUser value
// to fix AuthRoute redirecting to SignInPage

const TourNewPage = (props) => {

  const createTourOnSubmit = (params) => {
    props.onCreateTour(params, props)
  }

  const submitTour = (event) => {
    event.preventDefault();
    const { currentTarget } = event;
    const formData = new FormData(currentTarget);

    createTourOnSubmit({
      tours: {
        title: formData.get("title"),
        band: formData.get("band")
      }
    })
  }   

  if (props.loading === true) {
    console.log('props.loading: ', props.loading);
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
      <form className="form" onSubmit={submitTour}>
        <div>
          <label htmlFor="title">Title</label><br/>
          <input type="text" name="title"></input>
        </div>
        <div>
          <label htmlFor="band">Band</label><br/>
          <input type="text" name="band"></input>
        </div>
        <input className="button" type="submit" value="Create" />
      </form>
    </div>
  )
};

const tourSelector = createSelector(
  state => state.tours,
  tours => tours
)

const appSelector = createSelector(
  state => state.loading,
  loading => loading
);

const mapStateToProps = createSelector(
  appSelector, tourSelector,
  (loading, tours) => ({
    loading,
    tours
  })
);

const mapDispatchToProps = {
  onLoading: loadingApp,
  onCreateTour: createTour
}

export default connect(mapStateToProps, mapDispatchToProps)(TourNewPage);