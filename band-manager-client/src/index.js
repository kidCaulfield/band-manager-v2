import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

import thunk from 'redux-thunk';
import { applyMiddleware, compose, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import venueReducer from './reducers/venueReducer';
import tourReducer from './reducers/tourReducer';
import userReducer from './reducers/userReducer';
import appReducer from './reducers/appReducer';

const allReducers = combineReducers({
  venues: venueReducer,
  tours: tourReducer,
  currentUser: userReducer,
  loading: appReducer
})

const allStoreEnhancers = compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const store = createStore(allReducers, {
  venues: [],
  tours: [],
  currentUser: null,
  loading: true
  },
  allStoreEnhancers
);

console.log('store: ', store.getState());

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));


serviceWorker.unregister();