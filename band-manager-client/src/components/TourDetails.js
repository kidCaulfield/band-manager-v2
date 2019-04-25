import React from 'react';
import EventDetails from './EventDetails';

const TourDetails = (props) => {
   
  return (
    <div className="TourDetails">
       <h3>{props.tour.title}</h3>
      <small>Band: {props.tour.band}</small>
      <EventDetails id={props.tour.id} />
    </div>
  )
}

export default TourDetails;