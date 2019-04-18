import { Session, User } from '../requests'

export const API_REQUEST_SUCCESS = 'user:updateUser';
export const API_REQUEST_ERROR = 'user:showError';
export const API_REQUEST_COOKIE = 'user:login';
export const CREATE_USER = 'user:createUser';

export const updateCurrentUser = (newUser) => {
  return {
    type: API_REQUEST_SUCCESS,
    payload: {
      currentUser: newUser
    }
  };
};

export const showError = (err) => {
  console.log('error: ', err.error);
  // return {
  //   type: API_REQUEST_ERROR,
  //   payload: {
  //     error: error
  //   }
}


export const login = (params, props) => async dispatch => {
  const session = await Session.create(params);
  
  if (typeof session.id === "number") {
    props.history.push("/");
  }
  return dispatch({
    type: API_REQUEST_COOKIE,
    payload: {
      currentUser: session
    }
  })
}

export const createAccount = (params, props) => async dispatch => {
 
  const { users } = params
  const user = await User.create(params);
  
  if (user.error) {
    props.history.push("/");
    return showError(user)
  }

  // refactor API to send users object without array
  
  if (typeof user[0].id === "number") {
    const session = await Session.create({email: user[0].email, password: users.password});
    if (typeof session.id === "number") {
      props.history.push("/");
      return dispatch({
        type: CREATE_USER,
        payload: {
          currentUser: session
        }
      })
    }
  }
}