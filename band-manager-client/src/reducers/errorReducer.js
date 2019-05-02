import { EVENTS_ERROR } from '../actions/eventActions';

const errorReducer = (state = [], {type, payload}) => {
  switch (type) {
    case EVENTS_ERROR:
      return payload.errors;
    default:
      return state;
  }
};

export default errorReducer;