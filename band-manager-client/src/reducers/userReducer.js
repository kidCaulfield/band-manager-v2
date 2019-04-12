import { API_REQUEST_SUCCESS, API_REQUEST_ERROR, API_REQUEST_COOKIE } from '../actions/userActions';

const userReducer = (state = '', {type, payload}) => {
  switch (type) {
    case API_REQUEST_SUCCESS:
      return payload.currentUser;
    case API_REQUEST_ERROR:
      return payload.currentUser;
    case API_REQUEST_COOKIE:
      return payload.currentUser;
    default:
      return state;
  }
};

export default userReducer