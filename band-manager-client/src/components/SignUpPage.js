import React from 'react';
import { connect } from 'react-redux';
import { createAccount } from '../actions/userActions'
import { createSelector } from 'reselect';

const SignUpPage = (props) => {

  const createUser = async (params) => {
    props.onCreateAccount(params, props)
  };


  const signUp = (event) => {
    event.preventDefault();
    const { currentTarget } = event;
    const formData = new FormData(currentTarget);

    createUser({
      users: {
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
        password_digest: formData.get("password_digest")
      }
    })
  }

  return (
    <div className="Venue-form-box">
      <h1 className="Title Blue">Make an account</h1>
      <form className="Venue-form" onSubmit={signUp}>
        <div>
          <label htmlFor="username">username</label><br/>
          <input type="text" name="username"></input>
        </div>
        <div>
          <label htmlFor="email">email</label><br/>
          <input type="email" name="email"></input>
        </div>
        <div>
          <label htmlFor="password">password</label><br/>
          <input type="password" name="password"></input>
        </div>
        <div>
          <label htmlFor="password_digest">password_confirmation</label><br/>
          <input type="password" name="password_digest"></input>
        </div>
        <input className="Button-form" type="submit" value="Sign Up" />
      </form>
    </div>
  )
};

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
  onCreateAccount: createAccount
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);