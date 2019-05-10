import { EVENTS_ERROR } from '../actions/eventsActions';
import { SESSION_ERROR } from '../actions/userActions';
import { VENUE_ERROR } from '../actions/venueActions';
import { TOUR_ERROR } from '../actions/toursActions';

const errorReducer = (state = [], {type, payload}) => {
  switch (type) {
    case EVENTS_ERROR:
      return payload.errors;
    case VENUE_ERROR:
      return payload.errors;
    case TOUR_ERROR:
      return payload.errors;
    case SESSION_ERROR:
      return payload.errors;
    default:
      return state;
  }
};

export default errorReducer;