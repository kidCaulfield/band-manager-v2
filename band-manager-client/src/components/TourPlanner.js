import React, { useEffect } from 'react';
import TourDetails from './TourDetails';
import Map from './Map';
import InfoWindow from './InfoWindow';

import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { getTour } from '../actions/tourActions'
import { getVenues } from '../actions/venueActions'

const TourPlanner = (props) => {
  const id = props.match.params.id;
  
  const showVenues = () => {
    props.onGetVenues()
  }

  const showTour = (id) => {
    props.onGetTour(id);
  }

  const makeMarker = (marks, map) => {
    return marks.forEach(mark => {
      if (mark.geo != null) {
      var marker = new window.google.maps.Marker({
              position: { lat: mark.geo.latitude, lng: mark.geo.longitude },
              map: map,
              title: 'Hello Istanbul!'
            });
            marker.addListener('click', e => {
            createInfoWindow(e, map)
            })
    return marker;
    }
    });
  }

  const createInfoWindow = (e, map) => {
    const infoWindow = new window.google.maps.InfoWindow({
        content: `<div id="infoWindow"></div>`,
        position: { lat: e.latLng.lat(), lng: e.latLng.lng() }
    })
    infoWindow.addListener('domready', e => {
      return (<InfoWindow />, document.getElementById('infoWindow'))
    })
    infoWindow.open(map)
  }

  useEffect(() => {
    showVenues();
    showTour(id);
  }, [])
  
  console.log('venues: ', props.venues);
  if (props.tour.length === 0 || props.venues.length === 0) {   
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
            center: { lat: 49.2827, lng: -123.1207 },
            zoom: 8
          }}
          onMapLoad={map => {
            makeMarker(props.venues, map)
          }}
        />
      </div>
      <div className="TourDetails-box">
        <TourDetails tour={props.tour} />
      </div>
    </div>
  )
}

const venuesSelector = createSelector(
  state => state.venues,
  venues => venues
)

const tourSelector = createSelector(
  state => state.tour,
  tour => tour
)

const mapStateToProps = createSelector(
tourSelector, venuesSelector,
  (tour, venues) => ({
    tour,
    venues
  })
);

const mapDispatchtoProps = {
  onGetVenues: getVenues,
  onGetTour: getTour
}

export default connect(mapStateToProps, mapDispatchtoProps)(TourPlanner);