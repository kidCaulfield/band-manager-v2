import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

import thunk from 'redux-thunk';
import { applyMiddleware, compose, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import venueReducer from './reducers/venueReducer';
import userReducer from './reducers/userReducer';

const allReducers = combineReducers({
  venues: venueReducer,
  user: userReducer
})

const allStoreEnhancers = compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const store = createStore(allReducers, {
  venues: [{name: "hidaway"}],
  user: 'Wes'
  },
  allStoreEnhancers
);

// const action = {
//   type: 'changedState',
//   payload: {
//     newState: 'NewState'
//   }
// };

// store.dispatch(action)

console.log('store: ', store.getState());

ReactDOM.render(<Provider store={store}><App aRandomProps="whatever"/></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();