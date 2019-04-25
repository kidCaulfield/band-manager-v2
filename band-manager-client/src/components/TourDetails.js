import React, { useEffect } from 'react';
import EventDetails from './EventDetails';

import { connect } from 'react-redux';
import { getEvents } from '../actions/eventActions';
import { createSelector } from 'reselect'

const TourDetails = (props) => {

  useEffect(() => {
    props.onGetEvents(props.tour.id)
  }, []);
   
  return (
    <div className="TourDetails">
       <h3>{props.tour.title}</h3>
      <small>Band: {props.tour.band}</small>
      <div className="EventDetails-box">
        <EventDetails events={props.events} />
      </div>
    </div>
  )
}

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

export default connect(mapStateToProps, mapDispatchToProps)(TourDetails);