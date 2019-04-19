import { CREATE_TOUR, GET_TOURS} from '../actions/toursActions'

const toursReducer = (state = [], {type, payload}) => {
  switch (type) {
    case CREATE_TOUR:
      return payload.tours
    case GET_TOURS:
      return payload.tours
    default:
      return state;
  }
}

export default toursReducer;