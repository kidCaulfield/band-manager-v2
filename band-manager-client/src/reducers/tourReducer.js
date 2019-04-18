import { CREATE_TOUR } from '../actions/tourActions'

const tourReducer = (state = '', {type, payload}) => {
  switch (type) {
    case CREATE_TOUR:
      return payload.tours
    default:
      return state;
  }
}

export default tourReducer;