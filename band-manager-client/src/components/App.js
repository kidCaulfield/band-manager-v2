import React, { Component } from 'react'; 
import { BrowserRouter } from 'react-router-dom'
import '../styles/App.css';
import { Venue, Session } from '../requests'
import Website from "./Website"

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
    const venues = await Venue.all();
    this.setState({venues: venues});
  }
  
  createSession = async (params) => {
    const session = await Session.create(params);
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
      <BrowserRouter>
        <div className="AppBox">
          <Website />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;