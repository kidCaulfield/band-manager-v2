import React, { useEffect, useState } from 'react';

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
  
  ////// Costom Frontend Pagination Logic //////

  const [selectedEvents , setSelectedEvents] = useState([])
  const [howLong] = useState(props.events.length)
  const [loading, setLoading] = useState(true)

  const flick = (event) => {
    document.querySelector(".On").setAttribute("class", "pagination");
    const page = parseInt(event.currentTarget.innerText);
    let first;
    let last;
    if (page > 1) {
      first = (5 * page) - 5;
      last = (5 * page) - 1;
    } else {
      first = 0;
      last = 4;
    }
    document.getElementById(`${page}`).setAttribute("class", "pagination On")
    selectEvents(first, last)
  }

  const selectEvents = (first, last) => {
    setSelectedEvents(props.events.filter((event, index) => {
      if (index >= first && index <= last) {
        return event;
      }
      return null
    }));
  };
  
  const createPaginationNav = () => {
    const paginationNav = [];
    if (Math.floor(howLong / 10) === (howLong / 10)) {
      for(let i = 1; i <= Math.floor(howLong / 5); i++) {
      paginationNav.push(<div className="pagination" onClick={flick} id={i} key={i}>{i}</div>)
      };
      return paginationNav
    } else {
      for(let i = 1; i <= Math.ceil(howLong / 5); i++) {
        paginationNav.push(<div className="pagination" onClick={flick} id={i} key={i}>{i}</div>)
      };
      return paginationNav;
    };
  }

  const initialize = () => {
    if (loading) {
      const child = document.querySelector(".Paginate").lastChild
      child.setAttribute("class", "pagination On");
      const difference = howLong % 5;
      const start = howLong - difference;
      const end = howLong;
    selectEvents(start, end);
    };
    return null
  };

  useEffect(() => {
    initialize()
    setLoading(false);
  }, []);

  return (
    <div className="EventDetails">
      <h2 className="blue">Events</h2>
      {selectedEvents.map(event => (
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
      <div className="Paginate">
        { createPaginationNav().map(node => (node)) }
      </div>
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