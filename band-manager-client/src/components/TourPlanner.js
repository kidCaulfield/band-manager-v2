import React, { useEffect } from 'react';
import TourDetails from './TourDetails';
import Map from './Map';

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
      <div className="Map-box">
        <Map
          id="myMap"
          options={{
            center: { lat: 41.0082, lng: 28.9784 },
            zoom: 8
          }}
          onMapLoad={map => {
            var marker = new window.google.maps.Marker({
              position: { lat: 41.0082, lng: 28.9784 },
              map: map,
              title: 'Hello Istanbul!'
            });
          }}
        />
      </div>
      <div className="TourDetails-box">
        <TourDetails tour={props.tour} />
      </div>
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