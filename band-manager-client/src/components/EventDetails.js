import React from 'react';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';

var hdate = require('human-date')

const EventDetails = (props) => {

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
          <p className="EventVenue"><strong>Venue: {event.venue.name}</strong></p>
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

export default connect(mapStateToProps)(EventDetails);