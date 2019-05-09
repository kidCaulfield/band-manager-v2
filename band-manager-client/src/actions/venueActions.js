import { Venue } from '../requests'

export const FETCH_VENUES = 'venues:getVenues';
export const VENUE_ERROR = 'venue:showError';

const showError = (error) => {
  return {
    type: VENUE_ERROR,
    payload: {
      errors: [error]
    }
  }
}


export const getVenues = () => async dispatch => {
  const response = await Venue.all()
  
  if (response === undefined) {
    return dispatch(showError("response error"));
  }
  
  if (response.error) {
    return dispatch(showError(response.error));
  }

  return dispatch({
    type: FETCH_VENUES,
    payload: {
      venues: response.venues
    }
  });
};