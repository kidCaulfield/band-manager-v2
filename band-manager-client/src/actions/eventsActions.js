import { Event } from '../requests'

export const EVENTS_ERROR = 'events:showError';
export const CREATE_EVENT = 'events:createEvent';
export const GET_EVENTS = 'events:getEvents';

const showError = (error) => {
  return {
    type: EVENTS_ERROR,
    payload: {
      errors: [error]
    }
  }
}

export const createEvent = (params, id) => async dispatch => {
  const response = await Event.create(params, id);

  if (response.error) {
    return dispatch(showError(response.error))
  }

  if (typeof response.event.id === "number") {
    const all = await Event.all(id);
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
    
    if (response.error) {
      return dispatch(showError(response.error))
    }

    return dispatch({
      type: GET_EVENTS,
      payload: {
        events: response.events
      }
    })
  }
}