import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';

var hdate = require('human-date')

const EventDetails = (props) => {
  
  ////// First Custom Frontend Pagination Logic //////

  const [selectedEvents , setSelectedEvents] = useState([])
  const [loading, setLoading] = useState(true)
  
  const click = (event) => {
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
    if (Math.floor(props.events.length / 10) === (props.events.length / 10)) {
      for(let i = 1; i <= Math.floor(props.events.length / 5); i++) {
      paginationNav.push(<div className="pagination" onClick={click} id={i} key={i}>{i}</div>)
      };
      return paginationNav
    } else {
      for(let i = 1; i <= Math.ceil(props.events.length / 5); i++) {
        paginationNav.push(<div className="pagination" onClick={click} id={i} key={i}>{i}</div>)
      };
      return paginationNav;
    };
  }

  const initialize = (length) => {
    if (!loading) {
      const child = document.querySelector(".Paginate").lastChild
      child.setAttribute("class", "pagination On");
    };
    let difference = length % 5;
    if (difference === 0) {
      difference = 5;
    }
    if (difference === 1) {
      document.querySelector(".On").setAttribute("class", "pagination");
      const child = document.querySelector(".Paginate").lastChild;
      child.setAttribute("class", "pagination On");
    }
    const start = length - difference;
    const end = length;
    selectEvents(start, end);

    return null
  };

  useEffect(() => {
    initialize(props.events.length)
    setLoading(false);
  }, [props.events.length]);

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
      {selectedEvents.map(event => (
        <div key={event.id}>
          <strong className="EventTitle">{event.title}</strong>
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