import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

import thunk from 'redux-thunk';
import { applyMiddleware, compose, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import venueReducer from './reducers/venueReducer';
import toursReducer from './reducers/toursReducer';
import tourReducer from './reducers/tourReducer';
import userReducer from './reducers/userReducer';
import appReducer from './reducers/appReducer';
import eventReducer from './reducers/eventReducer';
import errorReducer from './reducers/errorReducer';

const allReducers = combineReducers({
  events: eventReducer,
  venues: venueReducer,
  tours: toursReducer,
  tour: tourReducer,
  currentUser: userReducer,
  loading: appReducer,
  errors: errorReducer
})

const allStoreEnhancers = compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const store = createStore(allReducers, {
  errors: [],
  events: [],
  venues: [],
  tours: [],
  tour: {},
  currentUser: null,
  loading: true
  },
  allStoreEnhancers
);

console.log('store: ', store.getState());

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));


serviceWorker.unregister();