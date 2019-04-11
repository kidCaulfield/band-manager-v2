import $ from 'jquery';

export const API_REQUEST_SUCCESS = 'user:updateUser';
export const API_REQUEST_ERROR = 'user:showError';
export const API_REQUEST_REQUEST = 'user:onRequest';

export const updateUser = (newUser) => {
  return {
    type: API_REQUEST_SUCCESS,
    payload: {
      user: newUser
    }
  };
};

export const showError = () => {
  return {
    type: API_REQUEST_ERROR,
    payload: {
      user: 'ERROR!!!'
    }
  }
}

export const onRequest = () => {
  return {
    type: API_REQUEST_REQUEST
  }
}

export const apiRequest = () => {
  return dispatch => {
    // dispatch(requestMade())
    // $.ajax({
    //   url: 'http://google.com',
    //   success(response) {
    //     console.log("SUCCESS");

    //     dispatch(updateUser(response.newUser));
    //   },
    //   error() {
    //     console.log('error');

    //     dispatch(showError());
    //   }
    // });
  }
}