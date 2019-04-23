import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { getTours } from '../actions/toursActions'

const TourIndexPage = (props) => {
  
  useEffect(() => {
    props.onGetTours();
  }, []);

  if (props.tours.length === 0) {
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

  return (
    <div className="TourIndexPage-box">
      <h1 className="title underline blue">Your Tours</h1>
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