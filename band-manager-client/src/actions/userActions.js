import { Session } from '../requests'

export const API_REQUEST_SUCCESS = 'user:updateUser';
export const API_REQUEST_ERROR = 'user:showError';
export const API_REQUEST_REQUEST = 'user:onRequest';
export const API_REQUEST_COOKIE = 'user:login';

export const updateCurrentUser = (newUser) => {
  return {
    type: API_REQUEST_SUCCESS,
    payload: {
      currentUser: newUser
    }
  };
};

export const showError = () => {
  return {
    type: API_REQUEST_ERROR,
    payload: {
      currentUser: 'ERROR!!!'
    }
  }
}

export const onRequest = () => {
  return {
    type: API_REQUEST_REQUEST
  }
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