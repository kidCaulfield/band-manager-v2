import React, { useState, useEffect } from 'react'; 
import { BrowserRouter } from 'react-router-dom'
import '../styles/App.css';
import { Venue, Session } from '../requests'
import Website from "./Website"



const App = (props) => {
  const [venues, setVenues] = useState([]);
  const [currentUser, setUser] = useState(null);

  //data: null,

  // if "regeneratorRuntime is not defined" while using async/await in new prject
  // "yarn add babel-preset-env" should fix this error
  
  const getVenues = async () => { 
    const venues = await Venue.all();
    setVenues(venues);
  }

  const createSession = async (params) => {
    const session = await Session.create(params);
    console.log('session: ', session);
    setUser(session)
  }

  const destroy = () => {
    // ES6  callback hell
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

  useEffect(() => { getVenues()}, []);

  if (venues.length === 0) {
    return (
      <div>
        <p>Loading...</p>
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
        <div className="VenueList">
          {/* comeback and find a better way to map this later or name it */}
          {venues.venues.map(venue => ( 
            <div className="List" key={venue.id}>
             <p>{venue.name}</p>
            </div>
          ))}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;