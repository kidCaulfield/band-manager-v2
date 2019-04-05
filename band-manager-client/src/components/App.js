import React, { Component } from 'react';
import '../styles/App.css';
import { Venue } from '../requests'

class App extends Component {
  constructor(props) {
    super(props)

  this.state = {
      data: null,
      venues: null,
      currentUser: null
    };
}

  // if "regeneratorRuntime is not defined" while using async/await in new prject
  // "yarn add babel-preset-env" should fix this error
  async componentDidMount() { 
    const venues = await Venue.all()
    this.setState({venues: venues})
  }
  
  createSession = async (params) => {
    const response = await fetch('/session', {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    });
    const session = await response.json();
    this.setState({currentUser: session})
  }

  destroy() {
    return fetch(`/session`, {
      method: "DELETE",
      credentials: "include"
    }).then(res => res.json());
  }

  signIn = (event) => {
    event.preventDefault();
    const { currentTarget } = event;
    const formData = new FormData(currentTarget);

    this.createSession({
      email: formData.get("email"),
      password: formData.get("password")
    })
  }

  render() {
    return (
      <div className="Website">

      </div>
    );
  }
}

export default App;