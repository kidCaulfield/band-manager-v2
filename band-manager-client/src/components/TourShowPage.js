import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { getTour } from '../actions/tourActions';
import { getEvents } from '../actions/eventActions';

var hdate = require('human-date')

const TourShowPage = (props) => {
  
  useEffect(() => {
    props.onGetTour(props.match.params.id)
    props.onGetEvents(props.match.params.id)
  }, []);

  if (!props.tour) {
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
    <div className="TourShowPage">
      <div className="underline">
        <h1 className="blue">{props.tour.title}</h1>
      </div>
      <h2 className="blue">Events</h2>
      {props.events.map(event => (
        <div key={event.id}>
          <strong className="EventTitle">{event.name}</strong>
          <p className="EventVenue"><strong>Venue: {event.venue.name}</strong></p>
          { !event.venue.formatted_address ?
            <p className="EventAddress">{event.venue.address}</p>
          : <p className="EventAddress">{event.venue.formatted_address}</p>
          }
          <p className="EventAddress">{event.venue.international_phone_number}</p>
          <p className="EventAddress"><a href={`${event.venue.website}`}>{event.venue.website}</a></p>
          <p className="EventDate">{hdate.prettyPrint(event.date_time)}</p>
        </div>
      ))}
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
)

const mapStateToProps = createSelector(
tourSelector, eventsSelector,
  (tour, events) => ({
    tour,
    events
  })
);

const mapDispatchtoProps = {
  onGetEvents: getEvents,
  onGetTour: getTour,
}

export default connect(mapStateToProps, mapDispatchtoProps)(TourShowPage);