import { Tour } from '../requests'

export const CREATE_TOUR = 'tour:createTour';
export const GET_TOURS = 'tour:getTours';

export const showError = (err) => {
  console.log('error: ', err.error);
  // return {
  //   type: API_REQUEST_ERROR,
  //   payload: {
  //     error: error
  //   }
}

export const getTours = () => async dispatch => {
  const response = await Tour.all()
  console.log('response: ', response);

  return dispatch({
    type: GET_TOURS,
    payload: {
      tours: response.tours
    }
  })
}

export const createTour = (params, props) => async dispatch => {
  const response = await Tour.create(params)
 
  if (response.error) {
    props.history.push("/");
    return showError(response.error)
  }
  if (typeof response.tour[0].id === "number") {
    // props.history.push("/tours")
    return dispatch({
      type: CREATE_TOUR,
      payload: {
        tours: response.tour
      }
    })
  } 
}