import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { getEvents } from '../actions/eventActions';
import { createSelector } from 'reselect';
var hdate = require('human-date')

const EventDetails = (props) => {

  useEffect(() => {
    props.onGetEvents(props.id)
  }, []);

  if (props.events.length === 0) {
    return (
      <div>
        <h4>No Current Events</h4>
      </div>
    );
  };

  return (
    <div className="EventDetails">
      <h2 className="blue">Events</h2>
      {props.events.map(event => (
        <div key={event.id}>
          <strong className="EventTitle">{event.name}</strong>
          <p className="EventVenue"><strong>Venue: {event.venue}</strong></p>
          <p className="EventAddress">{event.address}</p>
          <p className="EventDate">{hdate.prettyPrint(event.date_time)}</p>
        </div>
      ))}
    </div>
  );
};

const eventSelector = createSelector(
  state => state.events,
  events => events
);

const mapStateToProps = createSelector(
  eventSelector,
  (events) => ({
    events
  })
);

const mapDispatchToProps = {
  onGetEvents: getEvents
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails);