import React from 'react';

const TourDetails = (props) => {
  return (
    <div className="TourDetails">
       <h3>{props.tour.title}</h3>
      <small>Band: {props.tour.band}</small>
    </div>
  )
}

export default TourDetails;