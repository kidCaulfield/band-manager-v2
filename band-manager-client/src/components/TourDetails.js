import React from 'react';
import EventDetails from './EventDetails';

const TourDetails = (props) => {
   
  return (
    <div className="TourDetails">
      <div className="underline">
        <h1 className="blue">Tour Planner</h1>
        <h3>{props.tour.title}</h3>
        <small>Band: {props.tour.band}</small>
      </div>
      <EventDetails id={props.tour.id} />
    </div>
  )
}

export default TourDetails;