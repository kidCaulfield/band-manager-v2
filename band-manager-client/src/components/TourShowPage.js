import React, { useState, useEffect } from 'react';
import { Event, Tour } from '../requests';
import Map from './Map';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { getTour } from '../actions/tourActions';
import { getEvents } from '../actions/eventsActions';

var hdate = require('human-date')

const TourShowPage = (props) => {
  let [trigger, setTrigger] = useState(true);
  let [confirmedShow, setConfirmedShow] = useState(0);
  let [coordinates, setCoordinates] = useState({ lat: 49.2827, lng: -123.1207 });

  const confirmShow = async (event) => {
    const confirm = await Event.update(props.match.params.id, event.currentTarget.id, {'event': {'confirmed': true}});
    let checked = confirmedShow + 1
    setConfirmedShow(checked)
    return confirm
  };

  const editTour = () => {
    props.history.push(`/tour/${props.match.params.id}/edit`);
  };

  const confirmTour = async (event) => {
    const response = await Tour.update({tour: {title: props.tour.title, band: props.tour.band, confirmed: true}}, event.target.id);
    setTrigger(!trigger)
    return response
  };

  const editEvent = (event) => {
    props.history.push(`/tour/${props.match.params.id}/event/${event.currentTarget.id}`)
  };

  const deleteEvent = async (event) => {
    const destroy = await Event.delete(props.match.params.id, event.currentTarget.id)
    setTrigger(!trigger)
    return destroy
  };

  const makeMarker = (marks, map) => {
    return marks.forEach(mark => {
      if (mark.venue.geo != null && mark.confirmed === true) {
        var marker = new window.google.maps.Marker({
          position: { lat: mark.venue.geo.latitude, lng: mark.venue.geo.longitude },
          map: map,
          title: mark.venue.name
        });
        marker.addListener('click', e => {
          createInfoWindow(e, map, mark.venue);
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
  
  useEffect(() => {
    props.onGetTour(props.match.params.id)
    props.onGetEvents(props.match.params.id)
  }, []);

  useEffect(() => {
    props.onGetTour(props.match.params.id)
  }, [trigger])

  useEffect(() => {
    props.onGetEvents(props.match.params.id)
  }, [trigger]);

  useEffect(() => {
    props.onGetEvents(props.match.params.id)
  }, [confirmedShow]);

  if (props.events.length === 0) {
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
  };

  return (
    <div className="TourShowPage-box">
      <div className="TourShowPage" id="scroll">
        <div className="underline bp">
          <h1 className="blue">{props.tour.title}</h1>
          <small>Band: {props.tour.band}<strong className="Confirm" onClick={editTour}> edit</strong></small>
          { props.tour.confirmed ? 
            <p className="EventConfirmed">Tour confirmed</p> :
            <p className="EventUnconfirmed">pending confirmation</p>
          }
        </div>
        <h2 className="blue">Events</h2>
        {props.events.map(event => (
          <div className="EventList thin-underline" key={event.id}>
            <div>
              <strong className="EventTitle">{event.title}</strong>
              <p className="EventDate">{hdate.prettyPrint(event.date_time)}</p>
              <p className="EventVenue"><strong>Venue:</strong> {event.venue.name}</p>
              { !event.venue.formatted_address ?
                <p className="EventAddress">{event.venue.address}</p>
              : <p className="EventAddress">{event.venue.formatted_address}</p>
              }
              <p className="EventAddress">{event.venue.international_phone_number}</p>
              <p className="EventAddress"><a href={`${event.venue.website}`}>{event.venue.website}</a></p>
              { event.confirmed ? 
                <p className="EventConfirmed">show confirmed</p> :
                <p className="EventUnconfirmed">pending confirmation<strong className="Confirm" id={event.id} onClick={confirmShow}> confirm</strong></p>
              }
            </div>
            <div className="Buttons">
              <button className="Edit-button" onClick={editEvent} id={event.id}>edit</button>
              <button className="Delete-button" onClick={deleteEvent} id={event.id}>delete</button>
            </div>
          </div>
        ))}
        <button className="Confirm-button" onClick={confirmTour} id={props.tour.id}>Confirm Tour</button>
        <button className="Delete-button" onClick={deleteEvent} id={props.tour.id}>delete</button>
      </div>
      <div className="Map-box">
        <Map
          id="myMap"
          options={{
            center: coordinates,
            zoom: 8,
            events: props.events,
            showConfirmed: confirmedShow
          }}
          onMapLoad={map => {
            makeMarker(props.events, map)
          }}
        />
      </div>
    </div>
  )
};

const tourSelector = createSelector(
  state => state.tour,
  tour => tour
)

const eventsSelector = createSelector(
  state => state.events,
  events => events
);

const mapStateToProps = createSelector(
tourSelector, eventsSelector,
  (tour, events, event) => ({
    tour,
    events
  })
);

const mapDispatchtoProps = {
  onGetEvents: getEvents,
  onGetTour: getTour,
};

export default connect(mapStateToProps, mapDispatchtoProps)(TourShowPage);