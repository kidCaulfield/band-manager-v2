export const FETCH_VENUES = 'venes:getVenuees';

export const getVenues = (venues) => {
  return {
    type: FETCH_VENUES,
    payload: {
      venues: venues
    }
  };
};