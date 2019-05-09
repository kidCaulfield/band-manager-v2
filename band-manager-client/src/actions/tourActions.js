import { Tour } from '../requests'

export const GET_TOUR = 'tour:getTour';
export const EVENT_ERROR = 'showError';

const showError = (error) => {
  return {
    type: EVENT_ERROR,
    payload: {
      errors: [error]
    }
  }
}

export const getTour = (id) => async dispatch => {
  const response = await Tour.one(id)

  if (response.error) {
    showError(response.error)
  }

  if (response === undefined) {
    showError("response error")
  }

  return dispatch({
    type: GET_TOUR,
    payload: {
      tour: response.tour
    }
  })
}