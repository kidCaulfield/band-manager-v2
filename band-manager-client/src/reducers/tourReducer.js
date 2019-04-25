import { GET_TOUR } from '../actions/tourActions'

const tourReducer = (state = {}, {type, payload}) => {
  switch (type) {
    case GET_TOUR:
      return payload.tour;
    default:
      return state;
  }
}

export default tourReducer;