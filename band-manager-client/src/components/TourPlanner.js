import React, { useEffect } from 'react';

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

  if (props.tours.length === 0 || props.tours.length > 1) {   
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
      <h1>{props.tours.title}</h1>
    </div>
  )
}

const tourSelector = createSelector(
  state => state.tours,
  tours => tours
)

const mapStateToProps = createSelector(
tourSelector,
  (tours) => ({
    tours
  })
);

const mapDispatchtoProps = {
  onGetTour: getTour
}

export default connect(mapStateToProps, mapDispatchtoProps)(TourPlanner);