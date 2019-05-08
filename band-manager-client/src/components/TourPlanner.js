import React, { useState, useEffect } from 'react';
import TourDetails from './TourDetails';
import EventsNewPage from './EventsNewPage';
import Map from './Map';
import { Location } from '../requests';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { getTour } from '../actions/tourActions';
import { getVenues } from '../actions/venueActions';
import { getEvents } from '../actions/eventsActions';


/* CHECK LIST

  * Bring Back fast Navingation
  * Show form Error Messages
  * TourShowPage with map of confirmed events with suggested route via google routes
  * Add redux persist later to persist currentUser value to fix AuthRoute redirecting to SignInPage
  * User Create venues
  * Confirm Tour
  * Show confirmed other users confirmed tours

*/

const TourPlanner = (props) => {
  let [selectedVenue, setSelectedVenue] = useState({name: 'Click on a marker to add venue to your event'})
  let [Regions, setRegions] = useState([])
  console.log('Regions: ', Regions);
  const id = props.match.params.id;
  
  const showVenues = () => {
    props.onGetVenues()
  }

  const showTour = (id) => {
    props.onGetTour(id);
  }

  const getLocations = async () => {
    const res = await Location.all();
    const regions = res.locations.map(location => location.region);
    
    setRegions(regions.filter(function(item, index){
          return regions.indexOf(item) >= index}))
  }

  const handleChange = (event) => {
    event.preventDefault();
  } 

  const makeMarker = (marks, map) => {
    return marks.forEach(mark => {
      if (mark.geo != null && typeof mark.geo.latitude === "number") {
        var marker = new window.google.maps.Marker({
          position: { lat: mark.geo.latitude, lng: mark.geo.longitude },
          map: map,
          title: mark.name
        });
        marker.addListener('click', e => {
          createInfoWindow(e, map, mark);
          selectVenue(mark)
        })
      return marker;
      }
    });
  }

  const createInfoWindow = (e, map, place) => {
    const infoWindow = new window.google.maps.InfoWindow({
        content: `<div id="infoWindow">${place.name}</div>`,
        position: { lat: e.latLng.lat(), lng: e.latLng.lng() }
    })
    infoWindow.addListener('domready', e => {
      return (document.getElementById('infoWindow'))
    })
    infoWindow.open(map)
  }

  const selectVenue = (venue) => {
    setSelectedVenue(venue);
  }

  useEffect(() => {
    showVenues();
    showTour(id);
    getLocations();
    props.onGetEvents(id)
  }, [])
  
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
        <div className="custom-select-box">
          {/* 
          
          ///////////////// I D E A ////////////////

          for crowd sourced location data
          
          <input className="custom-datalist" list="countries" name="country" />
          <datalist className="custom-select" id="countries">
            <option value="USA" />
            <option value="Canada" />
            <option value="UK" />
            <option value="Germany" />
            <option value="Japan" />
          </datalist>
          <input className="custom-datalist" list="countries" name="region" />
          <datalist className="custom-select" id="countries">
            <option value="USA" />
            <option value="Canada" />
            <option value="UK" />
            <option value="Germany" />
            <option value="Japan" />
          </datalist>
          <input className="custom-datalist" list="countries" name="city" />
          <datalist className="custom-select" id="countries">
            <option value="USA" />
            <option value="Canada" />
            <option value="UK" />
            <option value="Germany" />
            <option value="Japan" />
          </datalist> */}

          <select className="custom-select" name="country" id="country" value="country" onChange={handleChange}>
            <option value="Choose">Select Country</option>
            <option value="Choose">Canada</option>
          </select>
          <select className="custom-select" name="region" id="region" value="Region" onChange={handleChange}>
            <option value="Choose">Select Region</option>
          </select>
          <select className="custom-select" name="cites" id="cities" value="city" onChange={handleChange}>
            <option value="Choose">Select City</option>
          </select>
        </div>
        <div className="EventsNewPage-box">
        <div>
          <EventsNewPage
            id={id}
            selected={selectedVenue}
          />
        </div>
          <div className="SelectedVenue">
            <div>
              <strong className="SelectedVenue-text">{selectedVenue.name}</strong>
              <p className="SelectedVenue-text">{selectedVenue.address}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="TourDetails-box">
        <TourDetails tour={props.tour} />
      </div>
    </div>
  )
}

const eventsSelector = createSelector(
  state => state.events,
  events => events
)

const venuesSelector = createSelector(
  state => state.venues,
  venues => venues
)

const tourSelector = createSelector(
  state => state.tour,
  tour => tour
)

const mapStateToProps = createSelector(
tourSelector, venuesSelector, eventsSelector,
  (tour, venues, events) => ({
    tour,
    venues,
    events
  })
);

const mapDispatchtoProps = {
  onGetVenues: getVenues,
  onGetTour: getTour,
  onGetEvents: getEvents
}

export default connect(mapStateToProps, mapDispatchtoProps)(TourPlanner);