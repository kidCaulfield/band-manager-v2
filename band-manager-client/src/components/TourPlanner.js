import React, { useState, useEffect } from 'react';
import TourDetails from './TourDetails';
import EventsNewPage from './EventsNewPage';
import Map from './Map';
import { Location, Google } from '../requests';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { getTour } from '../actions/tourActions';
import { getVenues } from '../actions/venueActions';
import { getEvents } from '../actions/eventsActions';


/* CHECK LIST

  * Edit tours
  * add area to tours
  * User Created venues
  * Add redux persist later to persist currentUser value to fix AuthRoute redirecting to SignInPage
  * TourShowPage with map of confirmed events with suggested route via google routes // after deployment

*/

const TourPlanner = (props) => {
  let [selectedVenue, setSelectedVenue] = useState({name: 'Click on a marker to add venue to your event'})
  let [countries, setCountries] = useState([])
  let [selectedCountry, setSelectedCountry] = useState('Select Country')
  let [regions, setRegions] = useState([])
  let [selectedRegion, setSelectedRegion] = useState('Select Region')
  let [cities, setCities] = useState([])
  let [selectedCity, setSelectedCity] = useState({city: 'Select City'})
  let [coorinates, setCoorinates] = useState({ lat: 49.2827, lng: -123.1207 })
  const id = props.match.params.id;
  
  const showVenues = () => {
    props.onGetVenues()
  };

  const showTour = (id) => {
    props.onGetTour(id);
  };

  const getCoordinates = async () => {
    if (!selectedCity.geo) {
      const locationData = await Google.locationGeo(
        {
          country: selectedCountry,
          region: selectedRegion,
          city: selectedCity.city
        });
      const updateLocationGeo = await Location.update({locationData}, selectedCity.id)
      setCoorinates(updateLocationGeo.geo)
    } else {
      setCoorinates(selectedCity.geo)
    }
  };

  const getCountries = async () => {
    const res = await Location.countries();
    setCountries(res.countries);
  };

  const getRegions = async (params) => {
    const res = await Location.regions(params)
    setRegions(res.regions)
  };

  const getCities = async (params) => {
    const res = await Location.cities(params)
    setCities(res.cities)
  };

  const handleChangeCountry = (event) => {
    getRegions({country: event.target.value});
    setSelectedCountry(event.target.value);
    setSelectedRegion('Select Region');
    setSelectedCity({city: 'Select City'});
    setRegions([])
    setCities([])
  };

  const handleChangeRegion = (event) => {
    getCities({country: selectedCountry, region: event.target.value});
    setSelectedRegion(event.target.value);
    setSelectedCity({city: 'Select City'});
    setCities([])
  };
  
  const handleChangeCities = (event) => {
    const childNode = document.getElementById(event.target.value)
    const nodeIndex = childNode.getAttribute("class");
    setSelectedCity(cities.find((element, index) => { if (index === parseInt(nodeIndex)) {
        return element;
      };
      return null;
    }));

  };

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
    getCountries();
    props.onGetEvents(id);
  }, []);

  useEffect(() => {
    if (selectedCity.city !== 'Select City') {
       getCoordinates()
    };
  }, [selectedCity]);
  
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
            center: coorinates,
            zoom: 8
          }}
          onMapLoad={map => {
            makeMarker(props.venues, map)
          }}
        />
        <h3 className="blue map-nav">Map navagation</h3>
        <div className="custom-select-box">
          <select className="custom-select" name="country" id="country" value="country" onChange={handleChangeCountry}>
            <option value="Choose">{selectedCountry}</option>
            {countries.map((country, index) => (
              <option value={country.country} key={index}>{country.country}</option>
            ))}
          </select>
          <select className="custom-select" name="region" id="region" value="Region" onChange={handleChangeRegion}>
            <option value="Choose">{selectedRegion}</option>
            {regions.map((region, index) => (
              <option value={region.region} key={index}>{region.region}</option>
            ))}
          </select>
          <select className="custom-select" name="cites" id="cities" value="city" onChange={handleChangeCities}>
            <option value="Choose">{selectedCity.city}</option>
            {cities.map((city, index) => (
              <option className={index} value={city.city} key={index} id={city.city}>{city.city}</option>
            ))}
          </select>
        </div>
        <h3 className="blue map-nav">Create Event</h3>
        <div className="EventsNewPage-box">
        <div>
          <EventsNewPage
            id={id}
            selected={selectedVenue}
            events={props.events.length}
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