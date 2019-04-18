import { CREATE_TOUR, GET_TOURS, GET_TOUR } from '../actions/tourActions'

const tourReducer = (state = '', {type, payload}) => {
  switch (type) {
    case CREATE_TOUR:
      return payload.tours
    case GET_TOURS:
      return payload.tours
    case GET_TOUR:
      return payload.tours
    default:
      return state;
  }
}

export default tourReducer;