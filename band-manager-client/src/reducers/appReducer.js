import { APP_LOADED } from '../actions/appActions';

const appReducer = (state = null, {type, payload}) => {
  switch (type) {
    case APP_LOADED:
      return payload.loading;
    default:
      return state;
  }
};

export default appReducer