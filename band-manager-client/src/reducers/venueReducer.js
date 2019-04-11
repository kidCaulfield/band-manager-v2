import { FETCH_VENUES } from '../actions/venueActions';

const venueReducer = (state = [], {type, payload}) => {
  switch (type) {
    case FETCH_VENUES:
      return payload.venues;
    default:
      return state;
  };
};

export default venueReducer;