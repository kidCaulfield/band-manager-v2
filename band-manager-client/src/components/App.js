import React, { useState, useEffect } from 'react'; 
import { BrowserRouter } from 'react-router-dom'
import '../styles/App.css';
import { Venue, Session } from '../requests'
import Website from "./Website"


const App = (props) => {
  const [venues, setVenues] = useState(null);
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

 useEffect(() => {
    getVenues()
  });


    return (
      <BrowserRouter>
        <div className="AppBox">
          <Website
            signIn={signIn}
            destroy={destroy}  
          />
        </div>
      </BrowserRouter>
    );
}

export default App;