import { Event } from '../requests'

export const CREATE_EVENT = 'events:createEvent';
export const GET_EVENTS = 'events:getEvents';

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
    const all = await Event.all(id);
    console.log('all: ', all);
    return dispatch({
      type: CREATE_EVENT,
      payload: {
        events: all.events
      }
    })
  } 
}

export const getEvents = (id) => async dispatch => {
  if (id !== undefined) {
    const response = await Event.all(id);
    console.log('response: ', response);
    
    if (response.error) {
      return showError(response.error)
    }

    return dispatch({
      type: GET_EVENTS,
      payload: {
        events: response.events
      }
    })
  }
}