import { CREATE_EVENT } from '../actions/eventActions'

const eventReducer = (state = [], {type, payload}) => {
  switch (type) {
    case CREATE_EVENT:
      return payload.events;
    default:
      return state;
  }
}

export default eventReducer