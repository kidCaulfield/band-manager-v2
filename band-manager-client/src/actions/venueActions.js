import { Venue } from '../requests'

export const FETCH_VENUES = 'venues:getVenues';
export const EVENT_ERROR = 'showError';

const showError = (error) => {
  return {
    type: EVENT_ERROR,
    payload: {
      errors: [error]
    }
  }
}


export const getVenues = () => async dispatch => {
  const response = await Venue.all()
  
  if (response.error) {
    showError(response.error)
  }
  if (response === undefined) {
    showError("response error")
  }

  return dispatch({
    type: FETCH_VENUES,
    payload: {
      venues: response.venues
    }
  });
};