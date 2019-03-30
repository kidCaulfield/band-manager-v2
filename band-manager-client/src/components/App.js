import React, { Component } from 'react';
import '../styles/App.css';

class App extends Component {
  constructor(props) {
    super(props)

  this.state = {
      data: null,
      venues: null
    };
}
  componentDidMount() {
    // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
    this.getVenues()
      .then(res => this.setState({ venues: res.venues }))
      .catch(err => console.log(err));     
  }

  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  getVenues = async () => {
    const response = await fetch('/venues');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body
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
      <div className="App">    
        <div className="Venue-form-box">
          <h1 className="Title Blue">Sign In</h1>
          <form className="Venue-form" onSubmit={this.signIn}>
            <div>
              <label htmlFor="email">email</label><br/>
              <input type="text" name="email" value="jh@job.com"></input>
            </div>
            <div>
              <label htmlFor="password">password</label><br/>
              <input type="text" name="password" value="p1234"></input>
            </div>
            <input className="Button-form" type="submit" value="Sign In" />
          </form>
        </div>

        <button className="Button-form" onClick={this.destroy}>Sign Out</button>
      </div>
    );
  }
}

export default App;