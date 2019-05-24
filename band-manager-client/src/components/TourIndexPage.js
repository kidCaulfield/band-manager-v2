import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { getTours } from '../actions/toursActions'

const TourIndexPage = (props) => {
  let [loading, setLoading] = useState(true)
  
  useEffect(() => {
    props.onGetTours();
    setLoading(false);
  }, []);

  if (loading === true) {
    return (
      <div className="sk-circle">
        <div className="sk-circle1 sk-child"></div>
        <div className="sk-circle2 sk-child"></div>
        <div className="sk-circle3 sk-child"></div>
        <div className="sk-circle4 sk-child"></div>
        <div className="sk-circle5 sk-child"></div>
        <div className="sk-circle6 sk-child"></div>
        <div className="sk-circle7 sk-child"></div>
        <div className="sk-circle8 sk-child"></div>
        <div className="sk-circle9 sk-child"></div>
        <div className="sk-circle10 sk-child"></div>
        <div className="sk-circle11 sk-child"></div>
        <div className="sk-circle12 sk-child"></div>
      </div>
    )
  }

  if (props.tours.length === 0) {
    return (
      <div className="TourIndexPage-box">
        <h1 className="title blue">Your Tours</h1>
        <h3>You currently have no tours</h3>
        <p>Navigate to "Tour New" to create one</p>
      </div>
    )
  }

  return (
    <div className="TourIndexPage-box">
      <div className="underline">
        <h1 className="title blue">Your Tours</h1>
      </div>
      <div className="Tour-list">
          {props.tours.map(tour => ( 
            <div className="List" key={tour.id}>
                <h3 className="TourLink" key={tour.id}>
                    <Link to={`${process.env.PUBLIC_URL}/tours/${tour.id}`}>{tour.title}</Link>
                </h3>
            </div>
          ))}
        </div>
    </div>
  )
}

const tourSelector = createSelector(
  state => state.tours,
  tours => tours
)

const mapStateToProps = createSelector(
tourSelector,
  (tours) => ({
    tours
  })
);

const mapDispatchToProps = {
  onGetTours: getTours
}

export default connect(mapStateToProps, mapDispatchToProps)(TourIndexPage);