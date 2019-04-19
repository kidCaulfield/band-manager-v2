import React, { useEffect } from 'react';
import TourDetails from './TourDetails';

import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { getTour } from '../actions/tourActions'

const TourPlanner = (props) => {
  const id = props.match.params.id;
  
  const showTour = (id) => {
    props.onGetTour(id);
  }

  useEffect(() => {
    showTour(id);
  }, [])

  if (props.tour.length === 0) {   
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
    <div className="TourPlanner">
      <TourDetails tour={props.tour} />
    </div>
  )
}

const tourSelector = createSelector(
  state => state.tour,
  tour => tour
)

const mapStateToProps = createSelector(
tourSelector,
  (tour) => ({
    tour
  })
);

const mapDispatchtoProps = {
  onGetTour: getTour
}

export default connect(mapStateToProps, mapDispatchtoProps)(TourPlanner);