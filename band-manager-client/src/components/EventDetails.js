import React from 'react';

const EventDetails = (props) => {
  console.log('props.events: ', props.events);

  if (props.events.length === 0) {
    return (
      <div>
        <h4>No Current Events</h4>
      </div>
    );
  };

  return (
    <div className="EventDetails">
      {props.events.map(event => (
        <div key={event.id}>
          <strong className="EventTitle">{event.name}</strong>
          <p className="EventVenue"><strong>Venue:</strong></p>
          <p className="EventAddress">{event.address}</p>
          <p className="EventDate">{event.date}</p>
        </div>
      ))}
    </div>
  );
};

export default EventDetails;