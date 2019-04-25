import React from 'react';

const EventDetails = (props) => {
  console.log('props.events: ', props.events);
  return (
    <div className="EventDetails">
      {
        (props.events.length > 0) ? (
          props.events.map(event => (
            <div className="Event" key={event.id}>
              <h4 className="blue">{event.name}</h4>
            </div>
        ))):
          <div>
            <h4>No Current Events</h4>
          </div>
      }
    </div>
  )
}

export default EventDetails