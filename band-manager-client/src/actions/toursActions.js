import { Tour } from '../requests'

export const CREATE_TOUR = 'tour:createTour';
export const GET_TOURS = 'tour:getTours';
export const TOUR_ERROR = 'venue:showError';

const showError = (error) => {
  return {
    type: TOUR_ERROR,
    payload: {
      errors: [error]
    }
  }
}

export const getTours = () => async dispatch => {
  const response = await Tour.all()

  if (response === undefined) {
    return dispatch(showError("response error"));
  };

  return dispatch({
    type: GET_TOURS,
    payload: {
      tours: response.tours
    }
  });
};


export const createTour = (params, props) => async dispatch => {
  const response = await Tour.create(params)
  console.log('response: ', response);
  
  if (response === undefined) {
    return dispatch(showError("response error"));
  };

  if (response.error) {
    return dispatch(showError(response.error));
  };

  if (typeof response.tour[0].id === "number") {
    props.history.push("/tours")
    return dispatch({
      type: CREATE_TOUR,
      payload: {
        tours: response.tour
      }
    });
  }; 
};