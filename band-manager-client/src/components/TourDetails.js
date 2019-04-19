import React from 'react';

const TourDetails = (props) => {
  console.log('props: ', props);
  return (
    <div className="TourDetails">
      <h1>{props.tour.title}</h1>
    </div>
  )
}

export default TourDetails;