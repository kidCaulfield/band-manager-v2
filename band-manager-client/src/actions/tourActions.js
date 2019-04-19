import { Tour } from '../requests'

export const GET_TOUR = 'tour:getTour';

export const showError = (err) => {
  console.log('error: ', err.error);
  // return {
  //   type: API_REQUEST_ERROR,
  //   payload: {
  //     error: error
  //   }
}

export const getTour = (id) => async dispatch => {
  const response = await Tour.one(id)

  return dispatch({
    type: GET_TOUR,
    payload: {
      tour: response.tour
    }
  })
}