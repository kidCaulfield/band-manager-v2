import { Venue } from '../requests'

export const FETCH_VENUES = 'venues:getVenues';

export const getVenues = () => async dispatch => {
  const response = await Venue.all()
  console.log('response: ', response.venues);

  return dispatch({
    type: FETCH_VENUES,
    payload: {
      venues: response.venues
    }
  });
};