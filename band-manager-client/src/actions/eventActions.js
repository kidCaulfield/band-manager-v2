import { Event } from '../requests'

export const GET_EVENT = 'event:getEvent';
export const EVENT_ERROR = 'showError';

const showError = (error) => {
  return {
    type: EVENT_ERROR,
    payload: {
      errors: [error]
    }
  }
}

// export const success = () => dispatch => {
//   return dispatch({
//     type: EVENT_ERROR,
//     payload: {
//       errors: []
//     }
//   })
// }

export const getEvent = (tourId, eventId) => async dispatch => {
  const response = await Event.edit(tourId, eventId);
  
  if (response === undefined) {
    return showError("response error")
  }

  if (response.error) {
    return showError(response.error)
  }

  return dispatch({
    type: GET_EVENT,
    payload: {
      event: response.event,
      errors: []
    }
  })
}