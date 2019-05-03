import React from 'react';
import { Link } from 'react-router-dom';
import TourShowPage from './TourShowPage';
import EventDetails from './EventDetails';

const TourDetails = (props) => {
   
  return (
    <div className="TourDetails">
      <div className="underline">
        <h1 className="blue">Tour Planner</h1>
        <h3>
          <Link to={`${process.env.PUBLIC_URL}/tour/${props.tour.id}`}>
            {props.tour.title}
          </Link>
        </h3>
        <small>Band: {props.tour.band}</small>
      </div>
      <EventDetails id={props.tour.id} />
    </div>
  )
}

export default TourDetails;