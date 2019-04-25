import { Event } from '../requests'

export const CREATE_EVENT = 'events:createEvent';

export const showError = (err) => {
  console.log('error: ', err);
  // return {
  //   type: API_REQUEST_ERROR,
  //   payload: {
  //     error: error
  //   }
}

export const createEvent = (params, id) => async dispatch => {
  const response = await Event.create(params, id);
  console.log('response: ', response);

  if (response.error) {
    return showError(response.error)
  }

  if (typeof response.event.id === "number") {
    return dispatch({
      type: CREATE_EVENT,
      payload: {
        tours: response.event
      }
    })
  } 
}