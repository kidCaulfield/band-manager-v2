import { CREATE_EVENT, GET_EVENTS } from '../actions/eventsActions'

const eventsReducer = (state = [], {type, payload}) => {
  switch (type) {
    case CREATE_EVENT:
      return payload.events;
    case GET_EVENTS:
      return payload.events;
    default:
      return state;
  }
};

export default eventsReducer;