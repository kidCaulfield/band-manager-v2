export const APP_LOADING = 'app:loading';

export const loadingApp = () => {
  return {
    type: APP_LOADING,
    payload: {
      loading: false
    }
  };
};
