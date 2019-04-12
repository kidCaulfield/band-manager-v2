import React, { useState, useEffect } from 'react'; 
import { BrowserRouter } from 'react-router-dom';
import '../styles/App.css';
import { Venue, Session } from '../requests';
import Website from "./Website";

import { connect } from 'react-redux';
import { updateUser, apiRequest } from '../actions/userActions'
import { getVenues } from '../actions/venueActions'

import { createSelector } from 'reselect'

const App = (props) => {
  console.log('App props: ', props);

  /*============== hooks example ==============*/
  // const [venues, setVenues] = useState([]);
  // const [currentUser, setUser] = useState(null);

  // const onUpdateUser = (event) => {
  //   props.onUpdateUser(event.target.value)
  // }
  
  // if "regeneratorRuntime is not defined" while using async/await in new prject
  // "yarn add babel-preset-env" should fix this error
  
  const getVenues = async () => { 
    const venues = await Venue.all();
    //setVenues(venues);
    props.onGetVenues(venues);
  }

  const createSession = (params) => {
    //setUser(session)
    props.onApiRequest(params)
  }

  const destroy = () => {
    // ES6 callback hell, this is kept and a reminder :^•
    return fetch(`/session`, {
      method: "DELETE",
      credentials: "include"
    }).then(res => res.json());
  }

  const signIn = (event) => {
    event.preventDefault();
    const { currentTarget } = event;
    const formData = new FormData(currentTarget);

    createSession({
      email: formData.get("email"),
      password: formData.get("password")
    })
  }

  useEffect(() => {
    getVenues();
  }, []);

  if (props.venues.length === 0) {
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
    <BrowserRouter>
      <div className="AppBox">
        <Website
          signIn={signIn}
          destroy={destroy}  
        />
        {/* <input onChange={onUpdateUser} /> */}
          {props.user} <br/>
        {/* <div className="VenueList"> */}
          {/* comeback and find a better way to map this later or name it */}
          {/* {props.venues.venues.map(venue => ( 
            <div className="List" key={venue.id}>
              <p>{venue.name}</p>
            </div>
          ))}
        </div> */}
      </div>
    </BrowserRouter>
  );
}

const venuesSelector = createSelector(
  state => state.venues,
  venues => venues
);

const userSelector = createSelector(
  state => state.user,
  user => user
);

const mapStateToProps = createSelector(
  venuesSelector,
  userSelector,
  (venues, user) => ({
    venues,
    user
  })
);

const mapActionsToProps = {
    onUpdateUser: updateUser,
    onGetVenues: getVenues,
    onApiRequest: apiRequest
  }

export default connect(mapStateToProps, mapActionsToProps)(App);