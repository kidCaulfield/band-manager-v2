import { Tour } from '../requests'

export const CREATE_TOUR = 'tour:createTour';

export const showError = (err) => {
  console.log('error: ', err.error);
  // return {
  //   type: API_REQUEST_ERROR,
  //   payload: {
  //     error: error
  //   }
}

export const createTour = (params, props) => async dispatch => {
  console.log('params: ', params);
  const response = await Tour.create(params)
  console.log('response: ', response);
 
  if (response.error) {
    props.history.push("/");
    return showError(response.error)
  }
  if (typeof response.tour[0].id === "number") {
    
    // props.history.push("//tours")
    return dispatch({
      type: CREATE_TOUR,
      payload: {
        tours: response.tour
      }
    })
  } 
}