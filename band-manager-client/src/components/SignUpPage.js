import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux';
import { createAccount } from '../actions/userActions'
import { createSelector } from 'reselect';

const SignUpPage = (props) => {
  let [errors, setErrors] = useState([])

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

  useEffect(() => {
    setErrors([props.errors])
  }, [props.errors])

  useEffect(() => {
    setErrors([])
  }, [])

  return (
    <div className="form-box">
      <h1 className="title blue">Sign Up</h1>
      <form className="form" onSubmit={signUp}>
        {errors.length > 0 && (
          <div className="FormErrors">
            {errors.map(error => <div className="red error" key={error}>{error}</div>)}
          </div>
        )}
        <div>
          <label className="label" htmlFor="username">username</label><br/>
          <input className="input" type="text" name="username"></input>
        </div>
        <div>
          <label className="label" htmlFor="email">email</label><br/>
          <input className="input" type="email" name="email"></input>
        </div>
        <div>
          <label className="label" htmlFor="password">password</label><br/>
          <input className="input" type="password" name="password"></input>
        </div>
        <div>
          <label className="label" htmlFor="password_digest">password_confirmation</label><br/>
          <input className="input" type="password" name="password_digest"></input>
        </div>
        <input className="button" type="submit" value="Sign Up" />
      </form>
    </div>
  )
};

const errorSelector = createSelector(
  state => state.errors,
  errors => errors
);

const userSelector = createSelector(
  state => state.currentUser,
  currentUser => currentUser
);

const mapStateToProps = createSelector(
  userSelector, errorSelector,
  (currentUser, errors) => ({
    currentUser,
    errors
  })
);

const mapDispatchToProps = {
  onCreateAccount: createAccount
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);