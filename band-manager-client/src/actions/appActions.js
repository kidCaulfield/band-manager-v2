export const APP_LOADED = 'app:loading';

export const loadingApp = () => {

  return {
    type: APP_LOADED,
    payload: {
      loading: false
    }
  };
};
