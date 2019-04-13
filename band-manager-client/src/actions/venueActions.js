export const FETCH_VENUES = 'venes:getVenues';

export const getVenues = (venues) => {
  return {
    type: FETCH_VENUES,
    payload: {
      venues: venues
    }
  };
};