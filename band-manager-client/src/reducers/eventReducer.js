import { GET_EVENT } from '../actions/eventActions'

const eventReducer = (state = {}, {type, payload}) => {
  switch (type) {
    case GET_EVENT:
      return payload.event;
    default:
      return state;
  }
};

export default eventReducer;