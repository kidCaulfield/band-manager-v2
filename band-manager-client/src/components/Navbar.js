import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/Navbar.css'
import { Session } from '../requests'

import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { updateCurrentUser } from '../actions/userActions'


const Navbar = (props) => {
  const { currentUser } =  props;

  const destroy = async () => {
    props.onUpdateCurrentUser(null)

    const signOut = await Session.destroy()
    return signOut
  }

  /*========= Dropdown Nav ============*/
  const handleClick = event => {
    const navs = document.querySelectorAll('.NavbarItems')

    navs.forEach(nav => nav.classList.toggle('NavbarToggleShow'));
  }

  return (
    <div className="NavBox">
    <NavLink
      className="Brand"
      to={`${process.env.PUBLIC_URL}/`}>
      <img
        src={require("../images/sunGlassesBlue.png")}
        width="80px" height="45px" alt="sun glasses"
      />
    </NavLink>
    
      <FontAwesomeIcon
      className="NavbarLinkToggle blue fancy"
      onClick={handleClick}
      icon="bars"
      />
    <nav className="NavBar NavbarItems">
      { currentUser ? (
      <NavLink
        className="fancy NavbarLink"
        exact to={`${process.env.PUBLIC_URL}/tours`}>
          Tours
      </NavLink>
      ) : 
      <div className="none"></div>
      }
      { currentUser ? (
        <NavLink
        className="fancy NavbarLink"
        to={`${process.env.PUBLIC_URL}/tours/new`}>
          New Tour
        </NavLink>
      ) : null }
      {/* <NavLink
        className="fancy NavbarLink"
        to={`${process.env.PUBLIC_URL}/network`}>
          Network
      </NavLink> */}
    </nav>
    <nav className="Navbar right NavbarItems">
      { !currentUser ? (
      <NavLink
        className="fancy NavbarLink"
        exact to={`${process.env.PUBLIC_URL}/sign_up`}>
          Sign Up
      </NavLink>
      ) : 
      <div className="none"></div>
      }
      { currentUser ? (
        <>
          <span className="NavbarLink" role="img" aria-label="TourBus"> 🚌</span><h4 id="username">{currentUser.username}</h4>
          <NavLink to={`${process.env.PUBLIC_URL}/`} className="fancy NavbarLink" onClick={destroy}>
            Sign Out
          </NavLink>
        </>
      ) : (
        <NavLink
          className="fancy NavbarLink"
          exact to={`${process.env.PUBLIC_URL}/sign_in`}>
            Sign In
        </NavLink>
      )}
    </nav>
  </div>
  )
}

const userSelector = createSelector(
  state => state.currentUser,
  currentUser => currentUser
);

const mapStateToProps = createSelector(
  userSelector,
  (currentUser) => ({
    currentUser
  })
);

const mapDispatchToProps = {
  onUpdateCurrentUser: updateCurrentUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);