import { APP_LOADING } from '../actions/appActions';

const userReducer = (state = '', {type, payload}) => {
  switch (type) {
    case APP_LOADING:
      return payload.loading;
    default:
      return state;
  }
};

export default userReducer