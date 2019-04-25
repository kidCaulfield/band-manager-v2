import React from 'react'

import { connect } from 'react-redux';
import { login } from '../actions/userActions'
import { createSelector } from 'reselect'

const SignInPage = (props) => {

  const createSession = (params) => {
    props.onLogin(params, props)
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

  return(
    <div className="form-box">
      <h1 className="title blue">Sign In</h1>
      <form className="form" onSubmit={signIn}>
        <div>
          <label className="label" htmlFor="email">email</label><br/>
          <input className="input" type="text" name="email" defaultValue="j@job.com"></input>
        </div>
        <div>
          <label className="label" htmlFor="password">password</label><br/>
          <input className="input" type="password" name="password" defaultValue="p1234"></input>
        </div>
        <input className="button" type="submit" value="Sign In" />
      </form>
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
  onLogin: login
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);