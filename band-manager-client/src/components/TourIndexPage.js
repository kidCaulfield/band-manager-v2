import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { loadingApp  } from '../actions/appActions'
import { getTours } from '../actions/tourActions'

const TourIndexPage = (props) => {

  useEffect(() => {
    props.onLoading();
    props.onGetTours();
  }, []);

  if (props.loading === true) {
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
    <div className="TourIndexPage-box">
      <h1 className="title underline blue">Your Tours</h1>
      <div className="Tour-list">
          {props.tours.map(tour => ( 
            <div className="List" key={tour.id}>
              <p>{tour.title}</p>
            </div>
          ))}
        </div>
    </div>
  )
}

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
  onGetTours: getTours
}

export default connect(mapStateToProps, mapDispatchToProps)(TourIndexPage);