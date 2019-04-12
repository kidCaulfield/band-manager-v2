import { Session } from '../requests'

export const API_REQUEST_SUCCESS = 'user:updateUser';
export const API_REQUEST_ERROR = 'user:showError';
export const API_REQUEST_REQUEST = 'user:onRequest';
export const API_REQUEST_COOKIE = 'user:onRequest';

export const updateUser = (newUser) => {
  return {
    type: API_REQUEST_SUCCESS,
    payload: {
      user: newUser
    }
  };
};

export const showError = () => {
  return {
    type: API_REQUEST_ERROR,
    payload: {
      user: 'ERROR!!!'
    }
  }
}

export const onRequest = () => {
  return {
    type: API_REQUEST_REQUEST
  }
}

export const apiRequest = (params) => async dispatch => {
  console.log('I Want COOOOKIEESS!!!!!');
    
    const session = await Session.create(params);
    return dispatch({
      type: API_REQUEST_COOKIE,
      payload: {
        user: session
      }
      })
}