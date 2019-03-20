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

  // Fetches our GET route from the Express server.
  //(Note the route we are fetching matches the GET route from server.js
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

  render() {
    console.log("venues", this.state.venues);
    if(!this.state.venues) {
      return (
        <div>
          <h1>Where's the venues</h1>
        </div>
      )
    }
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {/* Render the newly fetched data inside of this.state.data  */}
        <p className="App-intro">{this.state.data}</p>
        <div>
          {this.state.venues.map(venue => (
            <div key={venue.id}>
              <p>{venue.name}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;