import React, { useEffect } from 'react'; 
import { BrowserRouter } from 'react-router-dom';
import '../styles/App.css';
import { Session } from '../requests';
import Container from "./Container";

/*=================== Redux ===================*/
import { connect } from 'react-redux';
import { loadingApp } from '../actions/appActions'
import { updateCurrentUser } from '../actions/userActions'
import { createSelector } from 'reselect'

/*=============== Font Awesome ================*/
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEnvelope, faKey, faBars } from '@fortawesome/free-solid-svg-icons';
library.add(faEnvelope, faKey, faBars);


const App = (props) => {

  /*============== hooks example ==============*/
  // const [venues, setVenues] = useState([]);
  // const [currentUser, setUser] = useState(null);


  /*======= Select: Event Usage Example =======*/
  // const onUpdateUser = (event) => {
  //   props.onUpdateUser(event.target.value)
  // }
  
  /*============== Error Solved ===============*/
  // if "regeneratorRuntime is not defined" while using async/await in new prject
  // "yarn add babel-preset-env" should fix this error
  

  const getCurrentUser = async () => {
    const session = await Session.getCurrentSession();

    props.onUpdateCurrentUser(session)
  }

  useEffect(() => {
    getCurrentUser();
  }, []);

  if (props.onLoading === true) {
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
      <div className="App-box">
        <Container/>
        {/* <input onChange={onUpdateUser} /> */}
      </div>
    </BrowserRouter>
  );
}

const appSelector = createSelector(
  state => state.loading,
  loading => loading
);

const userSelector = createSelector(
  state => state.currentUser,
  currentUser => currentUser
);

const mapStateToProps = createSelector(
  appSelector,
  userSelector,
  (loading, currentUser) => ({
    loading,
    currentUser
  })
);

const mapDispatchToProps = {
  onUpdateCurrentUser: updateCurrentUser,
  onLoading: loadingApp
}

export default connect(mapStateToProps, mapDispatchToProps)(App);